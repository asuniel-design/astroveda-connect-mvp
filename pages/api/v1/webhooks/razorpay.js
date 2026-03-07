import crypto from 'crypto';
import { fulfillSovereignOrder } from '../../../../lib/automation/fulfillment-engine';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  const signature = req.headers['x-razorpay-signature'];
  const body = JSON.stringify(req.body);

  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(body)
    .digest('hex');

  if (signature === expectedSignature) {
    const entity = req.body.payload.payment.entity;
    const userData = {
      email: entity.email,
      star: entity.notes?.star || 'Unknown',
      reason: entity.notes?.reason || 'General Strategic Audit'
    };

    // Trigger the Mac Mini DeepSeek-V3 Fulfillment
    await fulfillSovereignOrder(userData);

    res.status(200).json({ status: 'fulfilled' });
  } else {
    res.status(400).json({ status: 'invalid signature' });
  }
}
