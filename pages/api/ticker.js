// API for marketing ticker messages
// GET returns current messages
// POST (admin) adds new message

let tickerMessages = [
  'Mercury Retrograde begins in 2 hours',
  'New astrologer joining tomorrow: Dr. Nair',
  'Special offer: 20% off first consultation',
];

export default function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json({ messages: tickerMessages });
  }

  if (req.method === 'POST') {
    // In production, add authentication
    const { message } = req.body;
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message required' });
    }
    tickerMessages.push(message);
    // Broadcast via Socket.io if needed
    return res.status(201).json({ messages: tickerMessages });
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}