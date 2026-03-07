/**
 * AstraVeda Executive Voice Command
 * Bridges natural speech to DeepSeek-V3 intent.
 */
export const listenToOracle = () => {
  if (typeof window === 'undefined') return;

  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'en-US';
  recognition.interimResults = false;

  recognition.onstart = () => console.log("Oracle is listening...");
  
  recognition.onresult = async (event) => {
    const transcript = event.results[0][0].transcript;
    console.log("Niel's Command:", transcript);
    
    // Logic: Route transcript to DeepSeek-V3 for intent mapping
    // Example: "Where is my wealth resonance?" triggers Global Wealth Map
    handleExecutiveIntent(transcript);
  };

  recognition.start();
};

const handleExecutiveIntent = (text) => {
  const query = text.toLowerCase();
  if (query.includes('wealth') || query.includes('resonance')) {
     window.location.href = '/dashboard?tab=wealth-map';
  } else if (query.includes('transit') || query.includes('stars')) {
     window.location.href = '/dashboard?tab=daily-transit';
  }
};
