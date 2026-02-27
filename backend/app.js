const express = require('express');
const { nanoid } = require('nanoid');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const port = 3000;

// Middleware для парсинга JSON
app.use(express.json());

// CORS middleware
app.use(cors({
  origin: "http://localhost:3001",
  methods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// Middleware для логирования запросов
app.use((req, res, next) => {
  res.on('finish', () => {
    console.log(`[${new Date().toISOString()}][${req.method}] ${res.statusCode} ${req.path}`);
    if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
      console.log('Body:', req.body);
    }
  });
  next();
});

// Начальные данные - запчасти Lada
let products = [
  {
    id: nanoid(6),
    name: 'Масляный фильтр',
    category: 'Фильтры',
    price: 450,
    description: 'Оригинальный масляный фильтр для Lada Vesta, Granta, Kalina',
    quantity: 25,
    article: 'LF-001',
    brand: 'Lada'
  },
  {
    id: nanoid(6),
    name: 'Тормозные колодки передние',
    category: 'Тормозная система',
    price: 1200,
    description: 'Комплект передних тормозных колодок',
    quantity: 15,
    article: 'BR-105',
    brand: 'TRW'
  },
  {
    id: nanoid(6),
    name: 'Свеча зажигания',
    category: 'Система зажигания',
    price: 180,
    description: 'Свеча зажигания АУ17ДВРМ',
    quantity: 100,
    article: 'SP-017',
    brand: 'Beru'
  }
];

// Swagger definition
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API магазина автозапчастей Lada Parts',
      version: '1.0.0',
      description: 'REST API для управления каталогом автозапчастей Lada',
    },
    servers: [
      {
        url: `http://localhost:${port}`,
        description: 'Локальный сервер',
      },
    ],
  },
  apis: ['./app.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Подключаем Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - category
 *         - price
 *         - quantity
 *       properties:
 *         id:
 *           type: string
 *           description: Автоматически сгенерированный уникальный ID запчасти
 *         name:
 *           type: string
 *           description: Название детали
 *         category:
 *           type: string
 *           description: Категория запчасти
 *         price:
 *           type: number
 *           description: Цена в рублях
 *         description:
 *           type: string
 *           description: Подробное описание запчасти
 *         quantity:
 *           type: integer
 *           description: Количество на складе
 *         article:
 *           type: string
 *           description: Артикульный номер
 *         brand:
 *           type: string
 *           description: Производитель
 *       example:
 *         id: "abc123"
 *         name: "Масляный фильтр"
 *         category: "Фильтры"
 *         price: 450
 *         description: "Оригинальный масляный фильтр для Lada Vesta"
 *         quantity: 25
 *         article: "LF-001"
 *         brand: "Lada"
 */

// Функция-помощник
function findProductOr404(id, res) {
  const product = products.find(p => p.id == id);
  if (!product) {
    res.status(404).json({ error: "Запчасть не найдена" });
    return null;
  }
  return product;
}

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Добавляет новую запчасть в каталог
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - category
 *               - price
 *               - quantity
 *     responses:
 *       201:
 *         description: Запчасть успешно добавлена
 *       400:
 *         description: Ошибка в теле запроса
 */
app.post("/api/products", (req, res) => {
  const { name, category, price, description, quantity, article, brand } = req.body;

  if (!name || !category || price === undefined || quantity === undefined) {
    return res.status(400).json({ error: "Обязательные поля: name, category, price, quantity" });
  }

  const newProduct = {
    id: nanoid(6),
    name: name.trim(),
    category: category.trim(),
    price: Number(price),
    description: description ? description.trim() : "",
    quantity: Number(quantity),
    article: article ? article.trim() : "",
    brand: brand ? brand.trim() : ""
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Возвращает список всех запчастей
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Список всех запчастей
 */
app.get("/api/products", (req, res) => {
  res.json(products);
});

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Получает запчасть по ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Данные запчасти
 *       404:
 *         description: Запчасть не найдена
 */
app.get("/api/products/:id", (req, res) => {
  const product = findProductOr404(req.params.id, res);
  if (!product) return;
  res.json(product);
});

/**
 * @swagger
 * /api/products/{id}:
 *   patch:
 *     summary: Обновляет данные запчасти
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Обновленная запчасть
 *       400:
 *         description: Нет данных для обновления
 *       404:
 *         description: Запчасть не найдена
 */
app.patch("/api/products/:id", (req, res) => {
  const id = req.params.id;
  const product = findProductOr404(id, res);
  if (!product) return;

  const { name, category, price, description, quantity, article, brand } = req.body;

  if (!name && !category && price === undefined && description === undefined && 
      quantity === undefined && !article && !brand) {
    return res.status(400).json({ error: "Nothing to update" });
  }

  if (name) product.name = name.trim();
  if (category) product.category = category.trim();
  if (price !== undefined) product.price = Number(price);
  if (description !== undefined) product.description = description.trim();
  if (quantity !== undefined) product.quantity = Number(quantity);
  if (article) product.article = article.trim();
  if (brand) product.brand = brand.trim();

  res.json(product);
});

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Удаляет запчасть из каталога
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       204:
 *         description: Запчасть успешно удалена
 *       404:
 *         description: Запчасть не найдена
 */
app.delete("/api/products/:id", (req, res) => {
  const id = req.params.id;
  const exists = products.some((p) => p.id === id);
  if (!exists) return res.status(404).json({ error: "Запчасть не найдена" });

  products = products.filter((p) => p.id !== id);
  res.status(204).send();
});

// 404 для всех остальных маршрутов
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

// Глобальный обработчик ошибок
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal server error" });
});

// Запуск сервера
app.listen(port, () => {
  console.log(`🚗 Сервер Lada Parts запущен на http://localhost:${port}`);
  console.log(`📚 Swagger UI доступен по адресу http://localhost:${port}/api-docs`);
});