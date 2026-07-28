/**
 * Public calculator URL convention for AZPPS.
 * All production calculators are served at the site root by slug:
 *   /home-loan-emi
 *   /simple-interest
 *   /bmi
 * Never nest under /calculators/.
 */

export function getCalculatorPublicPath(slug: string): `/${string}` {
  const normalized = slug.trim().replace(/^\/+|\/+$/g, "");
  return `/${normalized}`;
}

export function getCalculatorPublicUrl(
  slug: string,
  origin = "https://azpps.example",
): string {
  return `${origin.replace(/\/+$/, "")}${getCalculatorPublicPath(slug)}`;
}
