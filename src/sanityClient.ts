// src/sanityClient.ts
import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const client = createClient({
    projectId: 'otg66znk',
    dataset: 'projects',
    useCdn: false,
    apiVersion: '2023-05-03',
});

// Setup the image URL builder
const builder = imageUrlBuilder(client)
export function urlFor(source: SanityImageSource) {
    return builder.image(source)
}