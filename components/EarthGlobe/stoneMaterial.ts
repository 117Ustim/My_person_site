import { CanvasTexture, MeshStandardMaterial, MirroredRepeatWrapping, SRGBColorSpace } from 'three'

// Один фрагмент из оригинального asset для всей суши; его альфа проверена: 255.
const STONE_CROP = { x: 540, y: 230, size: 180 }
const STONE_SCALE = 1.25

export function createStoneTexture(image: HTMLImageElement) {
  const { x, y, size } = STONE_CROP
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const context = canvas.getContext('2d')
  if (!context) return null
  context.drawImage(image, x, y, size, size, 0, 0, size, size)

  // Удаляем только крупный перепад освещения фотографии. Мелкий рельеф и
  // соотношение каналов (медные прожилки) остаются из исходного камня.
  const illumination = document.createElement('canvas')
  illumination.width = size
  illumination.height = size
  const lightContext = illumination.getContext('2d')
  if (!lightContext) return null
  lightContext.fillStyle = '#393735'
  lightContext.fillRect(0, 0, size, size)
  lightContext.filter = 'blur(18px)'
  lightContext.drawImage(canvas, 0, 0)
  const light = lightContext.getImageData(0, 0, size, size).data
  const pixels = context.getImageData(0, 0, size, size)

  for (let i = 0; i < pixels.data.length; i += 4) {
    // Ошибочный crop нельзя маскировать плоской подложкой.
    if (pixels.data[i + 3] !== 255) return null
    const luminance = pixels.data[i] * 0.2126 + pixels.data[i + 1] * 0.7152 + pixels.data[i + 2] * 0.0722
    const localLight = light[i] * 0.2126 + light[i + 1] * 0.7152 + light[i + 2] * 0.0722
    const detail = Math.max(0.22, Math.min(2.5, (luminance + 12) / (localLight + 12)))
    const tone = 92 * Math.pow(detail, 0.65)
    for (let channel = 0; channel < 3; channel++) {
      const tint = (pixels.data[i + channel] + 16) / (luminance + 16)
      pixels.data[i + channel] = Math.min(230, tone * (0.25 + 0.75 * tint))
    }
  }
  context.putImageData(pixels, 0, 0)

  const texture = new CanvasTexture(canvas)
  texture.colorSpace = SRGBColorSpace
  // Зеркальное повторение стыкует край с самим собой: без резкого шва.
  texture.wrapS = MirroredRepeatWrapping
  texture.wrapT = MirroredRepeatWrapping
  return texture
}

export function applyStoneMaterial(material: MeshStandardMaterial, texture: CanvasTexture) {
  // Три проекции одной текстуры в координатах сферы сохраняют плотность зерна
  // у полюсов. Маска материков остаётся независимой географической UV-картой.
  material.onBeforeCompile = (shader) => {
    shader.uniforms.stoneTexture = { value: texture }
    shader.uniforms.stoneScale = { value: STONE_SCALE }
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vStonePosition;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvStonePosition = position;')
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', `#include <common>
        uniform sampler2D stoneTexture;
        uniform float stoneScale;
        varying vec3 vStonePosition;
      `)
      .replace('#include <map_fragment>', `
        #ifdef USE_MAP
          vec4 landMask = texture2D(map, vMapUv);
          vec3 spherePosition = normalize(vStonePosition);
          vec3 weights = pow(abs(spherePosition), vec3(6.0));
          weights /= weights.x + weights.y + weights.z;
          vec3 p = spherePosition * stoneScale;
          vec3 stone = texture2D(stoneTexture, p.yz).rgb * weights.x
                     + texture2D(stoneTexture, p.zx).rgb * weights.y
                     + texture2D(stoneTexture, p.xy).rgb * weights.z;
          diffuseColor *= vec4(stone, landMask.a);
          totalEmissiveRadiance *= stone;
        #endif
      `)
  }
  material.customProgramCacheKey = () => 'earth-stone-triplanar-v1'
  material.needsUpdate = true
}
