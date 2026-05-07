/**
 * Singleton Sanity client. Reads + writes split:
 *  - `client` (anon, CDN, fast, public read)
 *  - `serverClient` (write token, used in route handlers only)
 *
 * Project + dataset come from env (NEXT_PUBLIC_*). Both are optional in dev:
 * if `projectId` is not set, helpers below short-circuit to safe fallbacks so
 * the landing keeps building without a Sanity project provisioned yet.
 */
import { createClient, type SanityClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

export const SANITY_PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '';
export const SANITY_DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production';
export const SANITY_API_VERSION = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2026-04-29';

export const sanityEnabled = SANITY_PROJECT_ID.length > 0;

export const client: SanityClient | null = sanityEnabled
  ? createClient({
      projectId: SANITY_PROJECT_ID,
      dataset: SANITY_DATASET,
      apiVersion: SANITY_API_VERSION,
      useCdn: true,
      perspective: 'published',
    })
  : null;

export function serverClient(): SanityClient | null {
  if (!sanityEnabled) return null;
  const token = process.env.SANITY_API_WRITE_TOKEN;
  if (!token) return null;
  return createClient({
    projectId: SANITY_PROJECT_ID,
    dataset: SANITY_DATASET,
    apiVersion: SANITY_API_VERSION,
    useCdn: false,
    token,
  });
}

const imageBuilder = client ? imageUrlBuilder(client) : null;
export function urlForImage(source: unknown) {
  if (!imageBuilder || !source) return null;
  return imageBuilder.image(source as never);
}
