import { calculateChart } from './calculator.js';

export const checkDailyTransits = (userDob, userTime) => {
  const now = new Date();
  const today = now.toISOString().split('T')[0];
  const currentTime = now.toTimeString().split(' ')[0].substring(0, 5);

  const currentPlanets = calculateChart(today, currentTime, 0, 0);
  const birthPlanets = calculateChart(userDob, userTime, 0, 0);

  const moonNow = currentPlanets.find(p => p.name === 'Moon');
  const sunBirth = birthPlanets.find(p => p.name === 'Sun');

  if (moonNow && sunBirth && Math.abs(moonNow.longitude - sunBirth.longitude) < 5) {
    return "Celestial Alert: The Moon is illuminating your Sun today. High energy for new projects.";
  }
  return "The stars are stable. Proceed with your current vision.";
};
