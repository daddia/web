// src/lib/metadata/canonical.ts
export function generateCanonicalUrl(baseUrl: string, path: string): string {
  const url = new URL(path, baseUrl);
  return url.toString();
}
