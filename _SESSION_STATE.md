# Session state

Дата: 2026-09-12
Статус: Восстановлена визуальная и временная логика главной страницы по оригинальному сайту; production build и smoke-test пройдены.

## Сделано

- Убран iframe и старый runtime-слой snapshots: приложение работает через Next.js App Router.
- Все 47 маршрутов сайта сохранены в `lib/site-content.ts` и статически генерируются.
- Страницы переведены на настоящие React-компоненты: маркетинговые страницы, страницы аудиторий, integrations, integration detail, security, pricing, about, media и юридические статьи.
- Общие визуальные блоки вынесены в отдельные папки с соседними CSS Modules: `MarketingHero`, `FeatureSlider`, `FeatureGrid`, `FaqSection`, `LogoStrip`, `BookingCta`, `PageSection`, `IntegrationDirectory`, `IntegrationDetail`, `ArticlePage`, `LegalIndex`.
- `dangerouslySetInnerHTML`, `lib/snapshot.ts`, `SnapshotPage`, `SnapshotSection`, `SnapshotInteractions`, `public/sitegrab/pages` и `public/sitegrab/index.html` удалены.
- Все используемые изображения и логотипы находятся локально в `public/sitegrab/assets`; неиспользуемые варианты выгрузки, tracker-бинарники и compatibility CSS удалены.
- Интерактивный `FeatureSlider` сохранён: автоматическое переключение, клики по карточкам, fade изображений и видимая белая progress-line через `requestAnimationFrame`.
- FAQ, фильтр/поиск интеграций, header dropdown, mobile menu и cookie banner работают через React state.
- Сохранены metadata, canonical URLs, `loading`, `error`, `not-found`, sitemap, robots и favicon.
- PDF-архив `public/legal` удалён ранее по запросу; dead PDF routes также убраны из карты маршрутов.
- Восстановлена геометрия hero на главной: заголовок, CTA, центральный preview и камни по краям теперь используют реальные локальные AVIF-ассеты оригинала.
- Восстановлены карточки `Save Time & Grow AUM` через компонент `ModuleShowcase` с отдельным CSS Module и локальными фоновыми/передними изображениями.
- Восстановлен блок `The platform that scales your firm`: заголовок и описание левой колонки, порядок элементов, размеры изображения и интервалы приведены к оригиналу.
- В `FeatureSlider` восстановлены автоматическое переключение, fade-смена изображения и белая progress-line: таймер запускается при появлении блока во viewport через `IntersectionObserver`, линия рисуется через `requestAnimationFrame`.
- С оригинального сайта в `public/sitegrab/assets` добавлены точные ассеты hero, камней и двух showcase-карточек.
- Восстановлен внутренний `gap: 26px` между верхней линией и содержимым каждого пункта `FeatureSlider`; из-за этого меню больше не сжимается и не проваливается вниз.
- На главной восстановлен второй блок `Who it's for`: добавлен полноценный `Consolidators`-слайдер с изображением слева, меню справа и пунктом `Everything for Independent Firms and more`.
- `FeatureSlider` получил режим `reverse` для зеркальной раскладки блоков без дублирования компонента.
- Правый камень в hero главной заменён на портрет из `/Users/ustim/Desktop/НЕ УДАЛЯТЬ/Фото/2026-08-11 22.57.24.jpg`.
- Для портрета удалён белый фон с сохранением реального альфа-канала; финальный локальный asset — `public/sitegrab/assets/hero-founder-transparent-graphite-v2.png`.
- Восстановлен прежний фирменный вариант портрета: графитовый фильтр, затемнение под камень и мягкий тёплый акцент слева; desktop/mobile позиционирование сохранено в `MarketingHero.module.css`.
- Промежуточные дубликаты изображения удалены после проверки, в приложении оставлен только используемый финальный asset.
- Замена левого камня на 3D-глобус отменена по запросу; слева восстановлен локальный исходный asset `public/sitegrab/assets/0408-stone-left.bG7f73ao_1bzuE6-57a94d6eb0.webp`.
- Обработанный правый портрет `public/sitegrab/assets/hero-founder-transparent-graphite-v2.png` восстановлен; натуральная цветная версия в приложение не подключалась.
- Неиспользуемый старый вариант `hero-founder-transparent-v4.png` удалён после переключения на восстановленный фирменный asset.

## Проверки

- `npx tsc --noEmit` — успешно.
- `npm run build` — успешно, 53 Next.js entries сгенерированы: 47 страниц и служебные маршруты.
- Production smoke-test: все 47 маршрутов вернули `200`.
- В отрендеренном HTML нет `dangerouslySetInnerHTML`, `data-snapshot-section` и ссылок на старые HTML snapshots.
- Проверены локальные изображения, найденные в HTML: 44 URL, битых загрузок — 0.
- Визуально проверены hero, CTA, камни по краям, каталог интеграций и progress-line слайдера в production preview на `3001`.
- Проверка анимации в браузере: до появления слайдера `transform: scaleX(0)` и ширина линии `0px`; в видимом состоянии линия растёт по треку `460px`, после цикла активный пункт переключается автоматически.
- Все 47 маршрутов из `lib/site-content.ts` в production preview вернули `200`.
- Проверка исходников: нет `console.log`/`console.warn`/`console.error`/`console.table`, `!important`, `dangerouslySetInnerHTML` и старых `data-snapshot-section`.
- Сверка геометрии меню с оригиналом: активный пункт `79px`, неактивные пункты `47px`, расстояние от описания до меню `149px`.
- Статичные `AudiencePreview` на главной удалены: в актуальной структуре оригинала блок `Who it's for` содержит полноценный слайдер `Consolidators`; полноценный `FeatureSlider` также присутствует на `/whos-it-for/independent-firms`.
- Проверка второго домашнего слайдера с оригиналом: заголовок `Who it's for` — `top: 3338`, изображение и заголовок `Consolidators` — `top: 3476`, изображение `872×756`, меню справа `460px`; активная линия заполняется и переключает пункт на `Rapid onboarding`.
- Проверка hero после восстановления фирменной обработки в production preview: изображение загружается через `next/image`, прозрачность подтверждена (`PNG`, `1254×1254`, `4` канала, `hasAlpha: true`), runtime-ошибок нет.
- После финальной подмены повторно пройдены `npm run build`, `npx tsc --noEmit` и smoke-test всех 47 маршрутов — все вернули `200`.
- После отмены глобуса production build повторно завершился успешно: 53 Next.js entries; TypeScript и smoke-test всех 47 маршрутов также прошли.

## Важно

- `public/sitegrab/assets` — это только локальные визуальные ассеты. Разметка больше не зависит от папок SiteGrab.
- Git-репозиторий в рабочей папке отсутствует, поэтому `git status` недоступен.
- Реальные формы, авторизация, база данных, серверные API и booking-интеграция пока представлены безопасными ссылками-заглушками `mailto:`.
