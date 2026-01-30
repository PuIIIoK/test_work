# Fullstack Blog Application

Тестовое задание для b2b.polis.online. Простой блог с комментариями, демонстрирующий fullstack разработку с современным технологическим стеком.

## 📋 Содержание

- [Технологии](#технологии)
- [Требования](#требования)
- [Быстрый Старт](#быстрый-старт)
- [Структура Проекта](#структура-проекта)
- [API Endpoints](#api-endpoints)
- [Функционал](#функционал)
- [Документация](#документация)
- [Troubleshooting](#troubleshooting)
- [Контакты](#контакты)

## 🛠 Технологии

### Backend
*   **Framework**: Laravel 10+
*   **PHP**: 8.2
*   **Database**: MySQL 8.0
*   **Web Server**: Nginx (Alpine Linux)
*   **ORM**: Eloquent

### Frontend
*   **Library**: React 18
*   **Build Tool**: Vite 7
*   **Router**: React Router 6
*   **HTTP Client**: Axios
*   **Styling**: Tailwind CSS 3
*   **Theme**: Dark/Light mode с Context API

### Infrastructure
*   **Containerization**: Docker + Docker Compose
*   **Services**: app (PHP-FPM), db (MySQL), nginx
*   **Network**: Docker bridge network

## 📦 Требования

*   **Docker** >= 20.10
*   **Docker Compose** >= 2.0
*   **Node.js** >= 18 (для разработки фронтенда)
*   **NPM** >= 9

## 🚀 Быстрый Старт

### 1. Клонирование и Настройка

```bash
# Клонируйте репозиторий
git clone <repository-url>
cd test_work
```

### 2. Backend (через Docker)

```bash
# Сборка и запуск контейнеров (первый раз может занять 2-3 минуты)
docker compose up -d --build

# Установка зависимостей Laravel
docker compose exec app composer install

# Копирование environment файла
docker compose exec app cp .env.example .env

# Генерация ключа приложения
docker compose exec app php artisan key:generate

# Запуск миграций и сидеров
docker compose exec app php artisan migrate --seed
```

✅ API будет доступно по адресу: **`http://localhost:8000/api`**

### 3. Frontend

```bash
# Перейдите в папку frontend
cd frontend

# Установка зависимостей
npm install

# Запуск режима разработки
npm run dev
```

✅ Приложение будет доступно по адресу: **`http://localhost:5173`**

## 📁 Структура Проекта

```
test_work/
├── 📂 backend/                  # Laravel 10 API
│   ├── 📂 app/
│   │   ├── 📂 Http/
│   │   │   ├── 📂 Controllers/  # ArticleController - CRUD operations
│   │   │   └── 📂 Middleware/   # Cors - CORS headers
│   │   ├── 📂 Models/           # Article, Comment - Eloquent models
│   │   └── 📂 Providers/        # RouteServiceProvider
│   ├── 📂 config/               # Конфигурационные файлы Laravel
│   ├── 📂 database/
│   │   ├── 📂 migrations/       # create_articles_table, create_comments_table
│   │   └── 📂 seeders/          # DatabaseSeeder - тестовые данные
│   ├── 📂 routes/               # api.php - API маршруты
│   ├── 📂 public/               # index.php - точка входа
│   └── 📄 composer.json         # PHP зависимости
│
├── 📂 frontend/                 # React SPA
│   ├── 📂 src/
│   │   ├── 📂 pages/            # React компоненты страниц
│   │   │   ├── ArticleList.jsx      # Список статей
│   │   │   ├── ArticlePage.jsx      # Детальная страница + комментарии
│   │   │   └── CreateArticlePage.jsx # Форма создания статьи
│   │   ├── 📂 services/         # api.js - Axios client
│   │   ├── 📂 context/          # ThemeContext - Dark/Light mode
│   │   ├── 📄 App.jsx           # Root component + Router
│   │   └── 📄 main.jsx          # Entry point
│   └── 📄 package.json          # Node dependencies
│
├── 📂 docker/                   # Docker конфигурации
│   ├── 📂 backend/              # Dockerfile для PHP-FPM
│   └── 📂 nginx/                # Nginx конфигурация
│
├── 📄 docker-compose.yml        # Оркестрация 3 сервисов
├── 📄 README.md                 # Этот файл
├── 📄 ARCHITECTURE.md           # Архитектурная документация
└── 📄 API_DOCS.md               # Полная API документация
```

**Подробнее**: см. [ARCHITECTURE.md](./ARCHITECTURE.md)

## 🔌 API Endpoints

| Method | Endpoint | Описание |
|--------|----------|----------|
| GET | `/api/articles` | Получить список всех статей |
| GET | `/api/articles/{id}` | Получить детали статьи с комментариями |
| POST | `/api/articles` | Создать новую статью |
| POST | `/api/articles/{id}/comments` | Добавить комментарий к статье |

### Примеры Запросов

#### GET /api/articles
```bash
curl -X GET http://localhost:8000/api/articles
```

#### POST /api/articles/{id}/comments
```bash
curl -X POST http://localhost:8000/api/articles/1/comments \
  -H "Content-Type: application/json" \
  -d '{"author_name":"John","content":"Great article!"}'
```

**Полная документация**: см. [API_DOCS.md](./API_DOCS.md)

## ✨ Функционал

### Реализовано

- ✅ **Просмотр списка статей** - card-based layout с gradient дизайном
- ✅ **Детальная страница статьи** - полный текст + список комментариев
- ✅ **Создание статьи** - форма с валидацией
- ✅ **Добавление комментариев** - real-time добавление без перезагрузки
- ✅ **Dark/Light Theme** - переключение темы через Context API
- ✅ **Responsive Design** - адаптивная верстка для всех устройств
- ✅ **Fallback на Mock Data** - UI работает даже без backend
- ✅ **Loading States** - skeleton screens при загрузке
- ✅ **Error Handling** - обработка 404, валидации, сервер ошибок

### Технические Особенности

- 🔄 **RESTful API** - стандартные HTTP методы
- 🐘 **Eloquent ORM** - relationships (hasMany/belongsTo)
- 🔐 **CORS Middleware** - настроен для cross-origin запросов
- 🎨 **Glassmorphism UI** - современный дизайн
- ⚡ **Vite HMR** - мгновенная hot module replacement
- 🐳 **Docker** - изолированное окружение

## 📚 Документация

### Основная Документация

1. **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Архитектура приложения
   - Диаграммы взаимодействия (Mermaid)
   - Потоки данных
   - Принятые технические решения
   - Database schema

2. **[API_DOCS.md](./API_DOCS.md)** - API Endpoints
   - Детальное описание всех endpoints
   - Примеры запросов/ответов (curl, JavaScript)
   - Validation rules
   - Status codes

### Inline Документация

Код содержит подробные комментарии:
- **PHPDoc** в контроллерах и моделях (Laravel)
- **JSDoc** в React компонентах
- Пояснения сложной бизнес-логики
- Обоснование технических решений

## 🔧 Troubleshooting

### Backend Issues

#### Проблема: Контейнеры не запускаются
```bash
# Проверьте статус
docker compose ps

# Проверьте логи
docker compose logs app
docker compose logs nginx
docker compose logs db

# Пересоберите контейнеры
docker compose down
docker compose up -d --build
```

#### Проблема: 404 на API endpoints
```bash
# Убедитесь, что маршруты загружены
docker compose exec app php artisan route:list

# Очистите кэш
docker compose exec app php artisan config:clear
docker compose exec app php artisan cache:clear
```

#### Проблема: Database connection error
```bash
# Проверьте, что MySQL запущен
docker compose exec db mysql -u root -proot -e "SHOW DATABASES;"

# Пересоздайте базу данных
docker compose exec app php artisan migrate:fresh --seed
```

### Frontend Issues

#### Проблема: API requests failing (CORS/Network errors)
```javascript
// Проверьте baseURL в src/services/api.js
baseURL: 'http://localhost:8000/api'  // Должен быть правильный порт

// Проверьте, что backend запущен
curl http://localhost:8000/api/articles
```

#### Проблема: npm run dev не запускается
```bash
# Удалите node_modules и переустановите
rm -rf node_modules package-lock.json
npm install

# Проверьте версию Node.js
node --version  # Должна быть >= 18
```

#### Проблема: Blank page / React errors
```bash
# Откройте DevTools (F12) и проверьте Console
# Проверьте Network tab для failed requests

# Очистите кэш браузера (Ctrl+Shift+R)
```

### Common Commands

```bash
# Остановить все контейнеры
docker compose down

# Пересобрать контейнеры
docker compose up -d --build

# Посмотреть логи в реальном времени
docker compose logs -f app

# Войти в контейнер
docker compose exec app bash

# Проверить статус всех контейнеров
docker compose ps
```

## 🎯 Затраченное Время

**Backend setup**: ~20 минут  
**Frontend development**: ~25 минут  
**Docker configuration**: ~10 минут  
**Documentation**: ~30 минут  

**Итого**: ~1.5 часа

## 📝 Дополнительные Возможности

### Потенциальные Улучшения

Для production-ready приложения рекомендуется добавить:

- 🔐 **Authentication** (Laravel Sanctum + JWT)
- 📄 **Pagination** для списка статей
- 🔍 **Search** функционал
- 📸 **Image Upload** для статей
- ⚡ **Redis Caching** для производительности
- 📊 **Admin Panel** для управления контентом
- ✅ **Unit/Integration Tests** (PHPUnit, Jest)
- 🚀 **CI/CD Pipeline** (GitHub Actions)

## 🤝 Контакты

Для вопросов по проекту:
- **Разработчик**: [Your Name]
- **Email**: [your.email@example.com]
- **GitHub**: [github.com/username]

---

**Статус**: ✅ Завершено  
**Версия**: 1.0  
**Дата**: 2026-01-30

