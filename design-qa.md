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
