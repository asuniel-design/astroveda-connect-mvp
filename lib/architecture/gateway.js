import { prisma } from './db';

// In-memory stores for local Mac Mini architecture
const rateLimitMap = new Map();
const cacheMap = new Map();

export const SovereignGateway = (handler) => async (req, res) => {
  // 1. DYNAMIC VAULT SECURITY
  const apiKey = req.headers['x-astra-key'] || req.query.key;
  
  if (!apiKey) {
    return res.status(401).json({ error: "Missing Sovereign Key." });
  }

  let activeIdentityId = null;

  // Bypass DB check if it's Niel's Master Mac Mini Key
  if (apiKey === process.env.SOVEREIGN_API_KEY) {
    console.log("👑 Master Sovereign Key Detected.");
    activeIdentityId = 'MASTER_ADMIN';
  } else {
    // Validate against the Prisma Vault for B2B Partners
    try {
      const validKey = await prisma.apiKey.findUnique({
        where: { key: apiKey },
        include: { identity: true }
      });

      if (!validKey || !validKey.isActive) {
        console.warn(`🛑 Unauthorized Access Attempt blocked.`);
        return res.status(401).json({ error: "Invalid or Revoked Sovereign Key." });
      }

      console.log(`🔐 B2B Key Verified. Partner: ${validKey.identity.email}`);
      activeIdentityId = validKey.identityId;
    } catch (error) {
      console.error("Gateway Database Error:", error.message);
      return res.status(500).json({ error: "Internal Vault Error" });
    }
  }

  // Attach identity to request for downstream Stripe billing
  req.identityId = activeIdentityId;

  // 2. RATE LIMITING (Max 100 requests per minute per IP)
  const ip = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'local-engine';
  const currentLimit = rateLimitMap.get(ip) || { count: 0, startTime: Date.now() };

  if (Date.now() - currentLimit.startTime > 60000) {
    currentLimit.count = 1;
    currentLimit.startTime = Date.now();
  } else {
    currentLimit.count++;
  }
  rateLimitMap.set(ip, currentLimit);

  if (currentLimit.count > 100) {
    console.warn(`🛑 Rate Limit Exceeded for IP: ${ip}`);
    return res.status(429).json({ error: "Sovereign Engine Rate Limit Exceeded." });
  }

  // 3. INTELLIGENT COMPUTE CACHING
  const payloadToHash = { ...req.body, ...req.query, identityId: activeIdentityId };
  const cacheKey = Buffer.from(JSON.stringify(payloadToHash)).toString('base64');

  if (cacheMap.has(cacheKey)) {
    console.log("⚡ Gateway Cache Hit: Bypassing AI Compute");
    return res.status(200).json(cacheMap.get(cacheKey));
  }

  // 4. RESPONSE INTERCEPTOR
  const originalJson = res.json;
  res.json = (body) => {
    if (res.statusCode === 200) {
      cacheMap.set(cacheKey, body);
      setTimeout(() => cacheMap.delete(cacheKey), 86400000); // 24-hour purge
    }
    originalJson.call(res, body);
  };

  // 5. PROCEED TO CORE LOGIC
  return handler(req, res);
};
