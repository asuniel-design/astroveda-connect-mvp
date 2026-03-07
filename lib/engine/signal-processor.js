import { calculateChart } from './calculator.js';
import { getHouses, detectYogas } from './houses.js';

export const generateAstroSignal = (dob, time, lat, lng) => {
  try {
    const planets = calculateChart(dob, time, lat, lng);
    const houseData = getHouses(lat, lng, planets[0].longitude);
    const yogas = detectYogas(planets);

    return {
      timestamp: new Date().toISOString(),
      engine: "AstraVeda-Native-v1",
      context: {
        ascendant: houseData.ascendant.toFixed(2),
        primary_yoga: yogas[0] || "Standard Galactic Alignment",
        positions: planets.map(p => ({ name: p.name, deg: p.longitude.toFixed(2) }))
      }
    };
  } catch (error) {
    console.error("Native Engine Error:", error);
    return null;
  }
};
