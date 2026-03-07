/**
 * AstraVeda Executive Intake Schema
 * Captures the 5 essential keys for high-fidelity astrology.
 */
export const validateIntake = (data) => {
  const keys = ['email', 'place_of_birth', 'nakshathram', 'time_of_birth', 'reason'];
  const missing = keys.filter(key => !data[key]);
  
  if (missing.length > 0) {
    return { valid: false, missing };
  }
  
  return { 
    valid: true, 
    formatted: {
      email: data.email.toLowerCase(),
      place: data.place_of_birth,
      star: data.nakshathram,
      time: data.time_of_birth,
      intent: data.reason
    }
  };
};
