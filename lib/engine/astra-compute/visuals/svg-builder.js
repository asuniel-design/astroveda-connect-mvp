/**
 * AstraVeda Visual Engine
 * Generates a high-fidelity North Indian Kundali SVG.
 */
export const generateKundaliSVG = (ascendantSign, planets) => {
  console.log("DeepSeek-V3: Rendering high-resolution Kundali SVG...");

  // SVG parameters for a crisp, scalable 800x800 chart
  const size = 800;
  const strokeColor = "#f59e0b"; // Amber-500 for the Sovereign aesthetic
  const bgColor = "#020617";     // Slate-950

  // The core geometric lines of a North Indian Chart
  const lines = `
    <rect x="0" y="0" width="${size}" height="${size}" fill="${bgColor}" stroke="${strokeColor}" stroke-width="4"/>
    <line x1="0" y1="0" x2="${size}" y2="${size}" stroke="${strokeColor}" stroke-width="2"/>
    <line x1="${size}" y1="0" x2="0" y2="${size}" stroke="${strokeColor}" stroke-width="2"/>
    <line x1="${size/2}" y1="0" x2="${size}" y2="${size/2}" stroke="${strokeColor}" stroke-width="2"/>
    <line x1="${size}" y1="${size/2}" x2="${size/2}" y2="${size}" stroke="${strokeColor}" stroke-width="2"/>
    <line x1="${size/2}" y1="${size}" x2="0" y2="${size/2}" stroke="${strokeColor}" stroke-width="2"/>
    <line x1="0" y1="${size/2}" x2="${size/2}" y2="0" stroke="${strokeColor}" stroke-width="2"/>
  `;

  // Dynamic Placement of Planets (Mocked for demonstration)
  const textElements = `
    <text x="${size/2}" y="${size/4}" fill="#ffffff" font-size="24" font-family="sans-serif" text-anchor="middle">Asc: ${ascendantSign}</text>
    <text x="${size/2}" y="${size/4 + 30}" fill="${strokeColor}" font-size="20" font-family="sans-serif" text-anchor="middle">${planets.house1 || ''}</text>
    
    <text x="${size/4}" y="${size/2}" fill="#ffffff" font-size="20" font-family="sans-serif" text-anchor="middle">H4</text>
    <text x="${size/2}" y="${size * 0.75}" fill="#ffffff" font-size="20" font-family="sans-serif" text-anchor="middle">H7</text>
    <text x="${size * 0.75}" y="${size/2}" fill="#ffffff" font-size="20" font-family="sans-serif" text-anchor="middle">H10</text>
  `;

  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="100%" height="100%">
      ${lines}
      ${textElements}
    </svg>
  `;
};
