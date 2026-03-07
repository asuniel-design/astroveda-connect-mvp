/**
 * AstraVeda Universal Astronomical Bridge
 * Shifts calculations between Western (Tropical) and Vedic (Sidereal) instantly.
 */
export const calculateZodiacSystem = (rawDegrees, system = 'VEDIC') => {
  // Lahiri Ayanamsa offset (approx 24.1 degrees for current epoch)
  const ayanamsaOffset = 24.11; 
  
  let finalDegrees = rawDegrees;
  let activeSystem = "Western (Tropical)";

  if (system.toUpperCase() === 'VEDIC') {
    // Shift the Tropical position backwards to find the true Sidereal position
    finalDegrees = rawDegrees - ayanamsaOffset;
    if (finalDegrees < 0) finalDegrees += 360; // Keep within the 360-degree wheel
    activeSystem = "Vedic (Sidereal)";
  }

  // Calculate the Zodiac Sign (30 degrees per sign)
  const signs = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];
  const signIndex = Math.floor(finalDegrees / 30);
  
  return {
    system: activeSystem,
    longitude: finalDegrees.toFixed(2),
    sign: signs[signIndex],
    precision: "Mac Mini Hardware Computed"
  };
};
