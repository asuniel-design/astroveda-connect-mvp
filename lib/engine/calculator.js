// AstraVeda Proprietary Calculation Engine v1.0
export const calculateChart = (dob, time, lat, lng) => {
  const date = new Date(`${dob}T${time}Z`);
  const d = (date.getTime() / 86400000) - (new Date("2000-01-01T12:00:00Z").getTime() / 86400000);

  // Orbital Elements for Sun (Standard Precision)
  const w = 282.9404 + 4.70935e-5 * d; // longitude of perihelion
  const e = 0.016709 - 1.151e-9 * d;    // eccentricity
  const M = (356.0470 + 0.9856002585 * d) % 360; // mean anomaly

  const E = M + (180/Math.PI) * e * Math.sin(M * Math.PI/180) * (1 + e * Math.cos(M * Math.PI/180));
  const xv = Math.cos(E * Math.PI/180) - e;
  const yv = Math.sqrt(1 - e*e) * Math.sin(E * Math.PI/180);

  const v = Math.atan2(yv, xv) * 180/Math.PI;
  const lonSun = (v + w) % 360;

  // Simple Moon calculation for MVP
  const lonMoon = (125.1228 - 0.0529538083 * d + 13.17639645 * d) % 360;

  return [
    { name: 'Sun', longitude: lonSun < 0 ? lonSun + 360 : lonSun, is_retrograde: false },
    { name: 'Moon', longitude: lonMoon < 0 ? lonMoon + 360 : lonMoon, is_retrograde: false }
  ];
};
