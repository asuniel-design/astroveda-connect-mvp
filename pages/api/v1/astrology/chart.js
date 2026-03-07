import { calculateZodiacSystem } from '../../../../lib/engine/astra-compute/universal-bridge';

export default async function handler(req, res) {
  const apiKey = req.headers['x-astra-key'];
  if (!apiKey || apiKey !== process.env.SOVEREIGN_API_KEY) {
    return res.status(401).json({ error: "Unauthorized Sovereign Access" });
  }

  // Expecting 'VEDIC' or 'WESTERN' in the query parameter
  const { system = 'VEDIC', sun_longitude = 145.5 } = req.query;

  // Process the astronomical data locally
  const planetaryData = calculateZodiacSystem(parseFloat(sun_longitude), system);

  res.status(200).json({
    provider: "AstraVeda Sovereign Engine",
    hardware: "Mac-Mini-Local",
    data: planetaryData
  });
}
