import crypto from 'crypto';
import { prisma } from '../architecture/db';

/**
 * AstraVeda Sovereign Key Generator
 * Mints cryptographically secure B2B API keys and links them to executive identities.
 */
export const mintSovereignKey = async (identityId, tier = 'SOVEREIGN_ELITE') => {
  try {
    // Generate a 256-bit secure hex string
    const entropy = crypto.randomBytes(32).toString('hex');
    const astraKey = `ak_live_${entropy}`;

    // Lock it into the local Postgres Vault via Prisma
    const storedKey = await prisma.apiKey.create({
      data: {
        key: astraKey,
        identityId: identityId,
        tier: tier,
      }
    });

    console.log(`🔑 Sovereign Key Minted: [ak_live_***] for Identity ID: ${identityId}`);
    return storedKey.key;
  } catch (error) {
    console.error("Critical Error Minting API Key:", error.message);
    throw new Error("Failed to generate Sovereign Key.");
  }
};
