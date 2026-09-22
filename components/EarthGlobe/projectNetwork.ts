import {
  BufferGeometry,
  CatmullRomCurve3,
  CanvasTexture,
  DoubleSide,
  Group,
  Mesh,
  MeshBasicMaterial,
  RingGeometry,
  SphereGeometry,
  Sprite,
  SpriteMaterial,
  SRGBColorSpace,
  TubeGeometry,
  Vector3,
} from 'three'

type Coordinates = [number, number]
type ProjectKind = 'web' | 'crm' | 'mobile' | 'cloud'

type NetworkNode = {
  coordinates: Coordinates
  isHome?: boolean
}

type RouteDefinition = {
  from: number
  to: number
  kind: ProjectKind
}

type Route = RouteDefinition & {
  endpointNormal: Vector3
  geometry: BufferGeometry
  points: Vector3[]
}

type ProjectNetwork = {
  group: Group
  update: (delta: number) => void
  dispose: () => void
}

const ROUTE_DURATION = 5.4
const ROUTE_IDLE_TIME = 1.6
const ARC_SEGMENTS = 72

const nodes: NetworkNode[] = [
  { coordinates: [30.5234, 50.4501], isHome: true }, // Киев
  { coordinates: [-9.1393, 38.7223] }, // Лиссабон
  { coordinates: [-79.3832, 43.6532] }, // Торонто
  { coordinates: [-122.4194, 37.7749] }, // Сан-Франциско
  { coordinates: [-46.6333, -23.5505] }, // Сан-Паулу
  { coordinates: [103.8198, 1.3521] }, // Сингапур
  { coordinates: [139.6917, 35.6895] }, // Токио
  { coordinates: [151.2093, -33.8688] }, // Сидней
  { coordinates: [3.3792, 6.5244] }, // Лагос
]

const routeDefinitions: RouteDefinition[] = [
  { from: 0, to: 8, kind: 'web' },
  { from: 0, to: 4, kind: 'cloud' },
  { from: 0, to: 1, kind: 'crm' },
  { from: 0, to: 2, kind: 'web' },
  { from: 0, to: 5, kind: 'mobile' },
  { from: 3, to: 6, kind: 'web' },
  { from: 6, to: 7, kind: 'mobile' },
  { from: 2, to: 3, kind: 'crm' },
  { from: 7, to: 0, kind: 'cloud' },
]

function toSphere([longitude, latitude]: Coordinates, radius: number) {
  const longitudeRadians = longitude * (Math.PI / 180)
  const latitudeRadians = latitude * (Math.PI / 180)

  return new Vector3(
    radius * Math.cos(latitudeRadians) * Math.sin(longitudeRadians),
    radius * Math.sin(latitudeRadians),
    radius * Math.cos(latitudeRadians) * Math.cos(longitudeRadians),
  )
}

function clamp(value: number, minimum = 0, maximum = 1) {
  return Math.min(Math.max(value, minimum), maximum)
}

function smoothstep(value: number) {
  const progress = clamp(value)
  return progress * progress * (3 - 2 * progress)
}

function rangeProgress(value: number, start: number, end: number) {
  return smoothstep((value - start) / (end - start))
}

function createArcPoints(startCoordinates: Coordinates, endCoordinates: Coordinates, earthRadius: number) {
  const surfaceOffset = 0.03
  const lift = earthRadius * 0.07
  const radius = earthRadius + surfaceOffset
  const startDirection = toSphere(startCoordinates, 1).normalize()
  const endDirection = toSphere(endCoordinates, 1).normalize()
  const start = startDirection.clone().multiplyScalar(radius)
  const end = endDirection.clone().multiplyScalar(radius)
  const angle = Math.acos(clamp(startDirection.dot(endDirection), -1, 1))
  const midpointDirection = startDirection.clone().add(endDirection).normalize()
  const controlRadius = 2 * (radius + lift) - radius * Math.cos(angle / 2)
  const control = midpointDirection.multiplyScalar(controlRadius)

  return Array.from({ length: ARC_SEGMENTS + 1 }, (_, index) => {
    const progress = index / ARC_SEGMENTS
    const remaining = 1 - progress
    // Квадратичная Bézier-кривая приподнимается над сферой и мягко входит в обе точки.
    return start.clone().multiplyScalar(remaining * remaining)
      .add(control.clone().multiplyScalar(2 * remaining * progress))
      .add(end.clone().multiplyScalar(progress * progress))
  })
}

function setPointOnArc(target: Vector3, points: Vector3[], progress: number) {
  const scaled = clamp(progress) * (points.length - 1)
  const index = Math.min(Math.floor(scaled), points.length - 2)
  return target.copy(points[index]).lerp(points[index + 1], scaled - index)
}

function rotatedDepth(point: Vector3, rotationY: number) {
  const length = point.length()
  if (length === 0) return -1
  return (-point.x * Math.sin(rotationY) + point.z * Math.cos(rotationY)) / length
}

function routeVisibilityScore(route: Route, rotationY: number, rotationSpeed: number) {
  const checkTimes = [0.75, 2.7, 4.55]
  const sampleStep = Math.max(1, Math.floor(ARC_SEGMENTS / 8))
  let minimumDepth = 1

  checkTimes.forEach((time) => {
    const predictedRotation = rotationY - rotationSpeed * time
    for (let index = 0; index < route.points.length; index += sampleStep) {
      minimumDepth = Math.min(minimumDepth, rotatedDepth(route.points[index], predictedRotation))
    }
    minimumDepth = Math.min(minimumDepth, rotatedDepth(route.points[route.points.length - 1], predictedRotation))
  })

  const startDepth = rotatedDepth(route.points[0], rotationY - rotationSpeed * 0.75)
  const endpointDepth = Math.min(
    rotatedDepth(route.endpointNormal, rotationY - rotationSpeed * 3.35),
    rotatedDepth(route.endpointNormal, rotationY - rotationSpeed * 4.55),
  )

  if (startDepth < 0.08 || endpointDepth < 0.2 || minimumDepth < 0.015) return null
  return minimumDepth + endpointDepth * 0.45 + (route.from === 0 || route.to === 0 ? 0.08 : 0)
}

function roundedRectangle(context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) {
  context.beginPath()
  context.moveTo(x + radius, y)
  context.lineTo(x + width - radius, y)
  context.quadraticCurveTo(x + width, y, x + width, y + radius)
  context.lineTo(x + width, y + height - radius)
  context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
  context.lineTo(x + radius, y + height)
  context.quadraticCurveTo(x, y + height, x, y + height - radius)
  context.lineTo(x, y + radius)
  context.quadraticCurveTo(x, y, x + radius, y)
}

function drawWebIcon(context: CanvasRenderingContext2D) {
  roundedRectangle(context, 20, 27, 88, 72, 12)
  context.stroke()
  context.beginPath()
  context.moveTo(20, 47)
  context.lineTo(108, 47)
  context.moveTo(53, 63)
  context.lineTo(42, 73)
  context.lineTo(53, 83)
  context.moveTo(75, 63)
  context.lineTo(86, 73)
  context.lineTo(75, 83)
  context.stroke()
}

function drawCrmIcon(context: CanvasRenderingContext2D) {
  const points = [[64, 27], [34, 92], [94, 92], [64, 66]] as const
  context.beginPath()
  context.moveTo(59, 39)
  context.lineTo(39, 81)
  context.moveTo(69, 39)
  context.lineTo(89, 81)
  context.moveTo(47, 92)
  context.lineTo(81, 92)
  context.stroke()

  points.forEach(([x, y], index) => {
    context.beginPath()
    context.arc(x, y, index === 3 ? 8 : 11, 0, Math.PI * 2)
    context.stroke()
  })
}

function drawMobileIcon(context: CanvasRenderingContext2D) {
  roundedRectangle(context, 39, 17, 50, 94, 12)
  context.stroke()
  context.beginPath()
  context.moveTo(54, 29)
  context.lineTo(74, 29)
  context.moveTo(57, 98)
  context.lineTo(71, 98)
  context.stroke()
  context.strokeRect(49, 43, 30, 38)
}

function drawCloudIcon(context: CanvasRenderingContext2D) {
  context.beginPath()
  context.moveTo(32, 69)
  context.bezierCurveTo(22, 68, 21, 52, 33, 48)
  context.bezierCurveTo(35, 31, 57, 27, 68, 40)
  context.bezierCurveTo(84, 34, 103, 44, 99, 61)
  context.bezierCurveTo(98, 68, 91, 72, 82, 72)
  context.stroke()

  context.beginPath()
  context.ellipse(64, 76, 19, 7, 0, 0, Math.PI * 2)
  context.moveTo(45, 76)
  context.lineTo(45, 95)
  context.bezierCurveTo(45, 105, 83, 105, 83, 95)
  context.lineTo(83, 76)
  context.moveTo(45, 86)
  context.bezierCurveTo(45, 96, 83, 96, 83, 86)
  context.stroke()
}

function createIconTexture(kind: ProjectKind) {
  const canvas = document.createElement('canvas')
  canvas.width = 128
  canvas.height = 128
  const context = canvas.getContext('2d')
  if (!context) return null

  context.clearRect(0, 0, 128, 128)
  context.strokeStyle = '#f7f5f0'
  context.lineWidth = 6
  context.lineCap = 'round'
  context.lineJoin = 'round'
  context.shadowColor = 'rgba(0, 0, 0, 0.82)'
  context.shadowBlur = 10

  if (kind === 'web') drawWebIcon(context)
  if (kind === 'crm') drawCrmIcon(context)
  if (kind === 'mobile') drawMobileIcon(context)
  if (kind === 'cloud') drawCloudIcon(context)

  const texture = new CanvasTexture(canvas)
  texture.colorSpace = SRGBColorSpace
  texture.needsUpdate = true
  return texture
}

export function createProjectNetwork(earthRadius: number, compact = false, rotationSpeed = 0): ProjectNetwork {
  const group = new Group()
  group.renderOrder = 3
  const visibleNodeIndexes = new Set(compact ? [0, 4, 5, 7, 8] : nodes.map((_, index) => index))

  const pointGeometry = new SphereGeometry(0.011, 12, 8)
  const homePointGeometry = new SphereGeometry(0.016, 14, 10)
  const pointMeshes = nodes.map((node, index) => {
    const material = new MeshBasicMaterial({
      color: node.isHome ? '#ff9a90' : '#eee9e4',
      transparent: true,
      opacity: node.isHome ? 0.78 : 0.46,
      depthWrite: false,
    })
    const point = new Mesh(node.isHome ? homePointGeometry : pointGeometry, material)
    point.position.copy(toSphere(node.coordinates, earthRadius + 0.028))
    point.visible = visibleNodeIndexes.has(index)
    point.renderOrder = 3
    group.add(point)
    return point
  })

  const routes: Route[] = routeDefinitions
    .filter((route) => visibleNodeIndexes.has(route.from) && visibleNodeIndexes.has(route.to))
    .map((route) => {
      const points = createArcPoints(nodes[route.from].coordinates, nodes[route.to].coordinates, earthRadius)
      return {
        ...route,
        endpointNormal: points[points.length - 1].clone().normalize(),
        points,
        geometry: new TubeGeometry(new CatmullRomCurve3(points), ARC_SEGMENTS, 0.0045, 5, false),
      }
    })

  const lineMaterial = new MeshBasicMaterial({
    color: '#ddd8d2',
    transparent: true,
    opacity: 0,
    depthWrite: false,
  })
  const routeLine = new Mesh(routes[0].geometry, lineMaterial)
  routeLine.renderOrder = 3
  group.add(routeLine)

  const pulseMaterial = new MeshBasicMaterial({
    color: '#fffaf4',
    transparent: true,
    opacity: 0,
    depthWrite: false,
  })
  const pulse = new Mesh(new SphereGeometry(0.019, 14, 10), pulseMaterial)
  pulse.visible = false
  pulse.renderOrder = 4
  group.add(pulse)

  const arrivalMaterial = new MeshBasicMaterial({
    color: '#ff877a',
    transparent: true,
    opacity: 0,
    depthWrite: false,
    side: DoubleSide,
  })
  const arrivalRing = new Mesh(new RingGeometry(0.052, 0.064, 48), arrivalMaterial)
  arrivalRing.visible = false
  arrivalRing.renderOrder = 4
  group.add(arrivalRing)

  const iconTextures = {
    web: createIconTexture('web'),
    crm: createIconTexture('crm'),
    mobile: createIconTexture('mobile'),
    cloud: createIconTexture('cloud'),
  }
  const iconMaterial = new SpriteMaterial({
    map: iconTextures.crm,
    transparent: true,
    opacity: 0,
    depthTest: true,
    depthWrite: false,
  })
  const projectIcon = new Sprite(iconMaterial)
  projectIcon.scale.setScalar(0.2)
  projectIcon.visible = false
  projectIcon.renderOrder = 5
  group.add(projectIcon)

  let routeTime = 0
  let idleTime = ROUTE_IDLE_TIME
  let routeRunning = false
  let lastRouteIndex = -1
  let activeRoute = routes[0]
  let previousEndpoint = pointMeshes[activeRoute.to]
  const ringNormal = new Vector3(0, 0, 1)

  const hideRoute = () => {
    previousEndpoint.scale.setScalar(1)
    routeLine.visible = false
    pulse.visible = false
    arrivalRing.visible = false
    projectIcon.visible = false
    lineMaterial.opacity = 0
    pulseMaterial.opacity = 0
    arrivalMaterial.opacity = 0
    iconMaterial.opacity = 0
  }

  const findVisibleRoute = () => {
    const candidates = routes
      .map((route, index) => ({ index, route, score: routeVisibilityScore(route, group.rotation.y, rotationSpeed) }))
      .filter((candidate): candidate is { index: number; route: Route; score: number } => candidate.score !== null)
      .sort((left, right) => right.score - left.score)

    return candidates.find((candidate) => candidate.index !== lastRouteIndex) ?? candidates[0] ?? null
  }

  const activateRoute = (route: Route, routeIndex: number) => {
    previousEndpoint.scale.setScalar(1)
    activeRoute = route
    lastRouteIndex = routeIndex
    previousEndpoint = pointMeshes[activeRoute.to]
    routeLine.geometry = activeRoute.geometry
    routeLine.geometry.setDrawRange(0, 6)
    routeLine.visible = false
    iconMaterial.map = iconTextures[activeRoute.kind]
    iconMaterial.needsUpdate = true
  }

  const update = (delta: number) => {
    if (!routeRunning) {
      idleTime += delta
      if (idleTime < ROUTE_IDLE_TIME) return

      const nextRoute = findVisibleRoute()
      if (!nextRoute) return

      activateRoute(nextRoute.route, nextRoute.index)
      routeTime = 0
      idleTime = 0
      routeRunning = true
    }

    routeTime += delta
    const localTime = routeTime

    const reveal = rangeProgress(localTime, 0.7, 1.75)
    const fade = 1 - rangeProgress(localTime, 4.55, 5.35)
    const lineOpacity = Math.min(reveal, fade)
    lineMaterial.opacity = lineOpacity * 0.44
    routeLine.visible = lineOpacity > 0.002
    const routeIndexCount = activeRoute.geometry.index?.count ?? activeRoute.geometry.attributes.position.count
    const visibleRouteIndexes = Math.max(6, Math.floor((reveal * routeIndexCount) / 6) * 6)
    routeLine.geometry.setDrawRange(0, visibleRouteIndexes)

    const pulseProgress = clamp((localTime - 1.58) / 1.42)
    const pulseVisible = localTime >= 1.58 && localTime <= 3
    pulse.visible = pulseVisible
    pulseMaterial.opacity = pulseVisible ? Math.sin(Math.PI * pulseProgress) * 0.94 : 0
    if (pulseVisible) setPointOnArc(pulse.position, activeRoute.points, pulseProgress)

    const endpointNormal = activeRoute.endpointNormal
    const arrivalProgress = clamp((localTime - 2.84) / 1.05)
    const arrivalVisible = localTime >= 2.84 && localTime <= 3.89
    arrivalRing.visible = arrivalVisible
    arrivalRing.position.copy(endpointNormal).multiplyScalar(earthRadius + 0.045)
    arrivalRing.quaternion.setFromUnitVectors(ringNormal, endpointNormal)
    arrivalRing.scale.setScalar(0.65 + arrivalProgress * 1.45)
    arrivalMaterial.opacity = arrivalVisible ? (1 - arrivalProgress) * 0.62 : 0

    const nodePulseProgress = clamp((localTime - 2.74) / 0.9)
    previousEndpoint.scale.setScalar(1 + Math.sin(Math.PI * nodePulseProgress) * 0.7)

    const iconFadeIn = rangeProgress(localTime, 3.02, 3.32)
    const iconFadeOut = 1 - rangeProgress(localTime, 4.12, 4.72)
    const iconOpacity = Math.min(iconFadeIn, iconFadeOut)
    projectIcon.visible = iconOpacity > 0.002
    projectIcon.position.copy(endpointNormal).multiplyScalar(earthRadius + 0.075)
    projectIcon.scale.setScalar(0.18 + iconFadeIn * 0.03)
    iconMaterial.opacity = iconOpacity * 0.9

    if (routeTime >= ROUTE_DURATION) {
      hideRoute()
      routeRunning = false
      idleTime = 0
    }
  }

  const dispose = () => {
    pointGeometry.dispose()
    homePointGeometry.dispose()
    pointMeshes.forEach((point) => point.material.dispose())
    routes.forEach((route) => route.geometry.dispose())
    lineMaterial.dispose()
    pulse.geometry.dispose()
    pulseMaterial.dispose()
    arrivalRing.geometry.dispose()
    arrivalMaterial.dispose()
    iconMaterial.dispose()
    Object.values(iconTextures).forEach((texture) => texture?.dispose())
  }

  return { group, update, dispose }
}
