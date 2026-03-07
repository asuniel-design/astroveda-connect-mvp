import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
export const reportUsage = async (customerId) => {
  try {
    await stripe.billing.meterEvents.create({
      event_name: 'sovereign_api_request',
      payload: { value: '1', stripe_customer_id: customerId },
    });
  } catch (error) { console.error("Billing Error:", error.message); }
};
