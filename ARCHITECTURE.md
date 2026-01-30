# ARCHITECTURE.md

Архитектурная документация fullstack blog-приложения с описанием технологического стека, структуры проекта и диаграммами взаимодействия компонентов.

## Обзор

Это fullstack приложение блога, разработанное для тестового задания b2b.polis.online. Приложение состоит из:
- **Backend API** (Laravel 10 + MySQL)
- **Frontend SPA** (React + Vite)
- **Инфраструктура** (Docker Compose)

## Технологический Стек

### Backend
- **Framework**: Laravel 10.x
- **PHP**: 8.2
- **Database**: MySQL 8.0
- **Web Server**: Nginx (Alpine)
- **PHP-FPM**: для обработки PHP запросов
- **Composer**: управление зависимостями

### Frontend
- **Library**: React 18
- **Build Tool**: Vite 7
- **Router**: React Router 6
- **HTTP Client**: Axios
- **Styling**: Tailwind CSS 3
- **Package Manager**: NPM

### Infrastructure
- **Containerization**: Docker + Docker Compose
- **Services**: 3 контейнера (app, db, nginx)
- **Networking**: Docker bridge network
- **Volumes**: Persistent MySQL data

## Архитектура Взаимодействия

Приложение следует стандартной архитектуре:
- **Client Browser** (React SPA на :5173) отправляет HTTP запросы
- **Nginx** (:8000) принимает запросы и проксирует через FastCGI
- **PHP-FPM** (laravel-app) обрабатывает запросы через Laravel
- **MySQL** (laravel-db) хранит данные статей и комментариев



## Структура Проекта

### Backend - Laravel API

**app/** - Основной код приложения
- **Console/Kernel.php** - Console kernel для Artisan команд
- **Exceptions/Handler.php** - Global exception handler
- **Http/Controllers/** - API контроллеры
  - **ArticleController.php** - CRUD для статей и комментариев
  - Controller.php - Base controller
- **Http/Middleware/** - HTTP middleware
  - Authenticate.php - Auth middleware  
  - **Cors.php** - CORS headers
  - RedirectIfAuthenticated.php
- **Http/Kernel.php** - HTTP kernel
- **Models/** - Eloquent модели
  - **Article.php** - Модель статьи
  - **Comment.php** - Модель комментария
- **Providers/RouteServiceProvider.php** - Route registration

**bootstrap/** - Bootstrap files
- app.php - Application bootstrap
- cache/ - Cached configs

**config/** - Конфигурационные файлы
- app.php, auth.php, cache.php
- **cors.php** - CORS settings
- **database.php** - DB connections
- filesystems.php, logging.php, session.php, view.php

**database/** - База данных
- **migrations/** - Database схемы
  - 2024_xx_create_articles_table.php
  - 2024_xx_create_comments_table.php
- **seeders/DatabaseSeeder.php** - Тестовые данные

**public/** - Public web root
- **index.php** - Front controller

**resources/views/** - Blade templates (не используется в API-only режиме)

**routes/** - Route definitions
- **api.php** - API routes
- web.php, auth.php, console.php

**storage/** - Storage files
- app/ - Application files
- framework/ - Framework cache
- logs/ - Log files

**Конфигурационные файлы:**
- .env - Environment variables
- .env.example - Environment template
- **artisan** - Artisan CLI
- **composer.json** - PHP dependencies

---

### Frontend - React SPA

**public/** - Static assets
- vite.svg - Vite logo

**src/** - Исходный код
- **assets/** - Images, fonts
- **context/ThemeContext.jsx** - Dark/light theme provider
- **pages/** - Page components
  - **ArticleList.jsx** - Список статей
  - **ArticlePage.jsx** - Детальная страница
  - **CreateArticlePage.jsx** - Создание статьи
- **services/api.js** - Axios client для backend API
- **App.jsx** - Root component + Router
- **index.css** - Global styles
- **main.jsx** - Entry point

**Конфигурационные файлы:**
- index.html - HTML template
- **package.json** - Node dependencies
- postcss.config.js - PostCSS config
- tailwind.config.js - Tailwind config
- vite.config.js - Vite config

---

### Docker Infrastructure

**docker/backend/** - Backend контейнер
- Dockerfile - PHP-FPM 8.2 image

**docker/nginx/conf.d/** - Nginx конфигурация
- app.conf - Nginx server config

**docker-compose.yml** - Оркестрация 3 сервисов (app, db, nginx)

---

### Документация

- **README.md** - Project documentation
- **ARCHITECTURE.md** - Этот файл
- **API_DOCS.md** - API documentation

## Поток Данных

### Получение Списка Статей

1. **User** открывает главную страницу
2. **React** компонент делает запрос через `api.get('/articles')`
3. **Axios** отправляет GET запрос на `http://localhost:8000/api/articles`
4. **Nginx** принимает запрос и передает через FastCGI
5. **Laravel** обрабатывает через `ArticleController@index`
6. **MySQL** выполняет `SELECT * FROM articles`
7. **Laravel** формирует JSON ответ
8. **React** получает данные и отображает список статей

### Добавление Комментария

1. **User** заполняет форму комментария и нажимает Submit
2. **React** отправляет `api.post('/articles/1/comments', data)`
3. **Laravel** валидирует данные (author_name, content)
4. **MySQL** выполняет `INSERT INTO comments`
5. **Laravel** возвращает HTTP 201 + созданный комментарий
6. **React** добавляет комментарий в UI без перезагрузки

## Backend Архитектура

### MVC Pattern

Laravel следует паттерну MVC:

- **Model** (`app/Models`): Eloquent модели для работы с БД
- **View**: не используется (API-only)
- **Controller** (`app/Http/Controllers`): бизнес-логика

### Request Lifecycle

1. **Entry Point**: `public/index.php`
2. **Bootstrap**: `bootstrap/app.php` создает Application
3. **Kernel**: `app/Http/Kernel.php` регистрирует middleware
4. **Router**: `routes/api.php` определяет endpoints
5. **Controller**: обрабатывает запрос
6. **Model**: взаимодействует с БД через Eloquent
7. **Response**: JSON возвращается клиенту

### Database Schema

**Таблица: articles**
- `id` (PK) - уникальный идентификатор
- `title` - заголовок статьи
- `content` - текст статьи
- `created_at`, `updated_at` - временные метки

**Таблица: comments**
- `id` (PK) - уникальный идентификатор
- `article_id` (FK) - связь с таблицей articles
- `author_name` - имя автора комментария
- `content` - текст комментария
- `created_at`, `updated_at` - временные метки

**Связи:**
- Article `hasMany` Comments (один ко многим)

### API Endpoints

| Method | Endpoint | Controller Method | Описание |
|--------|----------|-------------------|----------|
| GET | `/api/articles` | `ArticleController@index` | Список статей |
| GET | `/api/articles/{id}` | `ArticleController@show` | Детали статьи |
| POST | `/api/articles` | `ArticleController@store` | Создать статью |
| POST | `/api/articles/{id}/comments` | `ArticleController@storeComment` | Добавить комментарий |

## Frontend Архитектура

### Component Hierarchy

**Иерархия компонентов:**

```
main.jsx (entry point)
  └─ App.jsx (root component)
      └─ ThemeProvider (dark/light mode)
          └─ BrowserRouter (routing)
              └─ Routes
                  ├─ ArticleList (/) → api.get('/articles')
                  ├─ ArticlePage (/:id) → api.get('/articles/:id')
                  │                     → api.post('/articles/:id/comments')
                  └─ CreateArticlePage (/create) → api.post('/articles')
```

### Состояние Приложения

- **Local State**: `useState` в каждом компоненте
- **Theme**: Context API (`ThemeContext`)
- **Routing**: React Router 6
- **No Global State**: простое приложение не требует Redux/Recoil

### API Integration Layer

Все API запросы централизованы в `services/api.js`:

\`\`\`javascript
// Axios instance с baseURL
const api = axios.create({
    baseURL: 'http://localhost:8000/api'
});
\`\`\`

**Преимущества**:
- Единая точка конфигурации
- Легко добавить interceptors
- Простота тестирования

### Fallback Strategy

При ошибке API компоненты показывают mock данные:

\`\`\`javascript
.catch(error => {
    // Fallback на mock data для демонстрации UI
    setArticles([...mockData]);
});
\`\`\`

**Обоснование**: позволяет демонстрировать UI даже без работающего backend.

## Docker Архитектура

### Services

1. **app** (`laravel-app`):
   - Image: custom PHP 8.2-FPM
   - Роль: выполнение PHP кода
   - Порт: 9000 (internal)

2. **db** (`laravel-db`):
   - Image: MySQL 8.0
   - Роль: хранение данных
   - Volume: persistent data
   - Порт: 3306 (internal)

3. **nginx** (`laravel-nginx`):
   - Image: nginx:alpine
   - Роль: web server, reverse proxy
   - Порт: 8000 (exposed)

### Network Flow

\`\`\`
User Browser :5173
      ↓
React Dev Server (Vite)
      ↓
HTTP Request → :8000
      ↓
Nginx Container
      ↓
FastCGI → :9000
      ↓
PHP-FPM Container
      ↓
MySQL :3306
      ↓
Database Container
\`\`\`

## Принятые Решения

### 1. Почему Laravel 10?

- ✅ Стабильная LTS версия
- ✅ Отличная документация
- ✅ Eloquent ORM упрощает работу с БД
- ✅ Built-in API features

### 2. Почему Vite?

- ✅ Очень быстрый HMR
- ✅ Native ESM support
- ✅ Меньше конфигурации чем Webpack

### 3. Почему Docker?

- ✅ Изолированное окружение
- ✅ Легко воспроизвести на любой машине
- ✅ Не нужно устанавливать PHP/MySQL локально

### 4. Почему No Authentication?

- ⚠️ Тестовое задание не требует auth
- ⚠️ Упрощает демонстрацию функционала
- 💡 В продакшене нужно добавить Laravel Sanctum

## Масштабируемость

### Потенциальные Улучшения

1. **Authentication**: Laravel Sanctum + JWT
2. **Caching**: Redis для кэширования статей
3. **Pagination**: для больших списков статей
4. **Search**: полнотекстовый поиск по статьям
5. **File Upload**: изображения для статей
6. **Admin Panel**: управление контентом
7. **Rate Limiting**: защита от спама
8. **Testing**: PHPUnit + Jest тесты

### Горизонтальное Масштабирование

Для высоких нагрузок можно использовать:
- **Load Balancer** распределяет запросы между несколькими PHP-FPM экземплярами
- **Multiple PHP-FPM Containers** (горизонтальное масштабирование backend)
- **MySQL Master-Replica** для чтения и записи

## Производительность

### Backend Optimization

- Eloquent `with()` для предзагрузки relationships
- Database indexing на `article_id` в comments
- Nginx caching для статических файлов

### Frontend Optimization

- Code splitting через React.lazy (если нужно)
- Image optimization (если добавятся картинки)
- Vite production build минифицирует код

## Безопасность

### Текущие Меры

- ✅ CSRF protection (Laravel)
- ✅ SQL injection protection (Eloquent)
- ✅ XSS protection (React auto-escaping)
- ✅ Валидация входных данных

### Рекомендации

- ⚠️ Добавить аутентификацию
- ⚠️ Rate limiting
- ⚠️ HTTPS в продакшене
- ⚠️ Environment variables для секретов

## Заключение

Приложение демонстрирует современный подход к fullstack разработке с четким разделением frontend и backend, RESTful API, containerization и best practices для обеих частей стека.
