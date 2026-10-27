import sharp from 'sharp'

const width = 1200
const height = 630
const logoWidth = 250
const logo = await sharp('public/assets/au-logo-transparent.png')
  .resize({ width: logoWidth, withoutEnlargement: true })
  .png()
  .toBuffer()

await sharp({
  create: {
    width,
    height,
    channels: 4,
    background: { r: 24, g: 26, b: 30, alpha: 1 },
  },
})
  .composite([
    {
      input: logo,
      left: Math.round((width - logoWidth) / 2),
      top: Math.round((height - 149) / 2),
    },
  ])
  .png()
  .toFile('public/og-image.png')
