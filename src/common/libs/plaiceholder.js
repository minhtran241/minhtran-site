import { getPlaiceholder } from 'plaiceholder';
import fs from 'fs/promises';

// receive array of strings (image local paths)
export const getImages = async (images) => {
  const imagePromises = images.map(async (src) => {
    const buffer = await fs.readFile(
      src.startsWith('./public') ? src : `./public${src}`,
    );
    const {
      metadata: { height, width },
      ...plaiceholder
    } = await getPlaiceholder(buffer);

    return { ...plaiceholder, img: { src, height, width } };
  });
  return Promise.all(imagePromises);
};

export const getBase64 = async (src, options = {}) => {
  // extract options if needed: 1 for local paths, 2 for remote URLs
  const { local = true } = options;
  let buffer;
  if (local) {
    buffer = await fs.readFile(
      src.startsWith('./public') ? src : `./public${src}`,
    );
  } else {
    try {
      const response = await fetch(src);
      if (!response.ok) {
        throw new Error(`Failed to fetch image from ${src}`);
      }
      buffer = await response.arrayBuffer();
    } catch (error) {
      console.error(`Failed to fetch image from ${src}:`, error);
    }
  }
  const { base64 } = await getPlaiceholder(buffer);
  return base64;
};
