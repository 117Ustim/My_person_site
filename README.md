# obsidianos.com-1789069359186 — Next.js

Проект перенесён в Next.js App Router с компонентной JSX-архитектурой.

Исходный URL: https://obsidianos.com/

## Запуск

```bash
npm install
npm run dev
```

Откройте http://localhost:3000. Для production-проверки используйте `npm run build && npm run start`.

## Архитектура

- `app/` — App Router, статические маршруты, metadata, sitemap и robots.
- `components/` — переиспользуемые компоненты шапки, подвала, cookies, shell и контентных секций. JSX/TSX и CSS Module находятся рядом в одной папке.
- `lib/site-content.ts` — карта всех маршрутов сайта.
- `lib/page-data.ts` — типизированные данные секций, интеграций, FAQ и статей.
- `public/sitegrab/assets` — локальные изображения и векторные ресурсы, используемые компонентами.

Каждая страница собирается из настоящих JSX-компонентов: hero, feature-grid, slider, FAQ, каталог интеграций, статьи и CTA. Разметка не читается из HTML-снимков и не использует `dangerouslySetInnerHTML`. Интерактивные листья — header, cookie-баннер, слайдер, FAQ и фильтр интеграций — работают через React. Все стили страниц находятся в CSS Modules рядом с компонентами.

## Как продолжать разработку

1. Меняйте компоненты в `components/`, данные в `lib/page-data.ts` и карту маршрутов в `lib/site-content.ts`.
2. Перед сдачей запускайте `npm run build`.
3. Не удаляйте `public/sitegrab/assets` без проверки ссылок: компоненты используют их как локальные изображения.

Важно: захват переносит браузерный frontend. Backend, база данных, авторизация, серверные API и внешние сервисы сами по себе локальными не становятся.
