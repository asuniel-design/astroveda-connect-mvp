import { calculateExecutiveCompatibility } from '../../../../lib/engine/astra-compute/kundali/matcher';
import { SovereignGateway } from '../../../../lib/architecture/gateway';

async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: "POST only" });

  const { partnerA, partnerB } = req.body;
  if (!partnerA || !partnerB) {
    return res.status(400).json({ error: "Missing partner data payloads." });
  }

  // The Gateway already handled auth and rate limiting. We just process logic.
  const matchData = await calculateExecutiveCompatibility(partnerA, partnerB);

  res.status(200).json({
    provider: "AstraVeda Sovereign Engine",
    system: "Vedic (Ashtakoot 36-Point)",
    results: matchData
  });
}

// Wrap the endpoint in the Gateway Architecture
export default SovereignGateway(handler);
