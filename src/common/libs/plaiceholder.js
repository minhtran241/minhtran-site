import { getPlaiceholder } from 'plaiceholder';
import fs from 'fs/promises';
import path from 'path';

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
    // get project root path
    const projectRoot = path.resolve(process.cwd());
    buffer = await fs.readFile(path.join(projectRoot, 'public', src));
  } else {
    buffer = await fetch(src).then(async (res) => {
      return Buffer.from(await res.arrayBuffer());
    });
  }
  const { base64 } = await getPlaiceholder(buffer);
  return base64;
};
