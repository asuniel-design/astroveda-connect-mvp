import Pusher from 'pusher';

// We will set these real keys up in Vercel later.
// Using fallbacks so your build doesn't crash today.
const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID || "mock-app-id",
  key: process.env.NEXT_PUBLIC_PUSHER_KEY || "mock-key",
  secret: process.env.PUSHER_SECRET || "mock-secret",
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || "mt1",
  useTLS: true,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Post only' });

  try {
    const { message, sender, room } = req.body;

    // Broadcast the message to the specific chat room
    await pusher.trigger(room, 'new-message', {
      message,
      sender,
      timestamp: new Date().toISOString(),
    });

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
