import cron from 'node-cron';
import nodemailer from 'nodemailer';
import { prisma } from '../architecture/db.js';
import { fetchAstrologicalIntelligence } from '../engine/ai/router.js';

// Mailer Setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: 'astroveda26@gmail.com', pass: 'MacMini@2026!' },
});

// The Sovereign Task: Runs every day at 06:00 AM
const karmicTask = cron.schedule('0 6 * * *', async () => {
  console.log("🌅 [CRON] Igniting Daily Executive Briefing Sequence...");

  try {
    // 1. Fetch all active B2B partners from the Vault
    const activePartners = await prisma.identity.findMany({
      where: { status: 'FULFILLED' },
      include: { apiKeys: true }
    });

    if (activePartners.length === 0) {
      console.log("No active partners to brief today.");
      return;
    }

    // 2. Process each partner's daily chart
    for (const partner of activePartners) {
      console.log(`Analyzing transits for ${partner.email}...`);

      const prompt = `Generate a daily executive astrological briefing for a ${partner.star} dominant individual facing B2B decisions today. Keep it tactical and highly professional.`;
      
      // Dynamic routing to DeepSeek -> Minimax -> GPT-5 Mini
      const aiResponse = await fetchAstrologicalIntelligence(prompt);

      // 3. Dispatch the secure email
      await transporter.sendMail({
        from: '"AstraVeda Sovereign" <astroveda26@gmail.com>',
        to: partner.email,
        subject: `[RESTRICTED] Daily Karmic Alpha: ${partner.star}`,
        html: `
          <div style="background: #020617; color: #f8fafc; padding: 40px; font-family: monospace; border-radius: 10px; border: 1px solid #334155;">
            <h2 style="color: #f59e0b; text-transform: uppercase;">Executive Transit Briefing</h2>
            <p style="color: #94a3b8;">Intelligence Layer: ${aiResponse.model}</p>
            <hr style="border-color: #1e293b; margin: 20px 0;" />
            <p style="line-height: 1.8;">${aiResponse.analysis}</p>
            <p style="margin-top: 30px; font-size: 10px; color: #475569;">Generated locally on Sovereign Hardware.</p>
          </div>
        `
      });
      
      console.log(`✅ Briefing delivered to ${partner.email}`);
    }

    console.log("🏁 [CRON] Daily Briefing Sequence Complete.");
  } catch (error) {
    console.error("Cron Engine Failure:", error.message);
  }
});

// Export a function to manually start the engine
export const startKarmicEngine = () => {
  console.log("🕒 Sovereign Cron Engine Online. Awaiting scheduled cycles.");
  karmicTask.start();
};
