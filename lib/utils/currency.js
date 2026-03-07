const API_KEY = 'd64df62cba0e8c2df53a7470';

export const CURRENCY_CONFIG = {
  'IN': { code: 'INR', symbol: '₹' },
  'AE': { code: 'AED', symbol: 'د.إ' },
  'MY': { code: 'MYR', symbol: 'RM' },
  'AU': { code: 'AUD', symbol: 'A$' },
  'GB': { code: 'GBP', symbol: '£' },
  'US': { code: 'USD', symbol: '$' },
  'DEFAULT': { code: 'USD', symbol: '$' }
};

export const fetchLiveRate = async (targetCurrency) => {
  try {
    const response = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`);
    const data = await response.json();
    return data.result === "success" ? data.conversion_rates[targetCurrency] : 1;
  } catch (error) {
    return 1;
  }
};

export const getCountryCurrency = (countryCode) => {
  return CURRENCY_CONFIG[countryCode] || CURRENCY_CONFIG['DEFAULT'];
};
