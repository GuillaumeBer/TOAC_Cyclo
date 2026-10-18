// Génère des versions redimensionnées des images de public/images (lancé avant chaque build et dev).
// Le site est exporté en statique : Next.js ne peut pas optimiser les images à la volée,
// on prépare donc les tailles ici et lib/image-loader.js choisit la bonne pour chaque écran.
// Pour chaque taille, on garde le plus léger entre WebP et JPEG (les photos déjà très
// compressées sont parfois plus lourdes en WebP), et l'original lui-même à sa taille d'origine.
import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const SRC = 'public/images'
const OUT = 'public/_img'
const MANIFEST = 'lib/image-manifest.json'
// Doit couvrir deviceSizes et imageSizes de next.config.js
const WIDTHS = [128, 256, 384, 640, 828, 1080, 1280, 1920]

await fs.mkdir(OUT, { recursive: true })
const manifest = {}

async function smallest(input, width, original) {
  const resized = () => sharp(input).resize({ width })
  const candidates = [
    { ext: 'webp', data: await resized().webp({ quality: 75, effort: 6 }).toBuffer() },
    { ext: /\.png$/i.test(input) ? 'png' : 'jpg', data: /\.png$/i.test(input)
      ? await resized().png({ compressionLevel: 9, palette: true }).toBuffer()
      : await resized().jpeg({ quality: 78, mozjpeg: true }).toBuffer() },
  ]
  if (width === original) candidates.push({ ext: path.extname(input).slice(1).toLowerCase().replace('jpeg', 'jpg'), data: await fs.readFile(input) })
  return candidates.sort((a, b) => a.data.length - b.data.length)[0]
}

for (const file of await fs.readdir(SRC)) {
  if (!/\.(jpe?g|png)$/i.test(file)) continue
  const input = path.join(SRC, file)
  const { width: original } = await sharp(input).metadata()
  // Jamais d'agrandissement : la plus grande version est à la taille d'origine.
  const widths = [...new Set([...WIDTHS.filter((w) => w < original), original])]
  const base = file.replace(/\.\w+$/, '')
  const entries = []
  for (const w of widths) {
    const best = await smallest(input, w, original)
    await fs.writeFile(path.join(OUT, `${base}-${w}.${best.ext}`), best.data)
    entries.push([w, best.ext])
  }
  manifest[`/images/${file}`] = entries
}

// Icônes du site à la bonne taille (le favicon source fait 1024 px)
for (const size of [48, 180]) {
  await sharp('public/favicon.jpg').resize(size, size).png().toFile(path.join(OUT, `icon-${size}.png`))
}

await fs.writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + '\n')
console.log(`Images optimisées : ${Object.keys(manifest).length} fichiers → ${OUT}`)
