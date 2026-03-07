import cron from 'node-cron';
import nodemailer from 'nodemailer';
import { generateExecutiveBriefing } from '../analytics/reasoning-bridge';
import { sendExecutiveAlert } from '../messaging/whatsapp-bot';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * The 06:00 AM Multi-Channel Executive Sync
 * Dispatches the deep-dive manuscript to Gmail and WhatsApp.
 */
export const startDailySync = (userData) => {
  // Schedule: 6:00 AM Daily
  cron.schedule('0 6 * * *', async () => {
    console.log("🌌 Initiating Elite Morning Dispatch for:", userData.email);

    try {
      // 1. DeepSeek-V3 Manuscript Generation (1,000 words)
      const briefing = await generateExecutiveBriefing(userData);

      // 2. WhatsApp Executive Summary Push
      const waInsight = {
        recommendation: briefing.summary,
        market_sentiment: "Strategic Expansion",
        strategic_pillars: [
          "Check your Gmail for the full 1,000-word Manuscript.",
          `Primary Sync: ${userData.star} (Nakshathram)`,
          `Intent Focus: ${userData.reason}`
        ]
      };
      await sendExecutiveAlert(process.env.NIEL_WHATSAPP_NUMBER, waInsight);

      // 3. Gmail Full Manuscript Delivery
      await transporter.sendMail({
        from: `"AstraVeda Oracle" <${process.env.EMAIL_USER}>`,
        to: userData.email,
        subject: `[CONFIDENTIAL] Daily Strategic Manuscript: ${userData.star}`,
        html: `
          <div style="background: #020617; color: #f8fafc; padding: 50px; font-family: 'Helvetica', sans-serif; border-radius: 20px;">
            <h1 style="color: #f59e0b; text-transform: uppercase; letter-spacing: 2px;">${briefing.title}</h1>
            <p style="font-size: 18px; color: #94a3b8; line-height: 1.6;">${briefing.summary}</p>
            <div style="background: #0f172a; padding: 30px; border-left: 4px solid #f59e0b; margin: 30px 0;">
              <p style="color: #cbd5e1; white-space: pre-wrap;">${briefing.full_text}</p>
            </div>
            <p style="font-size: 12px; color: #475569;">© 2026 AstraVeda Connect | DeepSeek-V3 Intelligence</p>
          </div>
        `
      });

      console.log("✅ Dual-Channel Dispatch Successful.");
    } catch (error) {
      console.error("❌ Dispatch Failure:", error);
    }
  });
};
