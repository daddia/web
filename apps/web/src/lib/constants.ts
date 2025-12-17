// Site metadata
export const SITE_TITLE = 'daddia';
export const SITE_DESCRIPTION = 'Welcome to daddia';

export const BASE_URL =
  process.env.NODE_ENV === 'production' ? 'https://daddia.com' : 'http://localhost:3000';

// SEO Keywords
export const DEFAULT_KEYWORDS = ['daddia'];

// Social defaults
export const DEFAULT_SOCIAL_IMAGE = '/logo/logo.png';
export const DEFAULT_OG_IMAGE = '/logo/logo.png';
export const DEFAULT_OG_IMAGE_WIDTH = 1200;
export const DEFAULT_OG_IMAGE_HEIGHT = 630;
export const DEFAULT_OG_IMAGE_ALT = 'daddia';
export const TWITTER_HANDLE = '@daddia';
export const TWITTER_CARD_TYPE = 'summary_large_image';

// Icons and manifest
export const SITE_MANIFEST_PATH = '/site.webmanifest';
export const FAVICON_ICO_PATH = '/favicon.ico';
export const FAVICON_16_PATH = '/favicon-16x16.png';
export const APPLE_TOUCH_ICON_PATH = '/apple-touch-icon.png';

// JSON‑LD schema defaults
export const ORG_LOGO_URL = `${BASE_URL}/logo.png`;
export const ORG_LOGO_WIDTH = 600;
export const ORG_LOGO_HEIGHT = 600;

// Article schema defaults
export const DEFAULT_ARTICLE_SECTION = 'Blog';
export const DEFAULT_ARTICLE_WORD_COUNT = 2000;
export const DEFAULT_ARTICLE_KEYWORDS = 'daddia';
export const DEFAULT_ARTICLE_IMAGE = '/logo/logo.png';
export const DEFAULT_AUTHOR_NAME = 'daddia';
export const DEFAULT_AUTHOR_URL_PATH = '';

// Article "about" topic
export const ARTICLE_ABOUT_TOPIC = {
  name: 'daddia',
  description: '',
};

// Blog defaults
export const BLOG_NAME = `${SITE_TITLE} Blog`;
export const BLOG_URL_PATH = '/blog';

// Breadcrumb defaults
export const DEFAULT_BREADCRUMB_HOME = { name: 'Home', url: BASE_URL, position: 1 };

// File‑system paths (build‑time only)
// Use string path instead of path.join to avoid issues in tests
export const APP_DIR = process.cwd() + '/src/app';

// Cookies
export const CONSENT_COOKIE_NAME = 'daddia_consent';
export const SESSION_COOKIE_NAME = 'daddia_session';

// LocalBusiness schema defaults
export const LOCAL_BUSINESS = {
  name: 'daddia',
  description: '',
  address: {
    streetAddress: '',
    addressLocality: 'Sydney',
    addressRegion: 'NSW',
    postalCode: '2000',
    addressCountry: 'AU',
  },
  geo: {
    latitude: -32.0,
    longitude: 152.0,
  },
  openingHours: [''],
  priceRange: '',
};

// Organization social profiles
export const ORG_SOCIAL_PROFILES = [
  'https://www.facebook.com/daddia',
  'https://www.instagram.com/daddia',
];

// Breadcrumb name mapping
export const BREADCRUMB_NAME_MAP: Record<string, string> = {
  about: 'About',
  blog: 'Blog',
  articles: 'Articles',
  subscribe: 'Subscribe',
  legal: 'Legal',
  'privacy-policy': 'Privacy Policy',
  'terms-of-service': 'Terms of Service',
  daddia: 'daddia',
};
