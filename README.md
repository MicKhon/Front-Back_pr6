# Lada Detal — Магазин автозапчастей

Итоговый проект по курсу «Фронтенд и бэкенд разработка» (4 семестр, 2025/2026).

Объединяет результаты практических занятий 1–5 в единое полнофункциональное веб-приложение — каталог автозапчастей для автомобилей Lada.

---

## Стек технологий

| Слой | Технологии |
|------|------------|
| Фронтенд | React 18, Axios, CSS Modules/SASS |
| Бэкенд | Node.js, Express.js, nanoid |
| Документация API | Swagger (swagger-jsdoc + swagger-ui-express) |
| Тестирование | Postman |

---

## Связь с практическими занятиями

### Занятие 1 — CSS-препроцессоры (SASS)

Файл: `frontend/src/pages/PartsPage/PartsPage.scss`

- **Переменные**: `$bg-dark`, `$accent`, `$border-color`
- **Миксины**: `card($radius)`, `container($w)`, `btn-variant($bg, $border)`
- **Вложенность**: BEM — `.part-card__name`, `.modal__header`

### Занятие 2 — Сервер на Node.js + Express

Файл: `backend/app.js`

- **5 CRUD-маршрутов**: `POST /api/parts`, `GET /api/parts`, `GET /api/parts/:id`, `PATCH /api/parts/:id`, `DELETE /api/parts/:id`
- **Middleware**: `express.json()`, логгер, CORS

### Занятие 3 — JSON и API

Файл: `frontend/src/api/index.js`

- Данные в формате **JSON**
- `axios.create()` с `baseURL`
- Тестирование через **Postman**

### Занятие 4 — API + React

- **Компоненты**: `PartCard`, `PartModal`, `PartsPage`
- **CRUD через UI**: создание, чтение, обновление, удаление
- **Фильтрация** по категориям

### Занятие 5 — Swagger документация

- JSDoc-аннотации в `backend/app.js`
- Документация: `http://localhost:3000/api-docs`
### Занятие 6 — 
- добавлены предпроцессоры SASS
- создан сервер NODE.js , добавлены 5 CRUD маршрутов
- добавлены JSON и API
- добавлены карточки товаров через React
- добавлен Swagger для работы с API
---

## Структура проекта

```
FRONT_6/
├── backend/
│   ├── node_modules/
│   ├── app.js              # Express-сервер + Swagger (Занятия 2, 5)
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── node_modules/
│   ├── public/
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   └── robots.txt
│   │
│   ├── src/
│   │   ├── api/            # Axios-клиент (Занятия 3, 4)
│   │   │   └── index.js
│   │   ├── components/     # React-компоненты (PartCard, PartModal)
│   │   ├── pages/          # Страницы (PartsPage)
│   │   ├── App.css
│   │   ├── App.js          # Корневой компонент
│   │   ├── App.test.js
│   │   ├── index.css
│   │   ├── index.js        # Точка входа React
│   │   ├── logo.svg
│   │   ├── reportWebVitals.js
│   │   └── setupTests.js
│   │
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore
└── README.md
```

**Основные файлы проекта:**

| Файл | Описание |
|------|----------|
| `backend/app.js` | Сервер на Express, CRUD API, Swagger документация |
| `frontend/src/api/index.js` | Настройка Axios для запросов к бэкенду |
| `frontend/src/components/` | Переиспользуемые компоненты (карточки, модальные окна) |
| `frontend/src/pages/PartsPage/` | Основная страница каталога запчастей |
| `frontend/src/pages/PartsPage/PartsPage.scss` | SASS-стили с миксинами и переменными |

---

## Запуск

### Бэкенд

```bash
cd backend
npm install
npm start
# → http://localhost:3000
# → Swagger: http://localhost:3000/api-docs
```

### Фронтенд

```bash
cd frontend
npm install
npm start
# → http://localhost:3001
```

> 💡 **Совет**: Откройте два терминала в VS Code (`Ctrl + ~` → кнопка `+`), чтобы запускать фронтенд и бэкенд одновременно.

---

## API эндпоинты

| Метод | Путь | Описание |
| --- | --- | --- |
| `GET` | `/api/parts` | Получить все запчасти |
| `POST` | `/api/parts` | Создать запчасть |
| `GET` | `/api/parts/:id` | Получить запчасть по ID |
| `PATCH` | `/api/parts/:id` | Обновить запчасть |
| `DELETE` | `/api/parts/:id` | Удалить запчасть |

### Объект запчасти (JSON)

```json
{
  "id": "abc123",
  "name": "Масляный фильтр",
  "category": "Фильтры",
  "article": "LF-001",
  "manufacturer": "Lada",
  "description": "Оригинальный масляный фильтр для Lada Vesta, Granta, Kalina",
  "price": 450,
  "stock": 25
}
```

---

## Тестирование в Postman

1. Запустить бэкенд (`npm start` в папке `backend`)
2. Открыть Postman и создать коллекцию **Lada Detal API**
3. Примеры запросов:

**GET все запчасти**

```
GET http://localhost:3000/api/parts
```

**POST новая запчасть**

```http
POST http://localhost:3000/api/parts
Content-Type: application/json

{
  "name": "Тормозные колодки передние",
  "category": "Тормозная система",
  "article": "BR-105",
  "manufacturer": "TRW",
  "description": "Комплект передних тормозных колодок",
  "price": 1200,
  "stock": 15
}
```

**PATCH обновить запчасть**

```http
PATCH http://localhost:3000/api/parts/{id}
Content-Type: application/json

{ "price": 1100 }
```

**DELETE удалить запчасть**

```
DELETE http://localhost:3000/api/parts/{id}
```

---

## Каталог запчастей

Проект включает запчасти для автомобилей Lada в следующих категориях:

| Категория | Примеры запчастей |
| --- | --- |
| Фильтры | Масляный фильтр LF-001 |
| Тормозная система | Тормозные колодки передние BR-105 |
| Система зажигания | Свеча зажигания SP-017 (Beru) |
| Двигатель | Детали двигателя |
| Подвеска | Элементы подвески |
| Трансмиссия | Детали трансмиссии |

---

## Функциональность приложения

✅ Просмотр каталога запчастей  
✅ Фильтрация по категориям  
✅ Добавление новых запчастей  
✅ Редактирование существующих запчастей  
✅ Удаление запчастей  
✅ Отображение наличия на складе  
✅ Адаптивный дизайн  
✅ Интерактивная API-документация (Swagger)



Копируйте всё от ```markdown до последнего ``` и вставляйте на GitHub! 👍
