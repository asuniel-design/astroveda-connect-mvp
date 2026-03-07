import nodemailer from 'nodemailer';
import { generateExecutiveBriefing } from '../analytics/reasoning-bridge';
import { mintSovereignKey } from '../auth/key-generator';
import { prisma } from '../architecture/db';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: 'astroveda26@gmail.com', pass: 'MacMini@2026!' },
});

export const fulfillSovereignOrder = async (userData) => {
  console.log("🌌 Payment Confirmed. Initiating fulfillment for:", userData.email);

  try {
    // 1. Fetch the user's DB ID to attach the API key
    const identity = await prisma.identity.findUnique({ where: { email: userData.email } });
    if (!identity) throw new Error("Identity not found in Vault.");

    // 2. Mint the new B2B API Key
    const newApiKey = await mintSovereignKey(identity.id);

    // 3. Generate the 1,000-word DeepSeek-V3 Manuscript
    const manuscript = await generateExecutiveBriefing(userData);

    // 4. Update status in DB
    await prisma.identity.update({
      where: { id: identity.id },
      data: { status: 'FULFILLED' }
    });

    // 5. Dispatch the Email with the API Key
    await transporter.sendMail({
      from: '"AstraVeda Executive" <astroveda26@gmail.com>',
      to: userData.email,
      subject: `[PROPRIETARY] Your Sovereign Key & Manuscript: ${userData.star}`,
      html: `
        <div style="background: #020617; color: #f8fafc; padding: 40px; font-family: sans-serif; border-radius: 20px;">
          <h1 style="color: #f59e0b;">Sovereign Access Granted</h1>
          <p style="font-style: italic;">"Your identity has been synchronized."</p>
          <div style="background: #1e293b; padding: 20px; border-radius: 10px; margin: 20px 0; border: 1px solid #f59e0b;">
            <p style="margin: 0; font-size: 12px; color: #94a3b8; text-transform: uppercase;">Your B2B API Key</p>
            <p style="margin: 5px 0 0 0; font-family: monospace; font-size: 18px; color: #f59e0b;">${newApiKey}</p>
          </div>
          <hr style="border-color: #1e293b; margin: 20px 0;" />
          <div style="background: #0f172a; padding: 20px; border-radius: 10px;">
            <p style="line-height: 1.6;">${manuscript.full_text}</p>
          </div>
        </div>
      `
    });

    console.log("✅ Fulfillment Complete. Key & Manuscript Dispatched.");
  } catch (error) {
    console.error("Fulfillment Error:", error);
  }
};
