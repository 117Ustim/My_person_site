# Design QA — единый SF Pro и вытянутое фото внутри цельной карточки

## Source visual truth

- Эскиз формы и композиции: `/Users/ustim/Downloads/Снимок экрана — 2026-09-14 в 00.24.01.png`, 906 × 560 px.
- Базовый референс карточек: `/Users/ustim/Downloads/Снимок экрана — 2026-09-13 в 23.38.43.png`.
- Целевой принцип: фото — вытянутый прямоугольник с закруглёнными краями внутри визуальной части; вокруг него нет отдельной рамки, а остаётся единый фон карточки, продолжающий фон текстовой области. Само фото показывается без дополнительного затемнения.

## Typography evidence

- Единый шрифт: `-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", sans-serif`.
- Отдельное подключение `Source Serif 4` из `app/layout.tsx` удалено; все точечные serif-правила в CSS-модулях заменены на тот же SF Pro-стек.
- Проверены homepage и внутренняя страница `/whos-it-for/independent-firms`: `body`, заголовки, абзацы, кнопки, ссылки и навигация возвращают один computed `font-family` — `-apple-system, "system-ui", "SF Pro Text", "SF Pro Display", sans-serif`.

## Implementation evidence

- Локальный маршрут: `http://localhost:3002/?capability-background=single-surface#projects`.
- Desktop viewport: 1440 × 1000 CSS px, DPR 1.
- Desktop-снимок: `/tmp/person-site-capability-single-surface-desktop.jpg`.
- Desktop-снимок после унификации шрифта: `/tmp/person-site-sf-pro-final-desktop.jpg`.
- Mobile viewport: 390 × 844 CSS px; ширина страницы 375 px.
- Mobile-снимок: `/tmp/person-site-capability-single-surface-mobile.jpg`.
- Mobile-снимок после унификации шрифта: `/tmp/person-site-sf-pro-final-mobile.jpg`.
- Состояние: тёмная тема, секция `#projects`, без hover; cookie-баннер закрыт перед контрольным desktop-снимком.
- DOM-проверка: 4 карточки, горизонтальный overflow `0`, Next.js error overlay пуст.

## Findings

- P0/P1/P2 расхождений не обнаружено.
- Отдельная рамка `4px` вокруг изображения удалена.
- Фото вложено в визуальную часть с базовым отступом `20px`: visual `696 × 404 px`, image `640 × 364 px` на desktop.
- На desktop для верхней пары фото закреплено у левого края с шириной `calc(100% - 16px)`, а для нижней пары — зеркально у правого края. Этот дополнительный внутренний запас компенсирует изгиб SVG-рамки, поэтому фактический зазор до контура на отмеченном участке остаётся `20px`, как снизу.
- Изображение остаётся вытянутым, не квадратным; на desktop его соотношение сторон примерно `1.8:1`.
- У изображения единый радиус `18px`; углы не обрезаются прямоугольной рамкой.
- Пространство вокруг фото просвечивает единый слой `.surface` с тем же `--surface-fill`, что и текстовая часть: `rgba(31, 30, 29, 0.54)`. Дополнительный фон у `.visual` отсутствует, поэтому альфа-слои больше не наслаиваются.
- Затемнение фото полностью удалено: у изображения `opacity: 1`, `filter: none`, а у визуальной части `mask-image: none`. Фото сохраняет исходную яркость без тёмного градиента справа.
- Равномерный фон вокруг фото сам создаёт чистый отступ до края визуальной части, поэтому резкой линии перехода между фото и текстовой поверхностью нет.
- Все текстовые элементы приложения используют единый SF Pro-стек; визуальная иерархия теперь задаётся только размером, весом, межстрочным интервалом и цветом.
- Коралловая внешняя обводка, цельная SVG-форма, тетрис-раскладка и внутренние радиусы карточек не изменены.
- На mobile фото также вытянутое (`301 × 200 px`), с радиусом `18px`; desktop-компенсация отключается, и со всех сторон сохраняется обычный отступ `20px`.

## Comparison history

- До текущей правки: вокруг изображения была отдельная рамка толщиной `4px`.
- Текущая правка: рамка удалена; добавлен внутренний отступ визуальной части, а ширина фото со стороны внутреннего изгиба уменьшена на `16px` зеркально, чтобы край не упирался в контур карточки.
- Фон визуальной области сделан прозрачным, поэтому она использует тот же слой `.surface`, что и текстовая область; обе части воспринимаются как одна поверхность без двойного наложения прозрачности.
- Дополнительные слои затемнения и боковые маски удалены; изменена только внутренняя композиция фото и его яркость.

## Required fidelity surfaces

- Типографика: единый системный SF Pro для body, заголовков, навигации, кнопок, карточек, статей и служебных страниц.
- Ритм и геометрия: тетрис-форма, одинаковые размеры фото-частей и текстовых хвостов, коралловый контур сохранены.
- Цвета: фон вокруг фото совпадает с текстовой поверхностью; номера и внешняя обводка остаются коралловыми.
- Изображения: исходные локальные ассеты и crop сохранены; добавлены только внутренний отступ и радиус изображения.
- Контент: названия, описания и технологии не менялись.

## Implementation checklist

- [x] Фото вытянутое, не квадратное.
- [x] Фото имеет закруглённые края `18px`.
- [x] Отдельная рамка вокруг фото удалена.
- [x] Вокруг фото со всех сторон остаётся единый фон текстовой части.
- [x] Фон фото-зоны и текстовой зоны рендерится одним слоем карточки.
- [x] Фото показывается без дополнительного затемнения.
- [x] Правый отступ верхней фото-части до изгиба рамки равен нижнему — `20px`.
- [x] Для зеркальной нижней пары тот же принцип применён слева.
- [x] Все страницы и основные UI-элементы используют единый SF Pro-стек.
- [x] `npm run build` успешно сгенерировал 53 Next.js entries.
- [x] Desktop и mobile проверены без горизонтальной прокрутки.
- [x] `npx tsc --noEmit` и `git diff --check` проходят.

## Logo evidence

- Старый логотип `obsidian` в шапке и футере заменён на белый знак `AU`.
- Финальный asset: `public/assets/au-logo-transparent.png`.
- Чёрный фон и тёмный ореол удалены: PNG содержит прозрачный alpha-канал вокруг букв, без видимого прямоугольника или свечения.
- Логотип подключён через `next/image`; desktop и mobile проверены с одинаковым размером в шапке, горизонтального overflow нет.

## Latest slider iteration

- Source visual truth: `/Users/ustim/Downloads/Снимок экрана — 2026-09-14 в 23.00.42.png`, референс двухколоночного `FeatureSlider` с активным пунктом, раскрытым описанием и прогресс-линией; исходный размер `3374 × 1664px`.
- Implementation screenshot: `/private/tmp/person-site-mobile-section-ua.jpg`; viewport `1710 × 951 CSS px`, DPR `2`, снимок `1695 × 943px`.
- State: домашняя страница, секция `Мобільні застосунки`, локаль `UA`, активен один из четырёх пунктов; сравнение проведено по полной композиции и сфокусированной области меню/визуала.
- Findings: P0/P1/P2 расхождений не обнаружено. Существующая двухколоночная структура, типографическая иерархия, цвета, отступы, радиусы, раскрытие описания, прогресс-линия и fade-переход изображения сохранены; добавлены только четыре мобильных пункта и их переводы.
- Interaction evidence: вручную выбран второй пункт, затем через 10 секунд автоматически активировался следующий; RU и EN показали четыре переведённых пункта без переполнения.

final result: passed

## Mobile hero — responsive composition pass — 2026-09-29

### Source visual truth

- User-approved reference: `/Users/ustim/Downloads/Снимок экрана — 2026-09-29 в 17.40.19.png`.
- Required outcome: the mobile hero keeps one balanced composition on every phone width; the dashboard stays centred, globe and portrait scale without distortion, and the visual rhythm between description, card, CTA and technology label remains stable.

### Implementation evidence

- Local route: `http://localhost:3000/`.
- Browser-rendered mobile checks completed at CSS viewports `320 × 760`, `375 × 812`, `430 × 860` and `520 × 900`.
- At `320px`: description → card `40px`, card → CTA `25px`, CTA → technology label `30px`.
- At `375px`: description → card `40px`, card → CTA `25px`, CTA → technology label `30px`.
- At `430px` and `520px`: the card, globe and portrait remain centred as a shared stage; no horizontal layout drift or portrait distortion was observed.
- The portrait uses a fixed aspect ratio, its horizontal position is anchored to the stage centre, and the fade continues to hide the lower image edge.
- TypeScript validation and `git diff --check` passed.

### Findings

- P0/P1/P2: none after the responsive pass.
- Typography: the mobile heading now caps at `38px`, preventing a wider phone from pushing the description down and breaking the visual rhythm.
- Spacing and layout: card, CTA and technology label follow a coordinated mobile scale rather than independent fixed coordinates.
- Colors and visual tokens: existing dark gradient, dashboard treatment and coral/white accents are unchanged.
- Image quality and asset fidelity: existing globe, dashboard and portrait assets are retained; the portrait keeps its natural proportion and lower-edge fade.
- Copy and content: unchanged.

### Comparison history

- Earlier implementation mixed fixed vertical positions with independently capped `vw` sizes. On narrow widths the portrait narrowed while retaining a fixed height; on wider phones the text grew and shifted the visual stage.
- Fix: introduced shared mobile layout variables, width-sensitive interpolation below `424px`, a narrow-screen override at `340px`, stage-centred portrait positioning and aspect-ratio-based portrait sizing.
- Post-fix validation confirms stable 40px / 25px / 30px spacing at narrow and standard mobile widths, plus stable composition at wider mobile width.

### Implementation checklist

- [x] Portrait scales proportionally without stretching.
- [x] Globe, dashboard and portrait share a centred composition stage.
- [x] Key vertical gaps stay stable across tested mobile widths.

## Mobile hero — proportional growth to 760px — 2026-09-29

- Scope: only the mobile range `501–760px`; desktop rules and the already-approved layout through `500px` are unchanged.
- Browser checks at `500px`, `600px` and `760px` confirm continuous growth of the shared stage: dashboard `280→311→360px`, globe `195→216→250px`, portrait `235→260→300px`, heading `38→42.6→50px`.
- The CTA and overlay use the same interpolation as the visual stage, preserving the relationship between the card, portrait fade and the technologies section.
- P0/P1/P2: none. TypeScript validation and whitespace validation passed.

final result: passed
- [x] Hero fade tracks the responsive hero height.
- [x] No desktop rule was changed.
- [x] Browser-rendered responsive states inspected.
- [x] `npx tsc --noEmit` and `git diff --check` passed.

final result: passed

## Decorative elements position — 2026-09-29

- Глобус и портрет подняты ровно на `200px` в мобильном media-query.
- Чистый перезапуск Next.js подтвердил корректную тёмную тему и отсутствие артефактов dev-runtime.
- Визуально проверено на мобильной ширине: оба элемента заметнее выступают из-под карточки, карточка остаётся поверх них.

final result: passed

## Mobile hero refinement — 2026-09-29

- Заголовок уменьшен до `clamp(34px, 8.6vw, 42px)`, описание — до `16px`; оба блока остаются без обрезки.
- Центральная карточка уменьшена до максимальной ширины `340px` и поднята над декоративными слоями.
- Глобус `150×150px` расположен под левой частью карточки, а портрет `150×190px` — под правой частью; карточка остаётся поверх них.
- Локальный визуальный просмотр подтверждает корректную композицию; `npx tsc --noEmit`, `git diff --check` и production-сборка выполняются после изменения.

final result: passed

## Project inquiry modal — selected conversation portal — 2026-09-27

### Source visual truth

- Selected third Image Gen concept: `/Users/ustim/.codex/generated_images/01a0e2a6-d0e9-7040-baac-0eeab7c2dc21/exec-e3333d0b-c5b2-4e92-a9d1-7e98c16315ed.png`, 1487 × 1058 px.
- Required visual language: a large graphite dialog rather than a generic centered card; editorial headline, a small circular founder portrait with coral ring, a conversation path, and the real inquiry form as a distinct right-side block.
- Decorative reference details added in the final iteration: a large lower-left coral semicircle, a thin upper sweep, an upper route line and coral point, a compact lower-left signature, and a footnote with a short rule.

### Implementation evidence

- Local route: `http://localhost:3000/`.
- Desktop browser capture: `/private/tmp/project-inquiry-modal-desktop-final.png`, 1710 × 896 px; CSS viewport 1710 × 952 px, DPR 1; dialog open in Ukrainian locale.
- Mobile browser state: CSS viewport 390 × 844 px; dialog width 370 px, no page-level horizontal overflow, and dialog scroll area `931 / 822 px` so all fields and CTA remain reachable.
- Combined source-and-rendered comparison: `/private/tmp/project-inquiry-modal-final-comparison.png`, normalized to 520 px height per side.
- Final decorative linework asset: `public/assets/project-inquiry-linework.png`, 1586 × 992 px with alpha; generated from the selected reference’s linework only and rendered behind live, localized UI.
- Primary interactions: open from CTA, close control, locale switching UA → RU → EN, and responsive modal scroll. Browser console had no error-level entries.

### Findings

- P0/P1/P2 расхождений не обнаружено после итерации сетки.
- Typography: the large light headline, compact uppercase eyebrow, coral italic last word, quiet labels and restrained secondary copy preserve the reference hierarchy. Ukrainian, Russian and English copy has equivalent hierarchy.
- Spacing and layout: the dialog uses a three-part desktop composition—intro, portrait/steps, form—and folds to a single vertical reading path on mobile. The initial QA issue where the form was placed in a second implicit grid row was fixed by assigning all three regions to the same first grid row.
- Colors and visual tokens: graphite surface, fine coral perimeter, coral avatar ring and outlined coral CTA match the selected direction. Form fields remain low-contrast until focus, then receive a coral border for clear affordance.
- Image quality and asset fidelity: the supplied `public/assets/home-founder-avatar.png` is rendered through `next/image`, cropped as a small circular portrait without a placeholder or generated substitute.
- Copy and content: all new labels, steps, portrait alt text, supporting line and mail subject are translated for UA, RU and EN. The generated `mailto:` subject and field labels now follow the active locale.

### Comparison history

- Initial implementation capture showed the form below the fold because CSS Grid placed it in an implicit second row.
- Fix: assigned `grid-row: 1` to the intro, portrait path and form; reduced the top offset of the two right-side regions. The revised desktop capture keeps all core inputs and CTA in the primary modal frame.
- Second comparison showed the selected concept’s key headline treatment was missing.
- Fix: split the title into localizable lead and accent fragments and styled the final word in coral italic. The final combined comparison confirms the editorial accent, portrait, conversation path and form are visible in one composition.
- Final comparison found that the reference’s arcs, thin route line and microcopy were still absent. A transparent dedicated linework asset was generated and placed behind the dialog UI; the lower signature and short footnote were added as localized DOM text. On screens below `620px` the decorative layer is hidden so the wide lower-left arc cannot cut through the form.

### Implementation checklist

- [x] Selected third visual direction recreated as a responsive code-based modal.
- [x] Provided founder photo added as a circular `next/image` portrait.
- [x] Large semicircle, upper curve, route line, lower signature and note added to desktop composition.
- [x] Real form behavior and keyboard Escape close preserved.
- [x] UA, RU and EN modal copy and generated mail content checked.
- [x] Desktop and mobile layouts checked; no page-level horizontal overflow.
- [x] Browser console checked for errors.
- [x] `git diff --check` and production build passed.

final result: passed

## About — handwritten hero accent reveal — 2026-09-24

### Source visual truth

- User-provided reference: `/Users/ustim/Downloads/Снимок экрана — 2026-09-24 в 16.31.21.png`.
- Motion reference: `https://www.pinterest.com/pin/14003448838659137/` (`Animate Your Handwritten Signature Or Text`).
- Captured Pinterest reference phase: `/private/tmp/pinterest-handwriting-reference-phase.png`, browser viewport `1696 × 957px`.
- Required treatment: the existing coral handwritten `Turning ideas into products` accent should begin immediately on page load and be written letter by letter over 6–7 seconds, with every letter completed before the next begins. The `T` top stroke precedes its vertical stroke; each `i` dot and `t` crossbar is completed before moving on.

### Implementation evidence

- Local route: `http://localhost:3000/about`.
- Existing source asset preserved: `public/assets/about/variant-4-hero-accent-turning-ideas.png`, `1343 × 1171px`, transparent RGBA.
- Browser-rendered implementation captures: `/private/tmp/about-handwriting-immediate-start.png`, `/private/tmp/about-handwriting-strict-progress-browser.png` and `/private/tmp/about-handwriting-strict-final-browser.png`, viewport `1696 × 957px`, DPR `1`.
- Deterministic path-order captures: `/private/tmp/handwriting-t-complete.png`, `/private/tmp/handwriting-u-start.png`, `/private/tmp/handwriting-first-i-body.png`, `/private/tmp/handwriting-first-i-dot.png`, `/private/tmp/handwriting-second-line-t-body.png`, `/private/tmp/handwriting-second-line-t-cross.png` and `/private/tmp/handwriting-final.png`.
- The original raster artwork remains the only visible source. A generated `672 × 586px` RGB reveal map stores a 16-bit writing timestamp for every visible source pixel; canvas reveals the exact source pixels along explicit per-stroke trajectories.
- Animation starts immediately on page load, writes for `6.96s`, retains completed ink, and ends on the exact original bitmap without a separate fade or replacement frame. The higher-precision map and deliberate pen-lift gaps prevent the next letter from appearing before the previous stroke is complete. Browser console returned no errors or warnings.
- `prefers-reduced-motion` displays the complete accent immediately.

### Findings

- P0/P1/P2 расхождений не обнаружено.
- Motion: the reference and implementation both leave persistent ink behind a continuously advancing pen path. `T → u`, `i` body → dot and `t` body → crossbar were checked in separate consecutive frames; no next-letter leakage remains.
- Spacing and layout: the hero accent keeps its existing position, aspect ratio and responsive width; no horizontal overflow was introduced.
- Fonts and typography: lettering is not recreated with a substitute font; the exact user-approved raster lettering is preserved.
- Colors and visual tokens: the original coral pixels and existing `mix-blend-mode: screen` treatment are unchanged.
- Image quality and asset fidelity: the source stays sharp at its rendered `207px` desktop width; the reveal map affects timing only and never replaces visible pixels.
- Copy and content: `Turning ideas into products` and its underline are unchanged.

### Comparison history

- Earlier implementation: an approximate SVG mask and then an 8-bit timing map could reveal broad fragments or slightly pre-feather pixels from the next letter.
- Fix: replaced visible SVG geometry with exact-source canvas rendering and upgraded the timing map to 16-bit precision with explicit letter/stroke boundaries.
- Post-fix evidence: `T` is fully complete before `u` starts, `i` dots and `t` crossbars appear only after their letter bodies, and the final capture matches the original artwork without a transition jump.

### Implementation checklist

- [x] Pinterest motion inspected at intermediate playback state.
- [x] Existing local animation inspected before replacement.
- [x] Approximate SVG mask removed.
- [x] Exact-source reveal map and canvas renderer implemented.
- [x] Immediate start, `6.96s` write duration and reduced-motion fallback implemented.
- [x] Strict per-letter order, `i` dots and `t` crossbars verified frame by frame.
- [x] Browser console checked with no errors or warnings.

final result: passed

## About CTA — pulse center alignment — 2026-09-24

### Implementation evidence

- The moving pulse now stops with its geometric center on the horizontal line: its endpoint is adjusted to the rendered pulse box and the wave’s center coordinate.
- The impact ring remains centered on the same axis, and the lower wave timing is unchanged.
- Desktop and mobile use the same corrected relative geometry through `--signal-distance`; no fixed viewport-specific offset was introduced.

### Findings

- P0/P1/P2 расхождений не обнаружено.
- The point no longer finishes below the horizontal line; the marker and impact ring meet the line at the same center axis.

final result: passed

## About CTA — darker border, larger label and touch flash — 2026-09-24

### Source visual truth

- Selected treatment remains the first visual variant: coral pill on graphite, a restrained light keyline, dark inner edge, right arrow and the existing lower signal animation.

### Implementation evidence

- Local route: `http://localhost:3000/about`.
- Fresh browser screenshot: `/private/tmp/about-cta-viewport-updated.png`.
- State: Ukrainian locale, dark theme, CTA visible in the contact section.
- Computed CTA size: `229.4 × 50px`; width remains content-driven and was not hard-coded.
- Computed label size: `13px`; internal right arrow size: `16px`.
- Animation evidence: the incoming arrow uses one parent animation for the coral-to-near-white-to-coral touch flash, while the existing head/tail movement keyframes remain unchanged. Browser sampling captured the near-white transition (`rgba(255, 253, 251, 0.95)`) and the return to coral.
- Primary interaction: CTA button opened the project inquiry form; Escape dismissed it.
- Runtime evidence: browser console returned no errors or warnings.

### Findings

- P0/P1/P2 расхождений не обнаружено.
- Typography: the CTA label is slightly larger without changing the button’s centered alignment or responsive width model.
- Spacing and layout: the button remains a compact centered pill; the larger icon adds only the natural content width required by the updated arrow.
- Colors and visual tokens: the outer keyline is slightly darker, and the incoming coral arrow flashes near-white exactly at the button touch before returning to coral.
- Motion: the arrow and tail remain a single visual object; the flash is layered onto the parent so the color transition stays synchronized with the existing travel cycle.

final result: passed

## About CTA — button border contact flash — 2026-09-24

### Implementation evidence

- The CTA border now has a dedicated `actionBorderFlash` animation synchronized to the same `6.8s` cycle as the incoming arrow.
- At the arrow contact phase the border transitions smoothly to `#fff`, stays bright for approximately one second, then returns smoothly to `rgb(232 213 207 / 0.82)`.
- Browser sampling captured the complete sequence: original warm border, intermediate white shades, `rgb(255, 255, 255)`, and the return to the original color.
- The arrow movement, tail erasure, lower signal, button fill, label and layout remain unchanged.
- CTA interaction still opens the project inquiry form and Escape dismisses it; browser console returned no errors or warnings.

final result: passed

## About — crisp hero lettering — 2026-09-23

### Source visual truth

- User-reported defect: `/Users/ustim/Downloads/Снимок экрана — 2026-09-23 в 22.32.31.png`, `598 × 522px`.
- The decorative hero phrase was visibly soft because a `158 × 154px` raster crop was enlarged in the page. The required outcome is a sharp handwritten phrase with the same coral tone, three-line copy and underline.

### Implementation evidence

- Replaced the active low-resolution source with `public/assets/about/variant-4-hero-accent-crisp.png`, a `1254 × 1254px` RGBA asset. The existing hero geometry and responsive CSS are unchanged.
- Desktop browser state: `/about`, UA locale, `1710 × 952px` CSS viewport; rendered capture `/private/tmp/about-hero-crisp-accent-desktop.png`, `1695 × 944px`. The accent renders at `230 × 230px`; no horizontal overflow.
- Mobile browser state: `/about`, UA locale, `390 × 844px` CSS viewport; rendered capture `/private/tmp/about-hero-crisp-accent-mobile.png`, `375 × 812px`. The accent renders at `88 × 88px`; no horizontal overflow.
- Full and focused comparison evidence: `/private/tmp/about-hero-accent-comparison.png`, `1110 × 572px`. It places the user’s blurry source and the rendered hero crop side by side at a normalized review size.

### Findings

- P0/P1/P2: none.
- Fonts and typography: the phrase remains handwritten and compact; its letter edges are clean at desktop and mobile display sizes rather than softened by source upscaling.
- Spacing and layout rhythm: the accent preserves the established upper-right placement and does not alter the hero title, portrait, header, dividers, rail or footer.
- Colors and visual tokens: the warm coral lettering remains on the existing graphite `--color-bg` background.
- Image quality and asset fidelity: the replacement is a high-resolution transparent raster asset, avoiding the prior undersized crop and its blur. The phrase, three-line composition and underline remain intact.
- Copy and content: `Good ideas build a kinder world` is retained verbatim.
- Runtime: desktop and mobile navigation completed without a visible client error state; the changed asset loaded completely in both captures.

### Implementation checklist

- [x] Replaced only the decorative hero asset; header, footer and layout CSS are unchanged.
- [x] Compared the supplied source and browser-rendered accent together in a focused composite.
- [x] Verified desktop and mobile rendering, completed image load and absent horizontal overflow.
- [x] Ran `npx tsc --noEmit`, `git diff --check`, CSS `!important` scan and `npm run build`.

final result: passed

## About — centered contact CTA — 2026-09-23

### Source visual truth

- User-provided target: `/Users/ustim/Downloads/Снимок экрана — 2026-09-23 в 23.10.52.png`.
- Required change: move the `Обговорити проєкт` button below the contact text, center it within the text area, and leave visible breathing room above it.

### Implementation evidence

- Desktop focused capture: `/private/tmp/about-contact-centered-focus.png`; the button is on its own row, centered within the text column, with a measured `34px` gap after the final paragraph.
- Desktop full capture: `/private/tmp/about-contact-centered-desktop.png`; no horizontal overflow.
- Mobile capture: `/private/tmp/about-contact-centered-mobile.png`; the button uses a centered responsive width capped at `320px`, with a `24px` top gap and no horizontal overflow.
- Latest spacing correction: the CTA was lowered by a further `40px`; the final top gaps are `74px` on desktop and `64px` on mobile.
- Follow-up spacing correction: the CTA was lowered by another `40px`; final top gaps are now `114px` on desktop and `104px` on mobile.
- Latest bottom-gap correction: the distance from the CTA bottom to the footer divider was reduced by `20px` via the contact section bottom padding (`34px → 14px` desktop, `26px → 6px` mobile); the CTA top position remains unchanged.
- Browser measurement after the correction: CTA-bottom to footer-divider gap is `98px` on desktop (previously `118px`), with `overflow: false`.

### Findings

- P0/P1/P2: none.
- Layout: the former two-column contact grid is now a single readable text flow followed by a centered CTA.
- Responsive behavior: desktop and mobile retain the same hierarchy; the mobile button stays centered in its content column without clipping.
- Interaction: the existing button action and focus/hover styles are unchanged.

### Implementation checklist

- [x] Moved the contact CTA below the text.
- [x] Centered the CTA and added the requested top spacing.
- [x] Checked desktop and mobile renders without horizontal overflow.
- [x] Ran `npx tsc --noEmit`, `git diff --check`, CSS `!important` scan and `npm run build`.

final result: passed

## About CTA — continuous Axis Pulse — 2026-09-24

### Source visual truth

- Selected generated direction: `/Users/ustim/.codex/generated_images/01a0ca93-3916-7333-b7bd-bade662bf1fc/exec-81690553-dd98-4396-9772-262646d62c92.png`, `2109 × 745px`.
- User correction: the signal animation must run automatically in a loop rather than start on hover.
- Intersection correction reference: `/Users/ustim/Downloads/Снимок экрана — 2026-09-24 в 00.17.29.png`, `1336 × 472px`; the impact circle must sit on the exact center of the horizontal line.
- Visibility defect reference: `/Users/ustim/Downloads/Снимок экрана — 2026-09-24 в 13.20.19.png`, `1336 × 472px` at DPR `2`; only the upper half of the centered circle is visible because the page/footer boundary covers the lower half.

### Implementation evidence

- Browser-rendered active-state capture: `/private/tmp/about-cta-axis-pulse-final.png`, normalized browser screenshot `1695 × 944px`; runtime viewport check `1710 × 952 CSS px`, DPR `2`.
- Focused source/implementation comparison: `/private/tmp/about-cta-axis-pulse-comparison.png`, two `800 × 450px` crops placed in one `1620 × 450px` image.
- Corrected maximum-width phase: `/private/tmp/about-cta-wave-fade-max.png`; both halves reach their full width while the outer tips dissolve into the page background.
- Corrected center-erasure phase: `/private/tmp/about-cta-wave-fade-center.png`; the gap opens at the button axis and expands symmetrically toward the soft outer tails.
- Centered-intersection capture: `/private/tmp/about-cta-circle-centered.png`, `1695 × 888px`; runtime viewport `1710 × 952 CSS px`, DPR `2`.
- Focused intersection comparison: `/private/tmp/about-cta-circle-centered-comparison.png`, `2692 × 472px`; the `1336 × 472px` source and an equally sized implementation crop are placed side by side. The comparison is scoped to the line/circle geometry because the source is a cropped interaction-state screenshot rather than a full matching viewport.
- Runtime evidence: the line animation reports `4.8s` and `infinite`; desktop signal distance is `98px`, the CTA remains `215.87 × 50px`, and horizontal overflow is absent.
- Intersection metrics: impact center, horizontal-line center and filament endpoint all resolve to `598.46875px`; `centerDelta: 0`, `lineEndDelta: 0`.
- Full-circle capture: `/private/tmp/about-cta-circle-fully-visible-final.png`, `1695 × 888px`; the ring extends across the boundary without clipping or footer overpainting.
- Normalized visibility comparison: `/private/tmp/about-cta-circle-full-visibility-comparison.png`, `1356 × 236px`; the DPR-2 source was normalized to `668 × 236px` and compared with an equally sized implementation crop in the same image.
- Visibility metrics: the active ring spans `563.48–577.46px` around the horizontal center at `570.47px`; page overflow computes to `clip visible`, page stacking level is `1`, and horizontal viewport overflow remains absent.
- Interaction evidence: the lower CTA opens the existing project dialog; the automatic animation does not block pointer interaction.

### Findings

- P0/P1/P2: none.
- Typography and copy: the existing localized CTA label, SF Pro stack, weight, spacing and Lucide arrow remain unchanged.
- Spacing and layout rhythm: the button keeps its approved position and size; decorative layers are absolutely positioned and do not alter section height. The signal reaches the footer divider while preserving the previously approved `98px` resting gap.
- Intersection geometry: the impact circle, vertical filament and one-pixel horizontal wave now share one exact center coordinate; the previous `0.5px` CSS offset has been removed.
- Circle visibility: both halves of the impact ring remain visible across the page/footer boundary; the change affects clipping and stacking only, not the ring position or animation timing.
- Colors and tokens: the effect uses the existing coral accent and graphite background. Glow is limited to the moving pulse, impact ring and temporary divider wave.
- Image quality and asset fidelity: the selected visual is an interaction reference rather than a new raster asset; the implementation uses crisp browser-rendered linework at the existing page scale.
- Motion: every `4.8s` cycle lifts the CTA by `2px`, sends a pulse down the filament, reveals an impact ring and spreads two mirrored horizontal halves. Each half has a transparent outer gradient; after the maximum span, mirrored `clip-path` masks erase the wave from the center toward the outer edges. The cycle then pauses. `prefers-reduced-motion` removes all decorative animation.
- Responsive behavior: mobile uses the same sequence with a `62px` signal distance and the existing button width cap; no additional page width is introduced.

### Comparison history

- Initial browser pass: the footer boundary clipped the lower half of the impact ring and hid the horizontal wave.
- Fix: moved the ring fully inside the About surface, ended the filament at its center and positioned the wave `1px` above the boundary.
- Post-fix evidence: `/private/tmp/about-cta-axis-pulse-final.png` shows the full ring and visible coral wave touching the divider without changing content flow.
- User correction: the wave looked too solid; its outer ends needed to dissolve continuously, and the completed line needed to disappear progressively from the center outward.
- Final fix: replaced the single solid wave with independently animated left/right pseudo-elements, symmetric edge gradients and mirrored center-out masks. Runtime sampling confirmed matching scale, opacity and clipping on both sides.
- Later user correction: the impact circle appeared above the horizontal-line center. Initial post-adjustment measurement still showed `centerDelta: -0.5px`, which equals one physical pixel at DPR `2`.
- Intersection fix: moved the ring anchor, filament endpoint and pulse destination by the remaining `0.5px`. Post-fix measurement reports `centerDelta: 0` and `lineEndDelta: 0`; `/private/tmp/about-cta-circle-centered-comparison.png` is the visual evidence.
- Latest user correction: after centering, the lower half of the ring was hidden at the boundary. Removing vertical clipping alone was insufficient because the later footer layer still painted over the overflow.
- Visibility fix: kept horizontal clipping, allowed vertical overflow and raised the About page stacking layer above the footer background. `/private/tmp/about-cta-circle-full-visibility-comparison.png` shows the formerly hidden lower half fully rendered while the center remains fixed on the line.

### Implementation checklist

- [x] Automatic infinite cycle implemented without hover dependency.
- [x] Button action preserved and dialog opening verified.
- [x] Selected source and rendered implementation inspected in one focused comparison.
- [x] Horizontal overflow absent; reduced-motion fallback added.
- [x] Outer tips fade into the background and the completed wave erases from the center outward.
- [x] Impact circle, vertical filament and horizontal line share the same measured center coordinate.
- [x] Impact circle remains fully visible across the page/footer boundary without horizontal overflow.
- [x] `npx tsc --noEmit`, `git diff --check`, no-`!important` scan and `npm run build` passed.

final result: passed

## About — fading horizontal divider ends — 2026-09-23

### Source visual truth

- User-provided references: `/Users/ustim/Downloads/Снимок экрана — 2026-09-23 в 23.06.00.png` and `/Users/ustim/Downloads/Снимок экрана — 2026-09-23 в 23.07.08.png`.
- Required change: horizontal section rules should retain their center but gradually dissolve at both ends, while the central vertical axis and marker circles remain sharp.

### Implementation evidence

- The solid `border-top` on `.readingSection` was replaced with a one-pixel `::before` gradient: transparent at `0%` and `100%`, softly emerging by `6%`/`94%`, and fully visible through the central `15%`–`85%` region.
- Desktop capture: `/private/tmp/about-faded-section-lines-desktop.png`, `1710 × 952px` CSS viewport; computed pseudo-element height `1px`, no horizontal overflow.
- Mobile capture: `/private/tmp/about-faded-section-lines-mobile.png`, `390 × 844px` CSS viewport; the same fade rule is preserved responsively, no horizontal overflow, viewport reset after capture.

### Findings

- P0/P1/P2: none.
- The chapter dividers now match the reference's softer edge treatment without weakening the central line or moving the marker circles.

### Implementation checklist

- [x] Applied a fading gradient to every horizontal chapter divider.
- [x] Preserved the vertical rail and circle markers.
- [x] Checked desktop and mobile rendering without horizontal overflow.
- [x] Ran `npx tsc --noEmit`, `git diff --check`, CSS `!important` scan and `npm run build`.

final result: passed

## About — intro copy moved beside portrait — 2026-09-23

### Source visual truth

- User-provided layout reference: `/Users/ustim/Downloads/Снимок экрана — 2026-09-23 в 22.48.05.png`.
- Required change: move the complete `Про мене` introduction block — heading plus all four supplied paragraphs — to the right of the hero portrait, keep it readable, remove the duplicated intro section below, and start the project numbering at `01`.

### Implementation evidence

- Desktop capture: `/private/tmp/about-intro-in-hero-desktop.png`, `1710 × 952px` CSS viewport. The portrait occupies `400 × 400px` at the left; the intro copy sits beside it at `760px` maximum width. The first lower section is `01 / ПРОЄКТИ`.
- Mobile capture: `/private/tmp/about-intro-in-hero-mobile.png`, `390 × 844px` CSS viewport. The portrait and intro copy stack into one readable column; the project section remains `01 / ПРОЄКТИ`.
- Runtime geometry: desktop intro bounds `x: 614.5, y: 271.6, w: 760, h: 255.3`; first chapter begins at `y: 610`. Mobile intro bounds `x: 16, y: 432.8, w: 343, h: 444.8`; first chapter begins at `y: 915.7`. Both states have no horizontal overflow.

### Findings

- P0/P1/P2: none.
- Typography and copy: the heading and all supplied localized paragraphs remain intact and readable; the text is no longer repeated as a separate introductory chapter.
- Spacing and layout: the portrait remains left-aligned, the copy sits in the right hero column on desktop, and the existing accent, header, rails and dividers remain in place.
- Navigation structure: the lower numbered sequence now begins with `01 ПРОЄКТИ`, followed by `02 ПРОЦЕС` through `10 КОНТАКТ`.

### Implementation checklist

- [x] Moved the complete intro block into the hero beside the portrait.
- [x] Removed the duplicate intro `ReadingSection`.
- [x] Renumbered the remaining sections so projects start at `01`.
- [x] Checked desktop and mobile captures without horizontal overflow.
- [x] Ran `npx tsc --noEmit`, `git diff --check`, CSS `!important` scan and `npm run build`.

final result: passed

## About — diagonal “Turning ideas into products” hero accent — 2026-09-23

### Source visual truth

- User-provided composition reference: `/Users/ustim/Downloads/Снимок экрана — 2026-09-23 в 22.32.31.png`.
- Required change: replace the prior phrase with `Turning ideas into products`, retain the coral handwritten lettering, and make the three-line grouping rise diagonally rather than sit horizontally.

### Implementation evidence

- Active asset: `public/assets/about/variant-4-hero-accent-turning-ideas.png`, `1343 × 1171px`, transparent RGBA.
- Desktop capture: `/private/tmp/about-hero-turning-ideas-desktop.png`; `1710 × 952px` CSS viewport. The asset has fully loaded and displays at `230 × 200.5px` in the existing upper-right hero slot. No horizontal overflow.
- Mobile capture: `/private/tmp/about-hero-turning-ideas-mobile.png`; `390 × 844px` CSS viewport. The asset has fully loaded and displays at `88 × 76.7px`. No horizontal overflow; the viewport override was reset after the capture.
- Latest placement correction: the accent is 10% smaller and positioned `30px` higher and `15px` farther right. Updated desktop capture: `/private/tmp/about-hero-turning-ideas-compact-desktop.png`, rendered `207 × 180.5px` at `left: 1438.5px`, `top: 86px`. Updated mobile capture: `/private/tmp/about-hero-turning-ideas-compact-mobile.png`, rendered `79 × 68.9px` at `left: 295px`, `top: 126px`. Neither state has horizontal overflow.

### Findings

- P0/P1/P2: none.
- Typography and copy: the exact requested phrase is presented in three lines — `Turning`, `ideas into`, `products` — with the requested hand-drawn coral character.
- Spacing and layout: the letterforms themselves have a visible rising diagonal, while the existing upper-right slot, portrait, title, menu, rail, dividers and footer remain unchanged.
- Image quality: source is high-resolution with alpha and is sharp at both rendered sizes.

### Implementation checklist

- [x] Replaced only the decorative phrase asset and preserved the earlier version on disk.
- [x] Desktop and mobile visual checks completed; no overflow detected.
- [x] Ran `npx tsc --noEmit`, `git diff --check`, CSS `!important` scan and `npm run build`.

final result: passed

## About — smaller portrait and sharper accent placement — 2026-09-23

### Source visual truth

- User-provided target: `/Users/ustim/Downloads/Снимок экрана — 2026-09-23 в 22.27.11.png`.
- Target changes: reduce the left portrait by 15%; make the right handwritten accent smaller and move it to the upper-right hero area so its raster enlargement is less noticeable.

### Implementation evidence

- Desktop portrait frame: `400 × 400px` (from `470 × 470px`).
- Desktop accent: `230px` wide, top-aligned at `24px`, right-aligned at `0`; responsive sizes are reduced consistently at tablet/mobile breakpoints.
- Desktop capture: `/private/tmp/about-hero-photo-15-smaller-accent-top-right.png`.
- Mobile capture: `/private/tmp/about-hero-photo-accent-mobile.png`; document width remains `375 = 375` at a requested `390px` viewport.

### Findings

- P0/P1/P2 расхождений не обнаружено.
- The portrait keeps the existing circle and grid position; the accent is smaller, higher and less stretched while header, rail, dividers and footer remain unchanged.

### Verification

- [x] Desktop hero geometry checked.
- [x] Mobile hero geometry and overflow checked.
- [x] `npx tsc --noEmit` and `git diff --check` passed.

final result: passed

## About — match homepage background — 2026-09-23

### Source visual truth

- Target: the About page background must use the same surface color as the homepage.

### Implementation evidence

- `components/AboutLongform/AboutLongform.module.css` now uses `background: var(--color-bg)` for `.page` and the same token for circle masking layers.
- Browser comparison: homepage and `/about` both compute to `rgb(23, 22, 21)` (`#171615`). About document width remains `1695px` without horizontal overflow.

### Findings

- P0/P1/P2 расхождений не обнаружено.
- The About background now matches the homepage exactly; portrait, rail, circles, header and footer remain unchanged.

### Verification

- [x] Homepage and About computed background colors match.
- [x] Circle masks use the same background token.
- [x] `npx tsc --noEmit` and `git diff --check` passed.

final result: passed

## About — remove outer portrait circle — 2026-09-23

### Source visual truth

- User-provided reference: `/Users/ustim/Downloads/Снимок экрана — 2026-09-23 в 22.19.29.png`.
- Target: remove only the extra outer CSS circle and keep the circle drawn in the supplied portrait asset.

### Implementation evidence

- `.portraitWrap` now uses `border: 0`; its circular clipping, `470 × 470px` geometry and `object-fit: cover` remain unchanged.
- Fresh capture: `/private/tmp/about-new-portrait-no-external-circle.png`.
- Browser computed state confirms `border: 0px none`, `border-radius: 50%`, and document width `1695px` without overflow.

### Findings

- P0/P1/P2 расхождений не обнаружено.
- The duplicate outer ring is removed; the supplied portrait's own circle remains visible and the rest of the hero layout is unchanged.

### Verification

- [x] Outer CSS circle removed.
- [x] Inner portrait circle preserved.
- [x] Desktop geometry and document width checked.
- [x] `npx tsc --noEmit` and `git diff --check` passed.

final result: passed

## About — portrait replacement — 2026-09-23

### Source visual truth

- User-provided portrait: `/Users/ustim/Desktop/НЕ УДАЛЯТЬ/Фото/portrait-ustim-black-and-white.png`, 1254 × 1254 px.
- Target: use this portrait inside the existing circular hero frame without changing the page grid, rail, chapter dividers or header/footer.

### Implementation evidence

- The provided image now replaces `public/assets/founder-avatar.png`, preserving the existing component URL and `next/image` pipeline.
- Rendered hero frame remains circular at `470 × 470px`, with `object-fit: cover`, no horizontal overflow, and the existing surrounding geometry unchanged.
- Fresh capture: `/private/tmp/about-new-portrait-top.png`.

### Findings

- P0/P1/P2 расхождений не обнаружено.
- The supplied black-and-white portrait is centered and fully contained by the existing circular frame; no unrelated layout changes were introduced.

### Verification

- [x] New portrait loaded in the browser.
- [x] Circular frame and crop verified visually.
- [x] Desktop document width remains equal to the viewport content width.
- [x] `npx tsc --noEmit` and `git diff --check` passed.

final result: passed

## About — final 2 px right adjustment — 2026-09-23

### Implementation evidence

- The chapter circles moved 2 px right from the previous pass: desktop `right: 79px`, tablet `right: 49px`, mobile `right: 16px`.
- Vertical alignment remains unchanged: desktop `top: -6px`, mobile `top: -4px`.
- Fresh capture: `/private/tmp/about-circles-final-right-2px.png`.

### Verification

- P0/P1/P2 расхождений не обнаружено.
- `npx tsc --noEmit`, `git diff --check` and the no-`!important` scan passed.

final result: passed

## About — final 3 px left correction — 2026-09-23

### Source visual truth

- User-provided reference: `/Users/ustim/Downloads/Снимок экрана — 2026-09-23 в 22.07.35.png`.
- Target: move the chapter circles exactly 3 px left from the previous pass while keeping their vertical intersection with the horizontal dividers unchanged.

### Implementation evidence

- Final values in `components/AboutLongform/AboutLongform.module.css`: desktop `right: 81px`, tablet `right: 51px`, mobile `right: 18px`; vertical positions remain desktop `top: -6px` and mobile `top: -4px`.
- Fresh capture: `/private/tmp/about-circles-final-left-3px.png`.
- The fresh page retains document width `1695px` at the desktop viewport and no horizontal overflow.

### Findings

- P0/P1/P2 расхождений не обнаружено.
- The circles are returned 3 px left from the prior pass; divider alignment and all other page geometry remain unchanged.

final result: passed

## About — chapter-node intersection alignment — 2026-09-23

### Source visual truth

- User-provided reference: `/Users/ustim/Downloads/Снимок экрана — 2026-09-23 в 21.54.31.png`.
- Target: every chapter circle must sit exactly at the crossing of its horizontal divider and the continuous vertical rail.

### Implementation evidence

- Updated selector: `.chapterMarker::after` in `components/AboutLongform/AboutLongform.module.css`.
- Desktop rendered pixels now show the circle outline centered on the vertical rail and the horizontal divider at the first and second chapter intersections.
- Mobile rendered pixels show the same alignment at the requested viewport `390 × 844`; document width remains `375 = 375`.
- Visual captures: `/private/tmp/about-circles-desktop-fixed.png` and `/private/tmp/about-circles-mobile-fixed.png`.

### Findings

- P0/P1/P2 расхождений не обнаружено.
- Desktop and mobile circles now cover the exact intersection point while preserving the dark masking background, outline and continuous rail.
- No header, footer, chapter content or CTA behavior was changed.

### Implementation checklist

- [x] Desktop circle centers aligned to horizontal dividers.
- [x] Desktop circle centers aligned to the vertical rail.
- [x] Mobile alignment checked at 390 px.
- [x] No horizontal overflow introduced.
- [x] `npx tsc --noEmit`, `git diff --check` and `npm run build` passed.

final result: passed

## About — option 4 final visual match — 2026-09-23

### Source visual truth

- Selected reference: `/Users/ustim/.codex/generated_images/01a0c881-bd07-7500-9a7e-2fc036979634/exec-2f80ae4f-700b-4b15-8b1f-330337003c36.png`, 797 × 1973 px.
- The reference defines the inner page only: portrait-led hero, editorial title, full-width chapter dividers, one uninterrupted vertical rail with dots, eleven coral-numbered chapters, a 2 × 2 certificate grid, and a coral final CTA.
- Explicit constraints: the site's existing header and footer remain untouched; the real portrait is used instead of the reference portrait; all actual UA/RU/EN content remains rather than being replaced by placeholder lines.

### Implementation evidence

- Route: `http://localhost:3000/about`.
- Final desktop capture: `/private/tmp/about-v4-final-en-top.png`, 1695 × 888 px; CSS viewport 1710 × 896 px.
- Final full-page capture: `/private/tmp/about-v4-final-en-full.png`, 1695 × 5658 px.
- Final focused certificate capture: `/private/tmp/about-v4-final-en-certificates-viewport.png`, 1695 × 888 px.
- Final mobile capture: `/private/tmp/about-v4-final-mobile-ua-top.png`, 375 × 812 px; requested responsive viewport 390 × 844 px.
- Same-input top comparison: `/private/tmp/about-v4-final-top-comparison.png`, 3390 × 934 px. Its two 1695 px panels normalize the reference to the implementation width and align the hero, divider, rail, first dot and first chapter.
- Same-input focused comparison: `/private/tmp/about-v4-final-certificates-comparison.png`, 3390 × 875 px. It compares the source and implementation certificate areas at equal panel widths.
- Runtime evidence: desktop document width equals content width (`1695 = 1695`); mobile width equals content width (`375 = 375`). The page has 11 chapter sections, one visible rail, four certificate frames and no console errors or warnings.
- Interaction evidence: the final chapter's `Discuss a project` button opens the existing `Let’s discuss your idea` dialog and `Close form` closes it.

### Findings

- P0/P1/P2 расхождений не осталось.
- Typography: the hero uses the reference-scale 122 px display title with corrected near-neutral tracking (`-0.01em`), matching the source width and baseline instead of looking compressed.
- Spacing and layout rhythm: the 470 px portrait, hero divider, 300 px chapter column, continuous rail at 214 px and chapter dots follow the reference geometry. Every chapter begins with its own full-width horizontal rule.
- Colors and visual tokens: graphite background, off-white type, fine gray rules and restrained coral numbers/accent match the selected variant; no unrelated visual system was introduced.
- Image fidelity: the only portrait difference is the user-required real photo. The hero script accent and certificate pictograms are exact local crops from the selected reference and are rendered through `next/image`.
- Certificate composition: the grid is 2 × 2 with reference-matched width, 3.3:1 frames, gaps and visible neutral pictograms. Actual certificate titles and descriptions intentionally make this chapter taller than the reference's placeholder lines.
- Copy and accessibility: all supplied UA/RU/EN content is retained. The portrait and decorative assets have empty alt text, chapter headings retain semantic hierarchy, and the CTA remains a keyboard-focusable button with a visible focus state.

### Comparison history

- P1 fixed: the display title had over-tight tracking; it was widened to align with the source width while preserving the 122 px scale.
- P1 fixed: the certificate grid was initially too narrow and its pictograms visually under-scaled. The content width, column gap and source-cropped pictogram size were corrected; the frame ratio was returned to the reference 3.3:1 proportion.
- Intentional, approved differences: global header/footer stay as they are; real paragraph content replaces the reference's gray placeholder bars, so chapter heights vary with actual copy.

### Implementation checklist

- [x] Source and implementation compared in a normalized top composite and a focused certificate composite.
- [x] Hero portrait/title/accent, horizontal dividers, continuous rail and all 11 chapter markers checked.
- [x] Certificate grid, source-derived pictograms and final CTA checked.
- [x] Header and footer preserved without modification.
- [x] Desktop and 390 px mobile layouts checked without horizontal overflow.
- [x] CTA dialog open/close flow and browser console checked.
- [x] `npx tsc --noEmit`, `git diff --check`, no-`!important` scan and `npm run build` passed.

final result: passed

## About — fourth variant fidelity pass — 2026-09-22

### Source visual truth

- Selected visual reference: `/Users/ustim/.codex/generated_images/01a0c881-bd07-7500-9a7e-2fc036979634/exec-2f80ae4f-700b-4b15-8b1f-330337003c36.png`, 797 × 1973 px.
- Target composition: small dark header, circular portrait at the left, a dominant display heading to its right, a divider, then eleven numbered editorial chapters on one continuous vertical rail. Chapter 05 has two columns, chapter 09 has a 2 × 2 certificate grid, and chapter 11 ends with a coral action.
- Content constraint remains in force: the supplied complete text is rendered in Russian, Ukrainian and English. The four certificate frames stay empty by the user's instruction.

### Implementation evidence

- Local route: `http://localhost:3001/about`.
- Final desktop screenshot: `/private/tmp/about-page-v4-final-desktop.jpg`, 1695 × 888 px. Browser CSS viewport: 1710 × 896 px, DPR 1.
- Final mobile screenshot: `/private/tmp/about-page-v4-final-mobile-full.jpg`, 375 × 10906 px. Requested viewport: 390 × 844 px; rendered CSS width: 375 px, DPR 1.
- Full-view comparison: `/private/tmp/about-page-v4-top-comparison.jpg`, 1594 × 414 px. The source top crop and the desktop capture were each normalized to 797 × 414 px and placed side by side.
- Focused certificate comparison: `/private/tmp/about-page-v4-certificates-comparison.jpg`, 1594 × 417 px. The source certificate crop and the rendered certificate state were normalized to equal 797 × 417 px panels.
- State: dark theme, Russian locale for capture; the global language switcher and the existing inquiry control were retained as required site functionality.
- Runtime checks: UA / RU / EN render respectively `Про мене`, `Обо мне`, `About me`; each version has 11 chapter markers and 4 empty certificate frames. The inquiry button opens and closes its dialog. Desktop and mobile have no horizontal overflow; the fresh browser console has 0 errors.

### Findings

- P0/P1/P2 расхождений не осталось.
- Fonts and typography: the hero title now uses 122 px, weight 600 and compact tracking, matching the strong display hierarchy of the fourth variant. Section headings scale independently from the restrained 16 px reading text, so the complete supplied copy stays readable.
- Spacing and layout rhythm: the portrait, heading baseline, divider, 300 px chapter column, rail and dots follow the source geometry. The 11 sections use the same left-side number / label / dot sequence, rather than a generic article layout.
- Colors and visual tokens: the implementation retains the source's graphite field, off-white typography, fine gray dividers and restrained coral chapter numbers; no new decorative palette or surface style was introduced.
- Image quality and asset fidelity: the real portrait is preserved through `next/image` in the circular crop. The certificate region intentionally uses only empty, thinly outlined frames; there are no generated or fictional credentials.
- Copy and content: all source sections remain available in all three locales. The small chapter labels are structural navigation markers and do not replace or shorten supplied content.
- Interaction and accessibility: language controls remain usable, the final CTA is a semantic button that opens the existing dialog, and mobile reflows to a single certificate column without clipping. Screenshot review cannot on its own certify keyboard navigation or contrast ratios under every state.

### Comparison history

- Earlier pass: the page had the right dark editorial language but still read as a conventional long article; the hero display title was too light and too small compared with the selected fourth option.
- P1 fix: rebuilt the page as an eleven-chapter rail and increased the hero display title to the reference's bold, dominant scale (`122px`, weight `600`). The certificate block was kept as an empty 2 × 2 frame grid by explicit user decision.
- Post-fix evidence: `/private/tmp/about-page-v4-top-comparison.jpg` shows aligned portrait, divider, title and chapter start; `/private/tmp/about-page-v4-certificates-comparison.jpg` confirms the corresponding certificate composition. No actionable P0/P1/P2 mismatch remains.

### Implementation checklist

- [x] Source and rendered page opened and compared in shared full-view and focused-region images.
- [x] Fourth-variant portrait / display-heading / vertical-rail composition implemented.
- [x] Eleven numbered chapters, technical two-column section and 2 × 2 empty certificate frames implemented.
- [x] Full RU source text and complete UA / EN versions retained.
- [x] UA, RU and EN versions checked in the browser.
- [x] Desktop and 390 px mobile reflow checked without horizontal overflow.
- [x] Inquiry dialog and browser console checked.
- [x] `npm run build`, `npx tsc --noEmit`, `git diff --check` and the no-`!important` check passed.

final result: passed

## About — editorial long-form page — 2026-09-22

### Source visual truth

- Selected visual reference: `/Users/ustim/.codex/generated_images/01a0c881-bd07-7500-9a7e-2fc036979634/exec-2f80ae4f-700b-4b15-8b1f-330337003c36.png`, 797 × 1973 px.
- The source defines an editorial dark long-form page: a portrait-led opening, a fine vertical reading line, large lightweight chapter headings, muted readable body copy, restrained coral accents, and a four-cell certificate area.
- Content constraint: the supplied source text has priority over generated visual copy. Decorative chapter numbers and invented headings in the reference were intentionally not reproduced.

### Implementation evidence

- Local route: `http://localhost:3001/about`.
- Desktop implementation screenshot: `/private/tmp/about-page-desktop.png`, 1695 × 888 px, default desktop CSS viewport and browser density 1.
- Combined source/implementation comparison: `/private/tmp/about-page-design-comparison.png`, 1680 × 472 px. Both images were normalized to the same top-of-page 1.78:1 content crop for composition comparison.
- State: Russian locale, dark theme, default header state, no hover state.
- Responsive verification: 390 × 844 CSS viewport override; rendered article width 343 px, one certificate column, and no horizontal overflow. The viewport override was reset after testing.
- Runtime evidence: UA, RU, and EN each render the localized page title, eight primary sections, four empty certificate frames, and seven process rows. The final contact button opens and closes the existing inquiry dialog; console errors list is empty.

### Findings

- P0/P1/P2 расхождений не обнаружено.
- Typography: the implementation preserves the selected reference's oversized lightweight display heading, small neutral navigation, and muted long-form reading copy. The existing SF Pro system stack is used consistently, with comfortable 17 px desktop body text and a 16 px mobile fallback.
- Spacing and layout: the portrait, main reading column, persistent fine rail, chapter dividers, and long section rhythm follow the source's editorial structure. The source's fake chapter numbers were omitted to keep the user-provided text as the only page content.
- Colors and tokens: graphite surfaces, off-white text, low-contrast dividers, and restrained coral process markers map to the AU studio palette without introducing gradients or unrelated visual language.
- Image quality and asset fidelity: the supplied founder portrait is displayed through `next/image` with a circular crop and grayscale treatment. The certificate region intentionally contains four empty framed slots; no generated, fictional, or placeholder certificate images are shown.
- Copy and content: the Russian source is present in full as structured content; Ukrainian and English versions retain the same complete section order, list counts, education details, certificate titles, and final invitation.
- Interaction and accessibility: the inquiry action is a semantic button with visible keyboard focus; certificate hover lift is disabled under `prefers-reduced-motion`; section headings, ordered process steps, list semantics, and a decorative empty-alt portrait are present.

### Comparison history

- Initial implementation: replaced the short generic About page with a content-driven long-form editorial page, including the selected visual structure and all supplied source sections.
- Certificate direction: temporary generated certificate previews were removed before implementation at the user's request. The final design keeps four empty CSS-framed slots for the future real certificate screenshots.
- Post-implementation verification: desktop comparison, UA/RU/EN switching, mobile layout, process/certificate counts, dialog open/close behavior, and console state were checked. No actionable P0/P1/P2 findings remain.

### Implementation checklist

- [x] Selected reference opened and combined with the desktop implementation screenshot for comparison.
- [x] All supplied Russian source sections rendered without shortening or replacement copy.
- [x] Full faithful UA and EN versions added with identical content structure.
- [x] Seven work stages, two education entries, four certificates, and final invitation retained.
- [x] Four empty certificate frames are ready for the user's real screenshots.
- [x] Desktop and 390 px mobile layouts checked; no horizontal overflow.
- [x] Locale switcher and inquiry dialog checked.
- [x] Console errors checked and absent.
- [x] `npm run build`, `npx tsc --noEmit`, and `git diff --check` passed.

final result: passed

## Portfolio hero — reduced gap before carousel — 2026-09-22

### Source visual truth

- Reference screenshot: `/Users/ustim/Downloads/Снимок экрана — 2026-09-22 в 14.32.12.png`.
- Target: reduce the distance between the portfolio hero description and the first visible carousel card by approximately half.

### Implementation evidence

- Local route: `http://localhost:3001/portfolio`.
- The change is scoped to `.portfolioHero.compact`; other compact marketing heroes keep their existing height and spacing.
- Runtime measurements at the desktop viewport: description-to-card gap reduced from approximately `197px` to `117px`; document width remains equal to the viewport.

### Findings

- P0/P1/P2 расхождений не обнаружено.
- The lower carousel now starts noticeably closer to the descriptive copy while preserving the hero typography and the card's own internal padding.
- Responsive override keeps the same compact relationship on mobile without introducing horizontal overflow.

### Implementation checklist

- [x] Desktop gap reduced on the portfolio route.
- [x] Other compact hero pages remain scoped out.
- [x] Mobile-specific height override added.
- [x] No horizontal overflow in the browser capture.
- [x] No runtime errors; existing Next Image quality notices are unrelated to this spacing change.
- [x] `npx tsc --noEmit`, `git diff --check`, and `npm run build` passed.

final result: passed

## Нижний CTA «Обговорити проєкт» — recessed dial — 2026-09-22

### Source visual truth

- Selected visual direction: third generated CTA concept from the approved ideation set — graphite capsule with an integrated recessed circular dial and coral arrow.
- Target location: lower CTA on the right side of the technologies row in `CapabilitiesEssay`; the header CTA is intentionally excluded.

### Implementation evidence

- Local route: `http://localhost:3001/#contacts`.
- Header and lower CTA were inspected together after the correction: the header retains the previous trace/signal interaction, while the lower CTA contains the new `ctaDial` module.
- Runtime evidence: lower dial rotates on hover/focus, the coral inner arc remains visible, and the document has no horizontal overflow.

### Findings

- P0/P1/P2 расхождений не обнаружено.
- The lower button keeps the existing dark graphite palette and localized copy, but gains a more distinctive mechanical detail without becoming visually louder than the technologies row.
- The circular module is integrated into the button body rather than protruding as a separate badge; its two rings, inset shading, coral arc, and arrow create the selected industrial control feel.
- Follow-up visual correction first enlarged the lower CTA to match the selected reference, then applied two compact passes: the final capsule is `220×48px` with a `40×40px` dial, positioned close to the right edge. The glossy graphite surface, layered metallic shading, and brighter coral arrow remain intact.
- The motion is intentionally restrained: the button lifts by `1px`, the dial rotates `18deg`, and the arrow follows with a small diagonal shift.
- The upper header CTA was restored to the previously approved animation and has no recessed dial markup.

### Implementation checklist

- [x] Selected third visual direction implemented in the lower CTA only.
- [x] Header CTA restored to its previous visual and interaction.
- [x] Desktop placement checked beside the technologies list.
- [x] Hover state and dial rotation checked in Chrome.
- [x] Mobile stacking remains covered by the existing responsive footer layout.
- [x] No browser console errors or warnings.
- [x] `npx tsc --noEmit`, `git diff --check`, and `npm run build` passed.

final result: passed

## Header CTA animation — 2026-09-22

### Source visual truth

- Idle state reference: `/Users/ustim/.codex/generated_images/01a0c881-bd07-7500-9a7e-2fc036979634/exec-50418d62-a175-4a7e-9821-d41788dceff1.png`, 2153 × 730 px.
- Hover state reference: `/Users/ustim/.codex/generated_images/01a0c881-bd07-7500-9a7e-2fc036979634/exec-054ae9ef-3aed-4fb9-8d48-d417a3f92b2c.png`, 2153 × 730 px.
- Target: graphite rounded CTA with a calm coral marker moving along the center of its outline in the idle state; hover hides both that marker and the arrow, replacing them with one pulsing coral point.
- Updated visual references: `/Users/ustim/Downloads/Снимок экрана — 2026-09-22 в 13.07.46.png` for the calmer centered idle trace, and `/Users/ustim/Downloads/Снимок экрана — 2026-09-22 в 13.08.02.png` for the hover state where the arrow is replaced by one pulsing coral point.
- Visibility reference: `/Users/ustim/Downloads/Снимок экрана — 2026-09-22 в 13.16.30.png`, which shows the marker being clipped at the CTA edge and therefore defines the correction target.

### Implementation evidence

- Local route: `http://localhost:3001/`.
- Browser-rendered idle capture: `/private/tmp/person-site-cta-idle.png`, 1695 × 944 px, CSS viewport 1695 × 944, DPR 1.
- Browser-rendered hover capture: `/private/tmp/person-site-cta-hover.png`, 1695 × 944 px, CSS viewport 1695 × 944, DPR 1.
- Updated idle capture: `/private/tmp/person-site-cta-idle-v2.png`, 1695 × 944 px, CSS viewport 1695 × 944, DPR 1.
- Updated hover capture: `/private/tmp/person-site-cta-hover-v2.png`, 1695 × 944 px, CSS viewport 1695 × 944, DPR 1.
- Final idle capture: `/private/tmp/person-site-cta-idle-v3.png`, 1695 × 944 px, CSS viewport 1695 × 944, DPR 1.
- Focused target: header CTA bounds `183.94 × 38` CSS px.
- State: dark theme, Russian locale; idle and hover states checked separately.
- Runtime evidence: the idle trace used the generated CSS animation and its `offset-distance` progressed from `45.8299%` to `67.0413%` over 0.9 seconds. On hover both rings used `ctaSignalPulse`, the signal opacity reached `1`, and the existing CTA opened its dialog. Escape closed the dialog. Chrome console returned no errors.

### Findings

- No P0/P1/P2 implementation issue was found in the separately inspected browser states.
- Typography: the existing system font, weight and localized label remain intact; the new Lucide arrow is decorative and hidden from assistive technology.
- Spacing and layout: the button remains in the header without overflow at the captured desktop viewport; only desktop CTA receives hover-specific behavior.
- Colors and tokens: implementation uses existing graphite, warm-white and `--color-accent` coral tokens.
- Image and asset fidelity: no raster asset is required by this code-native interaction; the selected references define motion and styling rather than a standalone image asset.
- Copy: the existing localized `nav.discussProject` string is unchanged.

### Comparison history

- Initial implementation: added an orbiting outline marker, hover signal rings and an arrow motion to the existing CTA; added `prefers-reduced-motion` fallbacks.
- Browser verification: idle state, hover state, motion progression, modal action and console errors were checked. The same visual treatment is supplied for keyboard focus in CSS.
- Formal combined comparison: blocked. The browser security policy prevented opening the temporary side-by-side reference/implementation comparison input. No workaround was attempted.
- Revision after user review: moved the trace path from `inset(3px)` to `inset(1px)` to align the marker with the center of the double border, changed its duration from `4.4s` to `8.8s`, removed expanding rings, and made hover replace both the trace and arrow with a single pulsing coral point. The revised idle and hover states were recaptured in Chrome; the console remained clean and `npm run build` passed.
- Visibility revision: set the CTA overflow to `visible` and increased the trace diameter from `4px` to `5px`. Chrome confirmed continuous offset progress from `36.7417%` to `48.2939%` over one second, the fully visible marker was captured, the console remained clean, and `npm run build` passed.

### Implementation checklist

- [x] Selected idle and hover visual directions implemented.
- [x] Desktop idle, hover and modal-action states checked in the browser; focus styling implemented in CSS.
- [x] Reduced-motion behavior added.
- [x] Browser console checked without errors.
- [x] `npx tsc --noEmit`, `git diff --check` and `npm run build` passed.
- [x] Calm centered idle trace and single-point hover replacement checked in Chrome.
- [ ] Combined source/implementation visual input could not be opened because of browser policy.

final result: blocked

## Portfolio CTA — единая чистая геометрия карточек — 2026-09-17

### Source visual truth

- Reference screenshot: `/Users/ustim/Downloads/Снимок экрана — 2026-09-17 в 00.41.09.png`.
- The reference shows an overlapping card stack: no decorative frame around the image, an equal inset on the top and horizontal sides, rounded image corners only at the top, and a straight image-to-footer junction.

### Implementation evidence

- Local route: `http://localhost:3000/portfolio`.
- Browser capture: `/tmp/portfolio-cta-reference-alignment.png`, desktop viewport 1695 × 951 px.
- DOM/style evidence: all three image wrappers use the same `20px 20px 0px` desktop inset; each rendered image has `19px 19px 0px 0px` radii. The image wrapper's `::before` pseudo-element does not render, so no inner decorative outline remains.
- Interaction evidence: selecting the VetScanCT card makes `Показати проєкт VetScanCT` the active card; all project cards preserve the same image geometry.
- Runtime evidence: current browser tab contains two non-error diagnostics and zero errors/warnings.

### Findings

- P0/P1/P2 расхождений не обнаружено.
- Removed the extra image outline and the VetScanCT-specific scale exception that produced a mismatched frame.
- Follow-up: the image wrapper no longer has its own dark background. Its transparent inset now reveals the same graphite surface as the outer card, removing the last visually separate "frame" layer.
- Latest alignment with the supplied Beauty Master CRM card: every project image now fills the visual area with `object-fit: cover` and `width/height: 100%`. This removes the empty black space that remained with `contain` and gives Luxury Travel, VetScanCT, and Beauty Master CRM the same large, edge-to-edge presentation inside the top of their cards.
- VetScanCT-specific follow-up: when the card is active, its image uses `object-position: left center`, so the complete left edge of the veterinary CRM artwork is visible. Luxury Travel and Beauty Master CRM remain at the shared centered position.
- Kept the existing outer graphite card border, stack depth, hover sheen, and automatic rotation; these are structural parts of the approved deck rather than an image frame.
- Images now use the same clean inset and top-only radius treatment across Luxury Travel, VetScanCT, and Beauty Master CRM.

### Implementation checklist

- [x] Reference visual compared against the live `/portfolio` implementation.
- [x] No inner image frame or special per-card scaling remains.
- [x] Top-only image radii and equal desktop insets confirmed for all three projects.
- [x] All three project images use `cover` and fill their visual area without empty dark fields.
- [x] VetScanCT left edge checked in the active card; other cards retain centered positioning.
- [x] Active-card selection checked.
- [x] Browser console checked.
- [x] `npx tsc --noEmit` and `git diff --check` passed.

final result: passed

## Portfolio CTA live project deck — 2026-09-16

### Source visual truth

- Selected concept reference: `/Users/ustim/.codex/generated_images/01a0a48e-599c-73e3-a99d-909017fd6b83/exec-f072b0cd-5dc3-499d-a2ce-dad1a096b00d.png`, 1415 × 1112 px.
- Scope: only the right visual area of the dedicated CTA on `/portfolio`; the left copy, generic `BookingCta`, footer, and CTA blocks on other routes remain unchanged.
- The reference establishes three overlapping, image-led graphite project cards with clear depth, restrained silver edges, and a strong foreground card.

### Implementation evidence

- Local route: `http://localhost:3000/portfolio`.
- Final desktop screenshot: `/tmp/portfolio-cta-live-deck-final.png`, 1695 × 887 px.
- Hover/fan state: `/tmp/portfolio-cta-live-deck-hover.png`, 1695 × 887 px.
- Mobile screenshot: `/tmp/portfolio-cta-live-deck-mobile.png`, 375 × 812 px.
- Combined source/implementation comparison: `/tmp/portfolio-cta-live-deck-comparison.png`, 1400 × 600 px.
- Runtime evidence: a clean browser tab reports no console errors or warnings; mobile document width equals viewport width (`375 = 375`).
- Interaction evidence: the deck rotates automatically every 4 seconds, pauses on hover/focus, fans outward on hover, responds to cursor position, and brings a clicked visible card to the foreground. The CTA button collapses the deck before opening the inquiry form.

### Findings

- P0/P1/P2 расхождений не обнаружено.
- Composition: the same three-project layered hierarchy is preserved; the implementation is intentionally scaled to fit the right half of the existing CTA without covering the left content.
- Content fidelity: all cards use the real Luxury Travel, VetScanCT, and Beauty Master CRM assets plus project title, category, stack, status, and counter.
- Motion: entrance staggering, slow image drift, spring-like card reordering, pointer parallax, hover fan, silver sheen, and launch collapse are implemented without coral accents.
- Accessibility: each project is a real button with a localized accessible label and `aria-pressed`; keyboard focus pauses rotation and receives a visible focus ring. Automatic and decorative motion is disabled for `prefers-reduced-motion`.
- Responsive behavior: the deck moves below the copy on mobile, remains inside the CTA border, and does not create horizontal overflow.

### Comparison history

- Initial implementation: replaced the abstract wireframe placeholder with three real project cards and multi-layer motion.
- P1 found during browser QA: animated wrappers created independent stacking contexts, causing the last DOM card to appear above the selected card.
- Fix: card wrappers now receive explicit front/middle/back z-index classes synchronized with the active project.
- Post-fix verification: Luxury Travel is initially `aria-pressed`, appears in the foreground, a pointer click on an exposed card changes the selected project, and a clean tab remains error-free.

### Implementation checklist

- [x] Changes are isolated to the `/portfolio` CTA.
- [x] Real project images and readable metadata are used.
- [x] Active-card stacking and manual selection are correct.
- [x] Automatic rotation pauses during interaction.
- [x] Hover, parallax, sheen, image drift, and launch animations are present.
- [x] Reduced-motion behavior is implemented.
- [x] Desktop and mobile views were visually checked.
- [x] Mobile horizontal overflow was checked.
- [x] Final browser console is clean.
- [x] `npx tsc --noEmit`, `git diff --check`, and `npm run build` passed.

final result: passed

## Glass-aperture carousel transition — 2026-09-16

### Source visual truth

- Selected visual direction: first generated concept, `/Users/ustim/.codex/generated_images/01a0a48e-599c-73e3-a99d-909017fd6b83/exec-19d1ee5b-cb91-4232-a874-b9643986d12f.png`, 1487 × 1058 px.
- The source establishes a graphite-and-off-white glass aperture: a soft frosted field and bright curved seam reveal the next surface as it crosses the page.
- Intentional adaptation: the user requested this motion only for the large active project card in the portfolio carousel; the global header and project-preview rail remain stable.

### Implementation evidence

- Route: `http://localhost:3000/portfolio`; Chromium viewport: 1710 × 951 CSS px; implementation capture: `/tmp/person-site-portfolio-glass-aperture-natural-position.png`, 1695 × 943 px.
- Transition state: Ukrainian locale, `VetScanCT — CRM-система` moving to `Вебплатформа та робочі процеси` via the next-project control.
- Full-view comparison: the source and the implementation transition capture were opened together. Their overall page composition intentionally differs, while the targeted aperture treatment matches: an off-white optical seam, smoky refraction, left-to-right reveal, and no colour accent.
- Focused region: the active carousel background was inspected at the mid-transition frame; the generated RGBA veil is visible across the active card, the outgoing project is clipped beneath it, and incoming copy waits until the effect has passed.
- Interaction evidence: next and previous controls were tested. The forward and backward directions apply their matching aperture direction, controls are disabled during the 820 ms transition, then re-enable. No horizontal overflow was detected.
- Runtime evidence: browser logs contained only development Fast Refresh and React DevTools information; no runtime errors or warnings were observed.

### Findings

- No actionable P0/P1/P2 mismatches.
- Fonts and typography: the existing portfolio text scale, weight, hierarchy, and navigation remain unchanged; only the incoming project copy receives a short delayed clarity transition.
- Spacing and layout rhythm: the carousel's copy column, preview rail, control placement, and section height are unchanged, so the new effect does not alter the page rhythm.
- Colors and visual tokens: the effect uses white, smoke-gray, and graphite only; no coral or coloured glow is introduced.
- Image quality and asset fidelity: `public/assets/transitions/glass-aperture-veil.png` is a generated RGBA texture with clean alpha, rendered through `next/image` rather than an improvised vector or CSS drawing.
- Copy and content: project titles, descriptions, labels, CTA, and localization are unchanged.
- Accessibility: interaction controls remain semantic buttons. Repeated clicks are prevented only while the visual state is changing, and `prefers-reduced-motion` skips the animated state for an immediate project change.

### Follow-up polish

- [P3] The desktop interaction is browser-verified. The existing responsive layout remains in place, but a separate mobile visual capture is a useful future polish pass when a device-sized browser viewport is available.

### Implementation checklist

- [x] Source concept and implementation transition state opened together for review.
- [x] Forward and backward controls verified.
- [x] Active-card aperture asset added with alpha transparency.
- [x] Reduced-motion path preserved.
- [x] No horizontal overflow.
- [x] `npx tsc --noEmit` and `git diff --check` passed.

final result: passed

## Portfolio carousel iteration — 2026-09-16

### Source visual truth

- Reference screenshot: `/Users/ustim/Downloads/Снимок экрана — 2026-09-16 в 12.14.18.png`, 3420 × 898 px, PNG.
- The source defines the interaction and composition: a single full-bleed active image, project copy on the left, three tall upcoming-project previews on the right, and two round navigation controls.
- Intentional adaptation: real product interface assets replace the source's cinematic artwork; the site header and neutral graphite palette are retained as part of the established AU studio design system.

### Implementation evidence

- Local route: `http://localhost:3000/portfolio`.
- Desktop screenshot: `/tmp/person-site-portfolio-carousel-desktop.png`, 1695 × 943 px; browser viewport 1710 × 951 CSS px.
- State: Ukrainian locale, first project active (`VetScanCT — CRM-система`), no hover state.
- Full-view comparison: the supplied reference and implementation were reviewed together with their differing viewport proportions noted; the comparison covers the active full-bleed background, left information block, three-preview rail, and centered circular controls.
- Focused evidence: the preview rail and control group are fully readable in the desktop capture, so a separate crop was not required.
- Interaction evidence: clicking `Наступний проєкт` changes the active title from `VetScanCT — CRM-система` to `Вебплатформа та робочі процеси`; keyboard `ArrowRight` performs the same change. The project CTA is visible and targets `#contacts`.
- Runtime evidence: document scroll width is 1695 px within the 1710 px viewport; browser logs contain only the standard React DevTools informational notice and no warnings or errors.
- Composition update: the original compact portfolio hero is restored above the carousel with the reference copy `Продукти, які вирішують реальні задачі` and the established dark atmospheric background; the carousel remains the next section in the page flow.
- Responsive implementation: below 700 px previews become a horizontal scroll-snap rail, controls move above it, and the active copy stays full-width. A separate device-sized browser capture was not available in the connected preview session, so this remains a P3 visual follow-up rather than a release blocker.

### Findings

- P0/P1/P2 расхождений не обнаружено.
- Fonts and typography: the active project uses the existing lightweight SF Pro hierarchy; metadata and counter are deliberately compact so they do not compete with the project title.
- Spacing and layout rhythm: the original two-column card grid is fully replaced by one immersive stage, with left copy and right previews matched to the reference's visual balance.
- Colors and visual tokens: background dimming, glass-like controls, borders, and focus states use the existing graphite and off-white tokens; no coral accent was introduced.
- Image quality and asset fidelity: all visible project images use local, high-resolution product assets through `next/image`; each preview is cropped with `object-fit: cover` and gains no placeholder or generated imagery.
- Copy and content: real project titles, descriptions, alt text, CTA, and accessible control labels are localized for UA/RU/EN.
- Accessibility: preview items and arrows are semantic buttons with explicit labels, keyboard arrows switch projects when the stage is focused, and reduced-motion users receive no image/hover transition animation.

### Comparison history

- Initial state: static 2×2 `FeatureGrid` cards below a separate portfolio hero.
- Implemented state: a single `PortfolioCarousel` replaces both the hero/grid composition while preserving the global navigation and the contact CTA journey.
- Post-build verification: desktop visual capture, arrow-button selection, keyboard selection, CTA target, runtime logs, and page-width check completed without actionable issues.

### Implementation checklist

- [x] Static portfolio hero and grid removed from the rendered route.
- [x] One active full-bleed project stage added.
- [x] Three interactive upcoming-project previews added.
- [x] Round previous/next controls added with a local icon library.
- [x] Keyboard arrow navigation added.
- [x] Project CTA points to the contact section.
- [x] UA, RU, and EN labels added.
- [x] `prefers-reduced-motion` support added.
- [x] Desktop screenshot and runtime interaction checks completed.
- [ ] Mobile browser screenshot remains a follow-up visual check.
- [x] `npx tsc --noEmit` and `git diff --check` passed.

final result: passed

## Footer process iteration — 2026-09-15

### Source visual truth

- Reference screenshot: `/Users/ustim/Downloads/Снимок экрана — 2026-09-15 в 23.04.52.png`, 1608 × 824 px, PNG.
- Written target: replace the three footer link columns with `Ідея → Структура → Дизайн → Розробка → Запуск`; use graphite lines, circular nodes, a slow neutral light pulse, active-step highlighting, hover descriptions, a vertical mobile chain, and reduced-motion support.
- The screenshot is treated as the spacing, typography, and dark-palette reference; the new process scheme intentionally replaces its information architecture.

### Implementation evidence

- Local route: `http://127.0.0.1:3000/`.
- Final desktop screenshot: `/tmp/footer-process-desktop-final.png`, 1695 × 887 px; rendered desktop viewport 1695 × 895 CSS px, captured at browser density 2 with CSS-pixel screenshot normalization.
- Final mobile screenshot: `/tmp/footer-process-mobile-final.png`, 375 × 812 px; requested responsive override 390 × 844, rendered page width 375 CSS px, DPR 1.
- Combined source/implementation comparison: `/tmp/footer-process-comparison-final.png`, 3303 × 887 px.
- State: homepage footer, dark theme, Russian locale in the captured implementation, first process step active.
- Focused evidence: desktop process card and mobile vertical chain are both fully readable in the captures; an additional crop was not needed because the process occupies a large, isolated region.
- Interaction evidence: five step buttons are present; selecting `Структура` or `Дизайн` changes `aria-current="step"` and reveals the corresponding description; the 20-second line cycle advances through the nodes in sync and pauses while a step is focused or hovered.
- Updated motion evidence: when a new step becomes active, its node scales up, increases its halo and core glow, then returns to its base size over 1500ms. The active state leads the line's center by 320ms, so the flash begins at the impulse's contact with the node's left edge. The reduced-motion override remains enabled.
- Runtime evidence: the final clean browser tab reports no console errors or warnings; mobile document width equals viewport width (`375 = 375`).

### Findings

- P0/P1/P2 расхождений не обнаружено.
- Fonts and typography: the scheme uses the site's existing SF Pro system stack, light heading weight, compact labels, and muted supporting copy without changing the established hierarchy.
- Spacing and layout rhythm: the former three-column region is replaced by one wide card aligned with the personal contact column; the desktop process is horizontal and the mobile layout becomes a vertical chain without overflow.
- Colors and tokens: all new surfaces, borders, nodes, pulse, focus, and hover states use neutral graphite and off-white values from the existing theme; no coral accent was introduced.
- Image quality and asset fidelity: the change introduces no new raster or decorative image asset; existing AU logo and footer badges remain unchanged and sharp. The line, nodes, and pulse are functional process controls rather than image substitutes.
- Copy and content: all five requested stages and concise descriptions are present in UA, RU, and EN.
- Accessibility: steps are keyboard-focusable buttons, the active item exposes `aria-current="step"`, focus has a visible outline, and CSS plus runtime logic disable automatic motion when `prefers-reduced-motion` is enabled.
- Motion detail: the pulse is deliberately attached to `.activeStep .node` and `.activeStep .nodeCore`, so inactive circles, the connecting line, and the separate travelling line pulse keep their existing behavior.

### Comparison history

- Initial pass: replaced the three link columns with the responsive `FooterProcess` component and added localized labels and descriptions.
- P2 found before capture: the pulse translation was relative to its own diameter, so it would not traverse the entire line.
- Fix: animated the pulse position from `0` to `100%` of the full horizontal or vertical track.
- Post-fix evidence: `/tmp/footer-process-desktop-final.png`, `/tmp/footer-process-mobile-final.png`, and `/tmp/footer-process-comparison-final.png`; the pulse spans the complete track and no actionable P0/P1/P2 findings remain.

### Implementation checklist

- [x] Three obsolete footer columns removed from the rendered layout.
- [x] Five-stage horizontal desktop process added.
- [x] Vertical mobile process added.
- [x] Hover, focus, click, and synchronized timed active states implemented.
- [x] Neutral light pulse crosses the complete line.
- [x] Active node expansion and glow pulse added; node returns to its base size.
- [x] Reduced-motion handling implemented in CSS and runtime logic.
- [x] UA, RU, and EN copy added.
- [x] Mobile horizontal overflow checked.
- [x] Final browser console checked without errors or warnings.
- [x] `npx tsc --noEmit`, `git diff --check`, and `npm run build` passed.

final result: passed

## Capabilities essay iteration — 2026-09-15

### Source visual truth

- Reference screenshot: `/Users/ustim/Downloads/Снимок экрана — 2026-09-15 в 13.12.44.png`, 3420 × 1200 px, PNG, DPR 1.
- The reference defines the visual language: dark surface, large light headline, muted eyebrow, thin borders, restrained cards, and generous empty space.
- The implementation intentionally changes the information architecture from three trust cards to a long editorial capabilities section because the supplied content contains five detailed areas and several paragraphs.

### Implementation evidence

- Local route: `http://localhost:3000/`.
- Desktop screenshot: `/tmp/capabilities-essay-desktop-qa.png`, 1695 × 943 px, CSS viewport 1695 × 943, DPR 1.
- Mobile screenshot: `/tmp/capabilities-essay-mobile-qa.png`, 375 × 812 px, requested responsive override 390 × 844, rendered page width 375 px, DPR 1.
- Combined comparison input: `/tmp/capabilities-essay-comparison.png`.
- State: homepage, Ukrainian locale, dark theme, capabilities section visible, no hover state.
- DOM evidence: five capability articles, heading `Від ідеї до продукту, яким хочеться користуватися`, CTA points to `mailto:ustik72@gmail.com`.
- Runtime evidence: browser console returned no errors or warnings; mobile document width equals viewport width (`375 = 375`).
- A stale HMR overlay appeared once after `next build` ran while two old dev processes were still attached to port 3000; both processes were stopped, generated `.next` was cleared, and one fresh dev server was restarted. A new browser tab then loaded the homepage without an overlay and with an empty error/warning log.

### Findings

- P0/P1/P2 расхождений не обнаружено.
- Typography: the new heading uses the existing SF Pro system stack with a large lightweight display scale; body copy remains muted and readable against the dark surface.
- Spacing and layout: desktop uses the reference's wide editorial rhythm and hairline dividers; mobile collapses the two-column rows into a single readable column without overflow.
- Colors and tokens: the implementation keeps the existing graphite background, off-white text, muted gray copy, and coral numbering/accent used elsewhere on the site.
- Content: all five supplied areas are visible and translated through the existing UA/RU/EN content dictionary; the long copy is not hidden behind an accordion.
- Intentional difference: the source has three bordered trust cards and a legal footer area, while the implementation uses numbered editorial rows, technology tags, and a project CTA to support the requested capabilities content. This is a content-driven redesign, not an accidental drift.

### Comparison history

- Initial implementation: replaced the old trust section with `CapabilitiesEssay`, including the headline, intro, five capability rows, technology tags, and CTA.
- Verification pass: fixed the CTA to use the existing localized navigation label and mail link; added missing RU/EN translations and category labels.
- Post-fix evidence: `/tmp/capabilities-essay-desktop-qa.png`, `/tmp/capabilities-essay-mobile-qa.png`, and `/tmp/capabilities-essay-comparison.png`; no actionable P0/P1/P2 findings remain.

### Implementation checklist

- [x] Reference visual opened and compared with the rendered implementation.
- [x] Desktop composition checked in a combined source/implementation comparison.
- [x] Mobile layout checked at the responsive breakpoint.
- [x] Fonts, spacing, colors, image usage, and copy/content reviewed.
- [x] Five capability sections rendered in Ukrainian.
- [x] RU and EN translations added for the new content.
- [x] No horizontal overflow on mobile.
- [x] No browser console errors or warnings.
- [x] `npx tsc --noEmit` passed.
- [x] `git diff --check` passed.

final result: passed

## Hero CTA — floating glass button — 2026-09-22

### Source visual truth

- Reference screenshot: `/Users/ustim/Downloads/Снимок экрана — 2026-09-22 в 13.39.20.png`.
- Target: the homepage CTA `Переглянути роботи` should retain the supplied glass-button depth but cast a natural attached shadow: strongest below, softer to the right and minimal on the left.

### Implementation evidence

- Local route: `http://localhost:3001/`.
- State: homepage hero, Russian locale in the browser capture, idle and hover states checked separately.
- Focused target: only `.homeHero .action`; other `MarketingHero` links and the header CTA remain unchanged.
- Runtime evidence: computed `backdrop-filter: blur(16px) saturate(1.18)`, four attached shadow layers in the idle state, hover `translateY(-5px) scale(1.015)`, and Chrome console returned no errors or warnings.

### Findings

- P0/P1/P2 расхождений не обнаружено.
- The CTA now uses a translucent warm-white surface, a thin light border, inset top highlight, and layered shadow that separates it from the hero background.
- Correction after visual review: removed the detached lilac glow, pseudo-layer, and idle motion because they made the button appear to float above a separate surface.
- The final shadow is neutral and attached to the CTA: the main dense layer falls below, a softer layer extends right, and a minimal layer extends left. All edges dissolve naturally into the hero background.
- Hover raises the button by `5px` with a small scale increase, retaining the same directional shadow model; keyboard focus uses the same visible state.

### Implementation checklist

- [x] Reference screenshot opened and compared with the rendered hero.
- [x] Glass surface and natural attached directional shadow implemented.
- [x] Idle and hover states checked in Chrome.
- [x] Responsive CSS remains mobile-first; no additional width or overflow was introduced.
- [x] No browser console errors or warnings.
- [x] `npx tsc --noEmit`, `git diff --check`, and `npm run build` passed.

final result: passed

## Portfolio CTA — full project imagery — 2026-09-16

### Source visual truth

- Reference screenshot: `/Users/ustim/Downloads/Снимок экрана — 2026-09-16 в 23.28.37.png`, 1046 × 824 px.
- The target state shows the three overlapping project cards with complete image edges visible inside each card.

### Implementation evidence

- Local route: `http://localhost:3000/portfolio`.
- Desktop implementation screenshot: `/tmp/portfolio-cta-full-images-desktop-final.png`, 1695 × 887 px; default desktop viewport, device density normalized by the browser capture.
- Mobile implementation screenshot: `/tmp/portfolio-cta-clean-mobile.png`, 375 × 812 px; responsive override 390 × 844, rendered CSS width 375 px.
- Combined source/implementation comparison: `/tmp/portfolio-cta-full-images-comparison.png`, 1400 × 600 px.
- State: first project active, dark theme, the existing CTA copy preserved.
- Runtime evidence: clean desktop and mobile tabs reported no console errors or warnings; mobile document width equals viewport width (`375 = 375`).

### Findings

- P0/P1/P2 расхождений не обнаружено.
- Image quality and fidelity: the previous `object-fit: cover` crop was replaced with `object-fit: contain`; the scale animation that could push edges outside the frame was removed. The full source image now remains visible from the top and sides.
- Layout: the project image area and card stack were increased vertically so `contain` does not leave excessive letterboxing; metadata remains in the existing footer area.
- Motion: the card remains alive through a restrained brightness/saturation drift instead of zooming the image beyond its bounds. Card depth, hover fan, parallax, and selection behavior remain intact.
- Responsive behavior: the same full-image rule works on mobile, the CTA stays inside its rounded frame, and no horizontal overflow was introduced.
- Typography, colors, and copy: unchanged from the approved CTA design and still use the existing neutral graphite/off-white system.

### Comparison history

- Initial QA found a direct mismatch: `object-fit: cover` removed image content at the top and side edges.
- Fix: changed the image to `contain`, removed scale/translation from `livingImage`, replaced it with a filter-only motion, and expanded the visual/card heights to preserve useful image size.
- Post-fix evidence: `/tmp/portfolio-cta-full-images-comparison.png`, `/tmp/portfolio-cta-full-images-desktop-final.png`, and `/tmp/portfolio-cta-clean-mobile.png`; full edges are visible and both console/overflow checks pass.

### Implementation checklist

- [x] Full image edges are preserved in all project cards.
- [x] No crop-causing scale or translation remains on the image.
- [x] Desktop and mobile states were captured and compared.
- [x] Existing card animation remains active without cropping.
- [x] Mobile horizontal overflow checked.
- [x] Clean browser console checked after a fresh reload.
- [x] `npx tsc --noEmit`, `git diff --check`, and `npm run build` remain the required final checks.

final result: passed

## About CTA — first selected button treatment — 2026-09-24

### Source visual truth

- Selected Image Gen reference: `/Users/ustim/.codex/generated_images/01a0d320-b764-7191-96a0-b45a0b34b665/exec-54f18fea-d54f-4272-95df-75abbc50e339.png`, 2129 × 738 px.
- The selected treatment keeps the existing dark surface, coral pill, black label, right arrow, and lower animation, adding a thin warm-white outer keyline, a restrained darker coral inner edge, and minimal depth.

### Implementation evidence

- Local route: `http://localhost:3000/about`.
- Browser screenshot: `/private/tmp/about-cta-viewport-final.png`, 1710 × 952 px, CSS viewport 1710 × 952, DPR 1.
- Focused implementation crop: `/private/tmp/about-cta-implementation-normalized.png`, 864 × 300 px; the 432 × 150 CSS crop was scaled 2× to match the source reference density.
- Combined comparison input: `/private/tmp/about-cta-comparison.png`, 1728 × 300 px.
- State: Ukrainian locale, dark theme, idle CTA, lower animation visible, no hover or focus state.
- Primary interaction: CTA button opened the project inquiry form and the form was dismissed with Escape.
- Runtime evidence: browser console returned no errors or warnings.

### Findings

- P0/P1/P2 расхождений не обнаружено.
- Typography: existing SF Pro system typography, Ukrainian copy, black label weight, and arrow placement are preserved; the button treatment does not alter animation timing or copy.
- Spacing and layout: the existing CTA dimensions, centered position, pill radius, and vertical animation axis remain unchanged. The outer keyline and inner edge stay inside the existing component box.
- Colors and visual tokens: the coral fill remains `var(--color-accent)`; the new warm-white border separates it from the dark page, while the darker coral inset adds definition without a detached shadow.
- Image quality and asset fidelity: no new raster or decorative image asset is required; the existing Lucide arrow icon and CSS animation remain in place.
- Copy and content: `Обговорити проєкт` remains unchanged.

### Comparison history

- Initial implementation: kept the existing CTA geometry and added the selected first treatment through the button border and layered inset/edge shadow.
- Focused comparison: source and rendered CTA were normalized to the same 864 × 300 visual density and reviewed together in `/private/tmp/about-cta-comparison.png`.
- No P0/P1/P2 follow-up fixes were required after comparison.

### Implementation checklist

- [x] Selected reference opened and compared with the rendered CTA.
- [x] Outer keyline, inner coral edge, and restrained depth implemented.
- [x] Existing arrow and lower animation preserved.
- [x] CTA form interaction tested.
- [x] Browser console checked with no errors or warnings.
- [x] `npx tsc --noEmit`, `git diff --check`, and `npm run build` passed.

final result: passed


## Mobile hero — 2026-09-29

- Source visual truth: `/Users/ustim/Downloads/Снимок экрана — 2026-09-29 в 14.57.20.png` и согласованная с пользователем композиция: компактная центральная карточка, уменьшенный глобус слева, уменьшенный портрет над карточкой справа и более компактный текст.
- Реализация: локальная главная страница в Chrome при ширинах `479×640` и `390×844`; мобильное меню закрыто, локаль UA.
- Типографика: размер заголовка и описания уменьшен, переносы читаемы, обрезания текста нет.
- Композиция: карточка VetScanCT размещена по центру; глобус занимает только нижний левый край; портрет находится над правым краем карточки и не пересекается с текстом.
- Визуальные токены и ассеты: сохранены существующие цвета, CTA, dashboard, EarthGlobe и портрет автора.
- Проверки: визуальный просмотр на двух мобильных размерах, accessibility-дерево содержит заголовок, описание, CTA, карточку и кнопку меню; ошибок уровня error в браузерной консоли нет. `npx tsc --noEmit`, `git diff --check` и `npm run build` прошли.
- Ограничение проверки CTA: Chrome не принял автоматизированный физический клик из-за тайм-аута input-dispatch, но ссылка и её исходный `#projects`-адрес не менялись.

final result: passed
