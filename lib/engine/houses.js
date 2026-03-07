export const getHouses = (lat, lng, sunLon) => {
  // Simple Ascendant calculation based on Sun position for MVP
  const ascendant = (sunLon + 90) % 360; 
  const cusps = Array.from({ length: 12 }, (_, i) => (ascendant + i * 30) % 360);

  return {
    ascendant: ascendant,
    house_cusps: cusps
  };
};

export const detectYogas = (planets) => {
  const signals = [];
  const sun = planets.find(p => p.name === 'Sun');
  const moon = planets.find(p => p.name === 'Moon');

  // Logic for a "Soul Alignment" Yoga
  if (Math.abs(sun.longitude - moon.longitude) < 10) {
    signals.push("New Moon Alignment: High Intuition & Internal Growth");
  }

  return signals;
};
