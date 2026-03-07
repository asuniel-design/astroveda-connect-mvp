import { generateKundaliSVG } from '../../../../lib/engine/astra-compute/visuals/svg-builder';

export default async function handler(req, res) {
  const apiKey = req.query.key; // Passed as a URL parameter for image tag compatibility
  
  if (!apiKey || apiKey !== process.env.SOVEREIGN_API_KEY) {
    return res.status(401).send('<svg><text x="10" y="20" fill="red">Unauthorized Sovereign Access</text></svg>');
  }

  // In production, these would be calculated by your Astra-Compute engine
  const ascendant = req.query.asc || "Rohini";
  const planets = {
    house1: "Sun, Mercury",
    // Add other houses based on the DeepSeek logic
  };

  const svgString = generateKundaliSVG(ascendant, planets);

  // Set headers to serve this directly as an image
  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('Cache-Control', 's-maxage=86400'); // Cache for 24 hours
  res.status(200).send(svgString);
}
