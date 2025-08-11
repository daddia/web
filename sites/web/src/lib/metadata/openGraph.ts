// src/lib/metadata/openGraph.ts
import type { Metadata } from 'next';
import {
  SITE_TITLE,
  DEFAULT_OG_IMAGE,
  DEFAULT_OG_IMAGE_WIDTH,
  DEFAULT_OG_IMAGE_HEIGHT,
} from '../constants';

interface OpenGraphImage {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
}

interface OpenGraphConfig {
  url: string;
  title: string;
  description: string;
  imageUrl?: string;
  images?: OpenGraphImage[];
  siteName?: string;
  locale?: string;
  type?: 'website' | 'article' | 'book' | 'profile';
}

export function generateOpenGraph(config: OpenGraphConfig): NonNullable<Metadata['openGraph']> {
  const {
    url,
    title,
    description,
    imageUrl,
    images = [],
    siteName = SITE_TITLE,
    locale = 'en_AU',
    type = 'website',
  } = config;

  // If imageUrl is provided, add it as the first image
  const allImages: OpenGraphImage[] = imageUrl
    ? [
        {
          url: imageUrl,
          width: DEFAULT_OG_IMAGE_WIDTH,
          height: DEFAULT_OG_IMAGE_HEIGHT,
          alt: title,
        },
        ...images,
      ]
    : images.length > 0
      ? images
      : [
          {
            url: DEFAULT_OG_IMAGE,
            width: DEFAULT_OG_IMAGE_WIDTH,
            height: DEFAULT_OG_IMAGE_HEIGHT,
            alt: title,
          },
        ];

  return {
    title,
    description,
    url,
    images: allImages,
    siteName,
    locale,
    type,
  };
}
