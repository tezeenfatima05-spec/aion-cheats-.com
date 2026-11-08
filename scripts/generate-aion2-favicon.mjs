import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const publicDir = path.join(root, 'public');
const brandDir = path.join(publicDir, 'brand');
const sourceInRepo = path.join(brandDir, 'aion2-logo.png');

/** Dark backdrop → transparent; keeps blue glow and metallic text. */
function stripNearBlackAlpha(raw, width, height) {
  const pixels = new Uint8ClampedArray(raw);
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const i = (y * width + x) * 4;
      const r = pixels[i];
      const g = pixels[i + 1];
      const b = pixels[i + 2];
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;

      if (luma < 22 && max < 40) {
        pixels[i + 3] = 0;
        continue;
      }

      // Soft feather very dark edge pixels so the glow does not show a hard box.
      if (luma < 38 && max < 55 && b - min < 30) {
        pixels[i + 3] = Math.min(pixels[i + 3], Math.round((luma / 38) * 90));
      }
    }
  }
  return Buffer.from(pixels);
}

async function loadProcessedSquare() {
  if (!fs.existsSync(sourceInRepo)) {
    throw new Error(`Missing ${sourceInRepo} — add the AION 2 logo PNG first.`);
  }

  const { data, info } = await sharp(sourceInRepo)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const rgba = stripNearBlackAlpha(data, info.width, info.height);

  const trimmed = await sharp(rgba, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .trim({ threshold: 1 })
    .png()
    .toBuffer();

  const side = 512;
  return sharp(trimmed)
    .resize(side, side, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();
}

async function writeSvgWithPng(viewBoxSize, pngBuffer, outPath) {
  const b64 = pngBuffer.toString('base64');
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${viewBoxSize} ${viewBoxSize}" role="img" aria-label="AION 2">
  <image href="data:image/png;base64,${b64}" width="${viewBoxSize}" height="${viewBoxSize}"/>
</svg>`;
  fs.writeFileSync(outPath, svg);
}

async function writeFavicons(masterPng) {
  const sizes = [
    { name: 'apple-touch-icon.png', size: 180 },
    { name: 'favicon-32.png', size: 32 },
    { name: 'favicon-16.png', size: 16 },
    { name: 'logo.png', size: 64 },
  ];

  for (const { name, size } of sizes) {
    await sharp(masterPng).resize(size, size).png().toFile(path.join(publicDir, name));
  }

  await sharp(masterPng).resize(32, 32).png().toFile(path.join(publicDir, 'favicon.ico'));

  const icon32 = await sharp(masterPng).resize(32, 32).png().toBuffer();
  await writeSvgWithPng(32, icon32, path.join(publicDir, 'favicon.svg'));

  const logo64 = await sharp(masterPng).resize(64, 64).png().toBuffer();
  await writeSvgWithPng(64, logo64, path.join(publicDir, 'logo.svg'));
}

const master = await loadProcessedSquare();
await writeFavicons(master);
console.log('AION 2 favicons written (transparent background).');
