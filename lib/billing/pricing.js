import { getCountryCurrency, fetchLiveRate } from '../utils/currency';

export const getLocalizedPremiumPrice = async (countryCode) => {
  const baseUsd = 99;
  const config = getCountryCurrency(countryCode);
  
  try {
    const rate = await fetchLiveRate(config.code);
    return {
      amount: (baseUsd * rate).toFixed(2),
      currency: config.code,
      symbol: config.symbol,
      label: "AstraVeda Elite Membership"
    };
  } catch (error) {
    // Fallback to static conversion if API is down
    return { amount: "99.00", currency: "USD", symbol: "$", label: "AstraVeda Elite" };
  }
};
