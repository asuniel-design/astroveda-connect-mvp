import { fetchAstrologicalIntelligence } from '../../ai/router';

export const calculateExecutiveCompatibility = async (partnerA, partnerB) => {
  console.log(`Analyzing Karmic Synergy between ${partnerA.star} and ${partnerB.star}...`);

  const baselineResonance = 28.5; 
  const maxScore = 36.0;
  const isSovereignMatch = baselineResonance >= 25;

  // Ask the AI Router for the dynamic analysis
  const prompt = `Analyze compatibility between ${partnerA.star} and ${partnerB.star}`;
  const aiResponse = await fetchAstrologicalIntelligence(prompt);

  return {
    score: baselineResonance,
    max_score: maxScore,
    verdict: isSovereignMatch ? "Sovereign Synergy" : "Volatile Alignment",
    intelligence_layer: aiResponse.model,
    analysis: aiResponse.analysis,
    breakdown: {
      nadi: "8/8",
      bhakoot: "7/7",
      graha_maitri: "4/5"
    }
  };
};
