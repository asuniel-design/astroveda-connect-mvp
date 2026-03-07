import { NextResponse } from 'next/server';

// Supported countries and their currencies
const COUNTRY_CURRENCY_MAP = {
  US: 'USD', // United States
  IN: 'INR', // India
  GB: 'GBP', // United Kingdom
  AE: 'AED', // United Arab Emirates
};

// Default currency if country not detected
const DEFAULT_CURRENCY = 'USD';

export function middleware(request) {
  const response = NextResponse.next();
  
  // Check if user-country cookie already exists
  const existingCountry = request.cookies.get('user-country');
  if (existingCountry) {
    // Already set, continue
    return response;
  }
  
  // Detect country from headers (Vercel provides x-vercel-ip-country)
  const countryCode = request.headers.get('x-vercel-ip-country') || 
                      request.geo?.country ||
                      'US';
  
  // Determine currency
  const currency = COUNTRY_CURRENCY_MAP[countryCode] || DEFAULT_CURRENCY;
  
  // Set cookie with country and currency
  response.cookies.set('user-country', countryCode, {
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: '/',
    sameSite: 'lax',
  });
  
  response.cookies.set('user-currency', currency, {
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
    sameSite: 'lax',
  });
  
  // Add custom header for debugging (optional)
  response.headers.set('x-detected-country', countryCode);
  response.headers.set('x-detected-currency', currency);
  
  return response;
}

// Configure which paths middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};