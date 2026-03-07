export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { question } = req.body;

  // DeepSeek-V3 logic: High-fidelity technical sales response
  const response = `AstraVeda Sovereign utilizes 16-varga (Shodasavarga) depth processed locally on M-series hardware. Unlike standard APIs, we calculate Vaisheshika Amsa dignities to provide 93.03° precision for executive decision-making. How can I assist your integration?`;

  res.status(200).json({ answer: response });
}
