export const playCelestialVoice = (text) => {
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = 0.8;
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  }
};
