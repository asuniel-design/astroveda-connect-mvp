import axios from 'axios';

/**
 * Sends a DeepSeek-V3 generated strategic alert to Niel's WhatsApp.
 * @param {string} recipient - E.164 formatted number (e.g., "14155551234")
 * @param {object} insight - The DeepSeek-V3 insight object
 */
export const sendExecutiveAlert = async (recipient, insight) => {
  const url = `https://graph.facebook.com/v21.0/${process.env.WA_PHONE_NUMBER_ID}/messages`;
  
  const messageBody = `*AstraVeda Executive Alert* 🌌\n\n` +
    `*Directive:* ${insight.recommendation}\n` +
    `*Market Sentiment:* ${insight.market_sentiment || 'Aggressive'}\n\n` +
    `*Strategic Pillars:*\n${insight.strategic_pillars.map(p => `• ${p}`).join('\n')}\n\n` +
    `_Sent via DeepSeek-V3 Logic Engine_`;

  try {
    const response = await axios.post(
      url,
      {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: recipient,
        type: "text",
        text: { body: messageBody }
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.WA_ACCESS_TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    );
    console.log("WhatsApp Alert Dispatched:", response.data.messages[0].id);
    return response.data;
  } catch (error) {
    console.error("WhatsApp Engine Error:", error.response?.data || error.message);
    throw error;
  }
};
