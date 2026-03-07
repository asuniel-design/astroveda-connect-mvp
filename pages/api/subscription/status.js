export default async function handler(req, res) {
  res.status(200).json({
    plan: 'Elite',
    status: 'active',
    dailyRituals: {
      prediction: "Venus aligns with your 5th house today—a perfect day for creative projects and emotional clarity.",
      dressing: {
        color: "Royal Purple",
        reason: "Aligns with Jupiter's transit and your Nakshatra energy for this Thursday.",
      },
      numerology: {
        luckyNumber: 24,
        vibration: "High resonance with your Name Number."
      },
      panchang: {
        tithi: "Shukla Paksha Ekadashi",
        brahmaMuhurta: "04:32 AM - 05:20 AM"
      }
    }
  });
}
