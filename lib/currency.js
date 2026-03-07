// Currency utility for AstroVeda Connect
// Provides formatting and conversion based on user's detected country

const CURRENCY_CONFIG = {
  USD: { symbol: '$', code: 'USD', locale: 'en-US' },
  INR: { symbol: '₹', code: 'INR', locale: 'en-IN' },
  GBP: { symbol: '£', code: 'GBP', locale: 'en-GB' },
  AED: { symbol: 'د.إ', code: 'AED', locale: 'ar-AE' },
};

// Default currency (USD)
const DEFAULT_CURRENCY = 'USD';

/**
 * Get user's currency from cookie (client-side) or headers (server-side)
 * @param {Object} context - Next.js context (req, res) or null for client
 * @returns {string} Currency code (USD, INR, GBP, AED)
 */
export function getUserCurrency(context = null) {
  // Server-side: read from request cookies if context provided
  if (context?.req?.cookies) {
    return context.req.cookies['user-currency'] || DEFAULT_CURRENCY;
  }
  
  // Client-side: read from cookie
  if (typeof window !== 'undefined') {
    const cookieMatch = document.cookie.match(/(?:^|;\s*)user-currency=([^;]*)/);
    return cookieMatch ? cookieMatch[1] : DEFAULT_CURRENCY;
  }
  
  // Default during SSR
  return DEFAULT_CURRENCY;
}

/**
 * Format amount in user's currency
 * @param {number} amount - Amount in base currency (USD)
 * @param {string} currency - Currency code (optional, defaults to user's currency)
 * @returns {string} Formatted currency string
 */
export function formatCurrency(amount, currency = null) {
  const currencyCode = currency || getUserCurrency();
  const config = CURRENCY_CONFIG[currencyCode] || CURRENCY_CONFIG[DEFAULT_CURRENCY];
  
  // Simple conversion rates (in production, use real-time rates from an API)
  const CONVERSION_RATES = {
    USD: 1,
    INR: 83.5, // Example rate
    GBP: 0.79,
    AED: 3.67,
  };
  
  const rate = CONVERSION_RATES[currencyCode] || 1;
  const convertedAmount = amount * rate;
  
  // Format with locale
  return new Intl.NumberFormat(config.locale, {
    style: 'currency',
    currency: config.code,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(convertedAmount);
}

/**
 * Get currency symbol for a given currency code
 * @param {string} currency - Currency code
 * @returns {string} Currency symbol
 */
export function getCurrencySymbol(currency = null) {
  const currencyCode = currency || getUserCurrency();
  const config = CURRENCY_CONFIG[currencyCode] || CURRENCY_CONFIG[DEFAULT_CURRENCY];
  return config.symbol;
}

/**
 * Convert amount from USD to user's currency
 * @param {number} amountUSD - Amount in USD
 * @param {string} targetCurrency - Target currency code (optional)
 * @returns {number} Converted amount
 */
export function convertFromUSD(amountUSD, targetCurrency = null) {
  const currencyCode = targetCurrency || getUserCurrency();
  const CONVERSION_RATES = {
    USD: 1,
    INR: 83.5,
    GBP: 0.79,
    AED: 3.67,
  };
  const rate = CONVERSION_RATES[currencyCode] || 1;
  return amountUSD * rate;
}