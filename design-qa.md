# Design QA

final result: passed

## Цель проверки

Целевой референс — прикреплённый пользователем скриншот главной страницы: тёмный hero-блок, центральный интерфейс, камни по краям, floating navigation и cookie banner. Сравнение проводилось по содержимому страницы, без chrome-интерфейса браузера.

## Проверенные поверхности

- Desktop production preview: `1710 × 895`.
- Mobile production preview: `390 × 844`.
- Главная: локальные `0408-stone-left...webp` и `0409-stone-right...webp` загружаются без ошибок.
- Header: корректный Obsidian brand mark, dropdown меню и CTA.
- Mobile header: desktop-nav скрывается, mobile menu открывается, горизонтального overflow нет.
- Cookie banner: отображается до согласия и скрывается после `Accept All`.
- Content accordions: меняют `aria-expanded` и открываемое состояние через отдельный React-компонент.
- Hero: слова, текст и CTA появляются последовательно с исходными задержками.
- Header по живому референсу: прозрачное состояние вверху, glass-состояние после прокрутки, hover-delay `80/180ms`, dropdown с затемнением, bar-анимацией `528px` и fade `300ms`.
- Mobile Header по живому референсу: полноэкранное меню от `top: 64px`, крестик, крупная serif-навигация и раскрывающиеся группы с миниатюрами.
- FeatureSlider: прогресс-линия заполняется за 10 секунд через `requestAnimationFrame`, карточки и изображения переключаются автоматически и по клику.
- FeatureSlider не блокируется локальной настройкой `prefers-reduced-motion`, поэтому его поведение совпадает с живым оригиналом; reduced-motion сохранён для hero-анимации и раскрывающихся transition.
- Проверены страницы продукта, integrations, legal, privacy policy и terms of service.

## Результаты

- `npm run build` — успешно, 53 Next.js routes сгенерированы.
- После финальной правки Header и SliderBlock — `npm run build` успешно, 53 Next.js routes сгенерированы.
- Финальный smoke-test после очистки: все основные страницы, 34 integration/media/security маршрута и служебные файлы вернули ожидаемый ответ.
- PDF-архив `public/legal` удалён по запросу пользователя; юридические страницы переведены на JSX-статьи.
- `robots.txt`, `sitemap.xml`, `icon.png` — доступны с `200`.
- Битые изображения в проверенных страницах — 0.
- Внешние изображения в runtime — 0.
- Desktop/mobile horizontal overflow — не обнаружен.
- Console errors в production preview после восстановления анимаций — 0.
- Runtime-проверка в открытой пользовательской вкладке после hard reload: progress-line меняется, автопереключение `0 → 1` за 10 секунд подтверждено, console errors — 0.
- Progress-line сверена с оригиналом: локальный фон белой полосы `rgb(231, 229, 228)`, ширина изменилась с `25px` до `81px` за `1.2s`, линия визуально видима.
