export const ZODIAC_MAP = {
  Aries: "https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/sun.svg", // Replace with custom Zodiac SVGs
  Taurus: "https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/moon.svg",
  Gemini: "https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/sparkles.svg",
  // ... add all 12 signs here
  Default: "https://api.dicebear.com/7.x/initials/svg?seed=User"
};

export const getZodiacSign = (dateString) => {
  if (!dateString) return "Default";
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  const day = date.getDate();

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries";
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Taurus";
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Gemini";
  // Add remaining logic for Cancer, Leo, Virgo, Libra, Scorpio, Sagittarius, Capricorn, Aquarius, Pisces
  return "Default";
};

export const getZodiacAvatar = (dob) => {
  const sign = getZodiacSign(dob);
  return ZODIAC_MAP[sign] || ZODIAC_MAP.Default;
};
