/**
 * AstraVeda Global Wealth Map
 * Calculates geographic resonance for high-stakes expansion.
 */
export const getGeographicResonance = (star) => {
  const hubs = [
    { city: "Dubai", resonance: 9.8, sector: "Finance & Real Estate" },
    { city: "Singapore", resonance: 9.2, sector: "Deep Tech & AI" },
    { city: "New York", resonance: 7.4, sector: "Equities & Media" },
    { city: "London", resonance: 6.8, sector: "Legal & Fintech" }
  ];

  // Logic: Rohini natives currently possess peak resonance in desert-adjacent hubs
  return hubs.sort((a, b) => b.resonance - a.resonance);
};
