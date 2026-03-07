import Razorpay from 'razorpay';
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
export const createSovereignPlan = async (customerName) => {
  return await razorpay.subscriptions.create({
    plan_id: process.env.RAZORPAY_PLAN_ID,
    total_count: 12,
    quantity: 1,
    customer_notify: 1,
  });
};
