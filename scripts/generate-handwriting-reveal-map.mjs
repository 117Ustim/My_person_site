import sharp from 'sharp'
import { fileURLToPath } from 'node:url'

const SOURCE_WIDTH = 1343
const SOURCE_HEIGHT = 1171
const MAP_WIDTH = 672
const MAP_HEIGHT = 586
const TIMING_SCALE = 0.75

const sourcePath = fileURLToPath(new URL('../public/assets/about/variant-4-hero-accent-turning-ideas.png', import.meta.url))
const outputPath = fileURLToPath(new URL('../public/assets/about/variant-4-hero-accent-turning-ideas-reveal-map.png', import.meta.url))

let timeline = 0

function stroke(name, d, duration, region, gapAfter = 0.04) {
  const trace = {
    name,
    d,
    duration: duration * TIMING_SCALE,
    region,
    start: timeline,
  }

  timeline += (duration + gapAfter) * TIMING_SCALE
  return trace
}

const traces = [
  stroke('T — верхняя линия', 'M 294 340 C 380 292 500 230 592 212', 0.32, [280, 190, 610, 365], 0.04),
  stroke('T — нисходящая линия', 'M 426 292 C 408 348 385 432 352 548', 0.38, [325, 275, 450, 570], 0.04),
  stroke('u', 'M 445 382 C 430 425 425 462 449 470 C 474 478 498 425 507 388', 0.30, [405, 350, 525, 490]),
  stroke('r', 'M 496 447 C 520 400 543 360 563 350 C 583 340 601 348 616 366', 0.24, [475, 325, 630, 470]),
  stroke('n', 'M 596 420 C 616 368 640 338 661 349 C 678 360 666 398 677 410 C 692 422 707 385 722 353', 0.28, [570, 315, 735, 445]),
  stroke('i — основа', 'M 707 406 C 728 370 746 336 765 305 C 780 282 793 297 785 321 C 775 352 760 384 770 399', 0.18, [690, 285, 810, 430]),
  stroke('i — точка', 'M 770 278 C 779 269 788 263 797 260', 0.10, [745, 238, 815, 300]),
  stroke('n', 'M 770 397 C 796 354 821 322 843 331 C 863 340 846 374 856 391 C 871 409 896 365 916 329', 0.28, [748, 300, 930, 430]),
  stroke('g', 'M 905 386 C 929 335 958 306 980 316 C 1002 327 984 366 956 389 C 930 410 930 437 947 451 C 969 469 997 426 1017 379 C 1032 344 1048 310 1067 291 C 1079 279 1090 284 1093 294', 0.40, [870, 215, 1110, 485], 0.14),

  stroke('i — основа', 'M 371 640 C 350 678 341 716 360 735 C 378 753 404 711 421 674', 0.20, [325, 600, 435, 770]),
  stroke('i — точка', 'M 358 633 C 367 625 376 620 385 618', 0.10, [335, 600, 400, 655]),
  stroke('d', 'M 406 690 C 428 650 456 625 480 635 C 505 646 490 684 462 700 C 444 710 446 731 465 740 C 492 752 511 702 521 652 C 531 602 536 549 525 516 C 516 548 508 620 501 686', 0.40, [390, 490, 545, 770]),
  stroke('e', 'M 505 690 C 535 646 566 615 591 625 C 610 634 591 659 560 671 C 544 678 554 696 576 696 C 601 696 621 670 636 645', 0.24, [485, 590, 650, 715]),
  stroke('a', 'M 601 680 C 622 636 651 611 675 621 C 700 631 686 675 660 686 C 640 694 638 674 651 649 C 663 625 681 620 696 635 C 710 650 701 674 716 680', 0.28, [585, 575, 730, 710]),
  stroke('s', 'M 692 655 C 720 617 749 591 770 596 C 787 602 771 620 746 635 C 721 650 726 675 751 680', 0.22, [675, 560, 785, 700], 0.08),
  stroke('i — основа', 'M 791 610 C 806 580 820 551 835 531 C 846 517 851 534 842 556 C 831 582 821 605 831 616', 0.18, [770, 520, 855, 640]),
  stroke('i — точка', 'M 814 522 C 823 514 832 509 841 508', 0.10, [795, 490, 860, 540]),
  stroke('n', 'M 825 610 C 846 575 866 546 886 551 C 906 556 891 584 901 601 C 916 617 936 580 951 550', 0.28, [810, 515, 965, 635]),
  stroke('t — основа', 'M 930 601 C 951 559 971 510 991 461 C 1001 435 1012 420 1021 426 C 1031 436 1016 476 1001 516 C 986 556 971 590 981 601', 0.28, [910, 405, 1040, 625]),
  stroke('t — перекладина', 'M 914 503 C 971 486 1030 471 1084 457', 0.10, [895, 440, 1100, 520]),
  stroke('o', 'M 985 585 C 1007 546 1040 520 1071 526 C 1101 532 1091 569 1060 586 C 1030 602 1010 585 1021 555 C 1031 530 1061 521 1092 536', 0.24, [970, 490, 1120, 615], 0.14),

  stroke('p', 'M 431 860 C 411 920 391 991 375 1048 C 395 982 416 916 440 867 C 460 831 500 832 515 856 C 531 882 511 910 480 922 C 451 933 435 910 440 886 C 445 866 466 850 491 856', 0.42, [350, 805, 535, 1070]),
  stroke('r', 'M 493 902 C 520 864 541 840 561 836 C 581 831 591 846 601 861', 0.22, [475, 815, 615, 930]),
  stroke('o', 'M 580 890 C 601 850 631 830 661 838 C 691 846 681 881 650 896 C 620 911 600 895 611 865 C 621 840 651 835 676 850', 0.24, [560, 800, 695, 920]),
  stroke('d', 'M 661 875 C 681 839 711 815 736 821 C 761 827 753 861 725 876 C 701 890 686 875 696 849 C 716 810 741 761 766 711 C 781 680 791 670 801 681 C 811 692 796 731 781 771 C 761 821 749 865 761 876', 0.38, [640, 650, 820, 910]),
  stroke('u', 'M 756 855 C 771 825 781 800 796 791 C 809 783 811 800 804 821 C 796 843 801 856 816 859 C 836 861 856 825 871 795', 0.28, [740, 765, 885, 885]),
  stroke('c', 'M 851 840 C 876 801 906 780 931 791 C 946 801 931 820 911 826 C 891 831 889 846 906 851 C 926 856 946 835 961 815', 0.22, [835, 755, 975, 875]),
  stroke('t — основа', 'M 941 840 C 961 800 981 751 1001 701 C 1013 670 1026 645 1041 640 C 1051 650 1036 691 1021 731 C 1006 771 991 816 1001 831', 0.28, [920, 620, 1060, 865]),
  stroke('t — перекладина', 'M 901 721 C 966 701 1031 681 1091 665', 0.10, [885, 640, 1110, 740]),
  stroke('s', 'M 996 810 C 1021 780 1051 751 1076 756 C 1096 761 1081 785 1056 801 C 1036 816 1041 836 1066 836 C 1086 836 1101 820 1111 805', 0.22, [980, 720, 1130, 860], 0.12),
  stroke('подчёркивание', 'M 489 1050 C 570 1032 653 1022 742 1015', 0.30, [470, 990, 760, 1070], 0),
]

const TOTAL_DURATION = timeline

function cubicPoint(start, controlA, controlB, end, progress) {
  const inverse = 1 - progress
  const inverseSquared = inverse * inverse
  const progressSquared = progress * progress

  return {
    x: inverseSquared * inverse * start.x + 3 * inverseSquared * progress * controlA.x + 3 * inverse * progressSquared * controlB.x + progressSquared * progress * end.x,
    y: inverseSquared * inverse * start.y + 3 * inverseSquared * progress * controlA.y + 3 * inverse * progressSquared * controlB.y + progressSquared * progress * end.y,
  }
}

function samplePath(path, startTime, duration) {
  const tokens = path.match(/[MC]|-?\d+(?:\.\d+)?/g) ?? []
  const segments = []
  let cursor = 0
  let current = { x: 0, y: 0 }

  while (cursor < tokens.length) {
    const command = tokens[cursor]
    cursor += 1

    if (command === 'M') {
      current = { x: Number(tokens[cursor]), y: Number(tokens[cursor + 1]) }
      cursor += 2
      continue
    }

    if (command !== 'C') throw new Error(`Неподдерживаемая SVG-команда: ${command}`)

    const controlA = { x: Number(tokens[cursor]), y: Number(tokens[cursor + 1]) }
    const controlB = { x: Number(tokens[cursor + 2]), y: Number(tokens[cursor + 3]) }
    const end = { x: Number(tokens[cursor + 4]), y: Number(tokens[cursor + 5]) }
    segments.push({ start: current, controlA, controlB, end })
    current = end
    cursor += 6
  }

  const densePoints = []
  for (const segment of segments) {
    for (let step = 0; step <= 28; step += 1) {
      densePoints.push(cubicPoint(segment.start, segment.controlA, segment.controlB, segment.end, step / 28))
    }
  }

  const distances = [0]
  for (let index = 1; index < densePoints.length; index += 1) {
    const previous = densePoints[index - 1]
    const currentPoint = densePoints[index]
    distances.push(distances[index - 1] + Math.hypot(currentPoint.x - previous.x, currentPoint.y - previous.y))
  }

  const totalDistance = distances.at(-1) || 1
  return densePoints.map((point, index) => ({
    x: point.x * MAP_WIDTH / SOURCE_WIDTH,
    y: point.y * MAP_HEIGHT / SOURCE_HEIGHT,
    time: startTime + duration * distances[index] / totalDistance,
  }))
}

const sampledTraces = traces.map(trace => ({
  ...trace,
  samples: samplePath(trace.d, trace.start, trace.duration),
}))
const samples = sampledTraces.flatMap(trace => trace.samples)
const { data: sourcePixels } = await sharp(sourcePath)
  .resize(MAP_WIDTH, MAP_HEIGHT, { fit: 'fill' })
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true })

const revealMap = Buffer.alloc(MAP_WIDTH * MAP_HEIGHT * 3, 255)

for (let y = 0; y < MAP_HEIGHT; y += 1) {
  for (let x = 0; x < MAP_WIDTH; x += 1) {
    const pixelIndex = y * MAP_WIDTH + x
    if (sourcePixels[pixelIndex * 4 + 3] < 4) continue

    let nearestDistance = Number.POSITIVE_INFINITY
    let revealTime = TOTAL_DURATION
    const sourceX = x * SOURCE_WIDTH / MAP_WIDTH
    const sourceY = y * SOURCE_HEIGHT / MAP_HEIGHT
    let hasRegionalTrace = false

    const compareSamples = traceSamples => {
      for (const sample of traceSamples) {
        const deltaX = x - sample.x
        const deltaY = y - sample.y
        const distance = deltaX * deltaX + deltaY * deltaY

        if (distance >= nearestDistance) continue
        nearestDistance = distance
        revealTime = sample.time
      }
    }

    for (const trace of sampledTraces) {
      const [left, top, right, bottom] = trace.region
      if (sourceX < left || sourceX > right || sourceY < top || sourceY > bottom) continue

      hasRegionalTrace = true
      compareSamples(trace.samples)
    }

    if (!hasRegionalTrace) compareSamples(samples)

    const edgeDelay = Math.min(0.08, Math.sqrt(nearestDistance) * 0.0018)
    const revealValue = Math.min(65534, Math.round((revealTime + edgeDelay) / TOTAL_DURATION * 65534))
    const revealOffset = pixelIndex * 3
    revealMap[revealOffset] = revealValue >> 8
    revealMap[revealOffset + 1] = revealValue & 255
    revealMap[revealOffset + 2] = 0
  }
}

await sharp(revealMap, {
  raw: {
    width: MAP_WIDTH,
    height: MAP_HEIGHT,
    channels: 3,
  },
}).png().toFile(outputPath)

console.log(`Карта прорисовки создана: ${outputPath}`)
