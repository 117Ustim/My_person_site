'use client'

import { useEffect, useRef } from 'react'
import { useI18n } from '../../lib/i18n'
import {
  AmbientLight,
  BufferGeometry,
  CanvasTexture,
  DirectionalLight,
  Group,
  Line,
  LineBasicMaterial,
  Mesh,
  MeshStandardMaterial,
  Object3D,
  PerspectiveCamera,
  Scene,
  SRGBColorSpace,
  SphereGeometry,
  Vector3,
  WebGLRenderer,
} from 'three'
import styles from './EarthGlobe.module.css'
import { createProjectNetwork } from './projectNetwork'
import { applyStoneMaterial, createStoneTexture } from './stoneMaterial'

const LAND_DATA = '/geo/ne-110m-land.json'
const STONE_TEXTURE_DATA = '/sitegrab/assets/0739-about-stone.CIU_KC6y_Z1peJd0-c9c65b3996.webp'
const AXIAL_TILT = 23.5 * (Math.PI / 180)
const ROTATION_SPEED = 0.12
const EARTH_RADIUS = 1.42
const GRID_STEP = 20
const STONE_BASE_COLOR = '#262729'
const STONE_GRID_COLOR = '#817970'

type Coordinates = [number, number]
type PolygonCoordinates = Coordinates[][]
type LandGeometry =
  | { type: 'Polygon'; coordinates: PolygonCoordinates }
  | { type: 'MultiPolygon'; coordinates: PolygonCoordinates[] }
type LandData = {
  features: Array<{ geometry: LandGeometry | null }>
}

function toSphere([longitude, latitude]: Coordinates, radius: number) {
  const longitudeRadians = longitude * (Math.PI / 180)
  const latitudeRadians = latitude * (Math.PI / 180)

  return new Vector3(
    radius * Math.cos(latitudeRadians) * Math.sin(longitudeRadians),
    radius * Math.sin(latitudeRadians),
    radius * Math.cos(latitudeRadians) * Math.cos(longitudeRadians),
  )
}

function lineFromPoints(points: Vector3[], material: LineBasicMaterial) {
  const geometry = new BufferGeometry().setFromPoints(points)
  return new Line(geometry, material)
}

function addGraticule(parent: Group) {
  const material = new LineBasicMaterial({
    color: STONE_GRID_COLOR,
    transparent: true,
    opacity: 0.42,
    depthWrite: false,
  })
  const segments = 64

  for (let longitude = -160; longitude <= 180; longitude += GRID_STEP) {
    const points = Array.from({ length: segments + 1 }, (_, index) => {
      const latitude = -90 + (180 * index) / segments
      return toSphere([longitude, latitude], EARTH_RADIUS + 0.024)
    })
    parent.add(lineFromPoints(points, material))
  }

  for (let latitude = -80; latitude <= 80; latitude += GRID_STEP) {
    const points = Array.from({ length: segments + 1 }, (_, index) => {
      const longitude = -180 + (360 * index) / segments
      return toSphere([longitude, latitude], EARTH_RADIUS + 0.024)
    })
    parent.add(lineFromPoints(points, material))
  }

  return material
}

function cleanRing(ring: Coordinates[]) {
  if (ring.length > 1) {
    const first = ring[0]
    const last = ring[ring.length - 1]
    if (first[0] === last[0] && first[1] === last[1]) return ring.slice(0, -1)
  }
  return ring
}

function drawRing(context: CanvasRenderingContext2D, ring: Coordinates[], width: number, height: number) {
  const cleanedRing = cleanRing(ring)
  if (cleanedRing.length < 3) return

  cleanedRing.forEach(([longitude, latitude], index) => {
    const x = ((longitude + 180) / 360) * width
    const y = ((90 - latitude) / 180) * height
    if (index === 0) context.moveTo(x, y)
    else context.lineTo(x, y)
  })
  context.closePath()
}

function tracePolygon(context: CanvasRenderingContext2D, polygon: PolygonCoordinates, width: number, height: number) {
  context.beginPath()
  polygon.forEach((ring) => drawRing(context, ring, width, height))
}

function loadStoneImage() {
  return new Promise<HTMLImageElement | null>((resolve) => {
    const image = new Image()
    image.decoding = 'async'
    image.onload = () => resolve(image)
    image.onerror = () => resolve(null)
    image.src = STONE_TEXTURE_DATA
  })
}

function createLandTexture(data: LandData) {
  const width = 4096
  const height = 2048
  const mapCanvas = document.createElement('canvas')
  mapCanvas.width = width
  mapCanvas.height = height

  const mapContext = mapCanvas.getContext('2d')
  if (!mapContext) return null

  // GeoJSON определяет исключительно маску суши. Цвет и фактура едины для сферы.
  mapContext.fillStyle = '#ffffff'
  data.features.forEach(({ geometry }) => {
    if (!geometry) return
    const polygons: PolygonCoordinates[] = geometry.type === 'Polygon' ? [geometry.coordinates] : geometry.coordinates
    polygons.forEach((polygon) => {
      tracePolygon(mapContext, polygon, width, height)
      mapContext.fill('evenodd')
    })
  })

  // SphereGeometry начинает UV-развёртку с долготы −90°. Сдвигаем карту на четверть
  // оборота, чтобы сетка, береговая линия и стартовый ракурс совпадали географически.
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const context = canvas.getContext('2d')
  if (!context) return null
  context.drawImage(mapCanvas, -width * 0.25, 0)
  context.drawImage(mapCanvas, width * 0.75, 0)

  const texture = new CanvasTexture(canvas)
  texture.colorSpace = SRGBColorSpace
  return texture
}

function disposeObject(object: Object3D) {
  object.traverse((child) => {
    if ('geometry' in child && child.geometry instanceof BufferGeometry) child.geometry.dispose()
  })
}

export default function EarthGlobe() {
  const { t } = useI18n()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'high-performance' })
    renderer.setClearColor(0x000000, 0)

    const scene = new Scene()
    const camera = new PerspectiveCamera(34, 1, 0.1, 100)
    // Небольшой запас по краям оставляет сферу полностью круглой внутри canvas.
    camera.position.set(0, 0, 5.05)

    const axialGroup = new Group()
    axialGroup.rotation.z = -AXIAL_TILT
    scene.add(axialGroup)

    const earth = new Mesh(
      new SphereGeometry(EARTH_RADIUS, 64, 32),
      new MeshStandardMaterial({
        color: STONE_BASE_COLOR,
        roughness: 0.97,
        metalness: 0.03,
        flatShading: false,
        dithering: true,
      }),
    )
    // Стартуем над Африкой, чтобы материки были узнаваемы сразу после загрузки.
    earth.rotation.y = -0.2
    axialGroup.add(earth)

    const gridGroup = new Group()
    gridGroup.rotation.y = -0.2
    gridGroup.renderOrder = 2
    axialGroup.add(gridGroup)
    const gridMaterial = addGraticule(gridGroup)

    const compactNetwork = window.matchMedia('(max-width: 820px)').matches
    const projectNetwork = createProjectNetwork(EARTH_RADIUS, compactNetwork, ROTATION_SPEED)
    projectNetwork.group.rotation.y = -0.2
    axialGroup.add(projectNetwork.group)

    const landMaterial = new MeshStandardMaterial({
      color: '#ffffff',
      transparent: true,
      // Не показываем белый fallback-слой до загрузки карты фактуры.
      opacity: 0,
      depthWrite: false,
      roughness: 0.99,
      metalness: 0.01,
      emissive: '#ffffff',
      emissiveIntensity: 0.16,
      flatShading: false,
      dithering: true,
    })
    const landSurface = new Mesh(
      new SphereGeometry(EARTH_RADIUS + 0.018, 64, 32),
      landMaterial,
    )
    landSurface.renderOrder = 1
    landSurface.rotation.y = -0.2
    axialGroup.add(landSurface)

    scene.add(new AmbientLight('#eee9e4', 1.1))
    const keyLight = new DirectionalLight('#fff1df', 3.15)
    keyLight.position.set(-5.2, 3.8, 4.8)
    scene.add(keyLight)
    const rimLight = new DirectionalLight('#484440', 0.24)
    rimLight.position.set(3, -1.5, -3)
    scene.add(rimLight)

    let animationFrame = 0
    let previousTime = performance.now()
    let landTexture: CanvasTexture | null = null
    let stoneTexture: CanvasTexture | null = null
    let disposed = false
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    Promise.all([
      fetch(LAND_DATA).then((response) => {
        if (!response.ok) throw new Error('Не удалось загрузить карту материков')
        return response.json() as Promise<LandData>
      }),
      loadStoneImage(),
    ])
      .then(([data, stoneImage]) => {
        if (disposed) return
        landTexture = createLandTexture(data)
        stoneTexture = stoneImage ? createStoneTexture(stoneImage) : null
        if (!landTexture || !stoneTexture) return
        stoneTexture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy())
        applyStoneMaterial(landMaterial, stoneTexture)
        landMaterial.map = landTexture
        landMaterial.opacity = 1
        landMaterial.needsUpdate = true
        if (reducedMotion) renderer.render(scene, camera)
      })
      .catch(() => {
        // При ошибке загрузки остаются основа и сетка, без белой вспышки.
      })

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect()
      const safeWidth = Math.max(width, 1)
      const safeHeight = Math.max(height, 1)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setSize(safeWidth, safeHeight, false)
      camera.aspect = safeWidth / safeHeight
      camera.updateProjectionMatrix()
    }

    const render = (time: number) => {
      const elapsed = Math.min((time - previousTime) / 1000, 0.05)
      previousTime = time
      earth.rotation.y -= elapsed * ROTATION_SPEED
      landSurface.rotation.y -= elapsed * ROTATION_SPEED
      gridGroup.rotation.y -= elapsed * ROTATION_SPEED
      projectNetwork.group.rotation.y -= elapsed * ROTATION_SPEED
      projectNetwork.update(elapsed)
      renderer.render(scene, camera)
      animationFrame = window.requestAnimationFrame(render)
    }

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(canvas)
    resize()

    if (reducedMotion) {
      renderer.render(scene, camera)
    } else {
      animationFrame = window.requestAnimationFrame(render)
    }

    return () => {
      disposed = true
      window.cancelAnimationFrame(animationFrame)
      resizeObserver.disconnect()
      axialGroup.remove(projectNetwork.group)
      projectNetwork.dispose()
      disposeObject(axialGroup)
      gridMaterial.dispose()
      landTexture?.dispose()
      stoneTexture?.dispose()
      landMaterial.dispose()
      earth.material.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div className={styles.globe} aria-label={t('globe.label')}>
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
    </div>
  )
}
