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

## Архитектурная Диаграмма

\`\`\`mermaid
graph TB
    subgraph "Client Browser"
        A[React SPA<br/>:5173]
    end
    
    subgraph "Docker Network"
        B[Nginx<br/>:8000]
        C[PHP-FPM<br/>laravel-app]
        D[(MySQL<br/>laravel-db)]
    end
    
    A -->|HTTP Requests| B
    B -->|FastCGI| C
    C -->|Eloquent ORM| D
    D -->|Query Results| C
    C -->|JSON Response| B
    B -->|API Response| A
    
    style A fill:#61DAFB,stroke:#333,stroke-width:2px
    style B fill:#269539,stroke:#333,stroke-width:2px
    style C fill:#777BB4,stroke:#333,stroke-width:2px
    style D fill:#4479A1,stroke:#333,stroke-width:2px
\`\`\`

## Структура Проекта

\`\`\`
test_work/
├── backend/                     # Laravel API
│   ├── app/
│   │   ├── Console/            # Artisan команды
│   │   │   └── Kernel.php      # Console kernel
│   │   ├── Exceptions/         # Обработка исключений
│   │   │   └── Handler.php     # Global exception handler
│   │   ├── Http/
│   │   │   ├── Controllers/    # API контроллеры
│   │   │   │   ├── ArticleController.php  # CRUD для статей и комментариев
│   │   │   │   └── Controller.php         # Base controller
│   │   │   ├── Middleware/     # HTTP middleware
│   │   │   │   ├── Authenticate.php       # Auth middleware
│   │   │   │   ├── Cors.php               # CORS headers
│   │   │   │   └── RedirectIfAuthenticated.php
│   │   │   └── Kernel.php      # HTTP kernel
│   │   ├── Models/             # Eloquent модели
│   │   │   ├── Article.php     # Модель статьи
│   │   │   └── Comment.php     # Модель комментария
│   │   └── Providers/          # Service providers
│   │       └── RouteServiceProvider.php   # Route registration
│   ├── bootstrap/              # Bootstrap files
│   │   ├── app.php             # Application bootstrap
│   │   └── cache/              # Cached configs
│   ├── config/                 # Конфигурации
│   │   ├── app.php             # App configuration
│   │   ├── auth.php            # Authentication
│   │   ├── cache.php           # Cache stores
│   │   ├── cors.php            # CORS settings
│   │   ├── database.php        # DB connections
│   │   ├── filesystems.php     # File storage
│   │   ├── logging.php         # Log channels
│   │   ├── session.php         # Session config
│   │   └── view.php            # View paths
│   ├── database/
│   │   ├── migrations/         # Database схемы
│   │   │   ├── 2024_xx_create_articles_table.php
│   │   │   └── 2024_xx_create_comments_table.php
│   │   └── seeders/            # Тестовые данные
│   │       └── DatabaseSeeder.php
│   ├── public/                 # Public web root
│   │   └── index.php           # Front controller
│   ├── resources/              # Resources
│   │   └── views/              # Blade templates (не используется)
│   ├── routes/                 # Route definitions
│   │   ├── api.php             # API routes
│   │   ├── auth.php            # Auth routes
│   │   ├── console.php         # Console routes
│   │   └── web.php             # Web routes
│   ├── storage/                # Storage files
│   │   ├── app/                # Application files
│   │   ├── framework/          # Framework cache
│   │   └── logs/               # Log files
│   ├── .env                    # Environment variables
│   ├── .env.example            # Environment template
│   ├── artisan                 # Artisan CLI
│   └── composer.json           # PHP dependencies
│
├── frontend/                    # React SPA
│   ├── public/                 # Static assets
│   │   └── vite.svg            # Vite logo
│   ├── src/
│   │   ├── assets/             # Images, fonts
│   │   ├── context/            # React contexts
│   │   │   └── ThemeContext.jsx  # Dark/light theme
│   │   ├── pages/              # Page components
│   │   │   ├── ArticleList.jsx      # Список статей
│   │   │   ├── ArticlePage.jsx      # Детальная страница
│   │   │   └── CreateArticlePage.jsx # Создание статьи
│   │   ├── services/           # API layer
│   │   │   └── api.js          # Axios client
│   │   ├── App.jsx             # Root component
│   │   ├── index.css           # Global styles
│   │   └── main.jsx            # Entry point
│   ├── index.html              # HTML template
│   ├── package.json            # Node dependencies
│   ├── postcss.config.js       # PostCSS config
│   ├── tailwind.config.js      # Tailwind config (в index.html)
│   └── vite.config.js          # Vite config
│
├── docker/                      # Docker конфигурации
│   ├── backend/
│   │   └── Dockerfile          # PHP-FPM image
│   └── nginx/
│       └── conf.d/
│           └── app.conf        # Nginx server config
│
├── docker-compose.yml           # Docker orchestration
└── README.md                    # Project documentation
\`\`\`

## Поток Данных

### Получение Списка Статей

\`\`\`mermaid
sequenceDiagram
    participant User
    participant React
    participant Axios
    participant Nginx
    participant Laravel
    participant MySQL

    User->>React: Открывает главную страницу
    React->>Axios: api.get('/articles')
    Axios->>Nginx: GET http://localhost:8000/api/articles
    Nginx->>Laravel: FastCGI request
    Laravel->>MySQL: SELECT * FROM articles
    MySQL-->>Laravel: Article rows
    Laravel-->>Nginx: JSON response
    Nginx-->>Axios: HTTP 200 + JSON
    Axios-->>React: response.data
    React-->>User: Отображает список статей
\`\`\`

### Добавление Комментария

\`\`\`mermaid
sequenceDiagram
    participant User
    participant React
    participant Axios
    participant Laravel
    participant MySQL

    User->>React: Заполняет форму комментария
    User->>React: Нажимает "Submit"
    React->>Axios: api.post('/articles/1/comments', data)
    Axios->>Laravel: POST /api/articles/1/comments
    Laravel->>Laravel: Валидация данных
    Laravel->>MySQL: INSERT INTO comments
    MySQL-->>Laravel: new comment ID
    Laravel-->>Axios: HTTP 201 + comment JSON
    Axios-->>React: response.data
    React-->>User: Добавляет комментарий в UI
\`\`\`

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

\`\`\`mermaid
erDiagram
    ARTICLES ||--o{ COMMENTS : "has many"
    
    ARTICLES {
        int id PK
        string title
        text content
        timestamp created_at
        timestamp updated_at
    }
    
    COMMENTS {
        int id PK
        int article_id FK
        string author_name
        text content
        timestamp created_at
        timestamp updated_at
    }
\`\`\`

### API Endpoints

| Method | Endpoint | Controller Method | Описание |
|--------|----------|-------------------|----------|
| GET | `/api/articles` | `ArticleController@index` | Список статей |
| GET | `/api/articles/{id}` | `ArticleController@show` | Детали статьи |
| POST | `/api/articles` | `ArticleController@store` | Создать статью |
| POST | `/api/articles/{id}/comments` | `ArticleController@storeComment` | Добавить комментарий |

## Frontend Архитектура

### Component Hierarchy

\`\`\`mermaid
graph TD
    A[main.jsx] --> B[App.jsx]
    B --> C[ThemeProvider]
    C --> D[BrowserRouter]
    D --> E[Routes]
    E --> F[ArticleList]
    E --> G[ArticlePage]
    E --> H[CreateArticlePage]
    
    F --> I[api.get /articles]
    G --> J[api.get /articles/:id]
    G --> K[api.post /articles/:id/comments]
    H --> L[api.post /articles]
    
    style B fill:#61DAFB
    style C fill:#FFD700
    style F fill:#90EE90
    style G fill:#90EE90
    style H fill:#90EE90
\`\`\`

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

\`\`\`mermaid
graph LR
    A[Load Balancer] --> B[PHP-FPM 1]
    A --> C[PHP-FPM 2]
    A --> D[PHP-FPM 3]
    B --> E[(MySQL Master)]
    C --> E
    D --> E
    E --> F[(MySQL Replica)]
    
    style A fill:#FF6B6B
    style E fill:#4ECDC4
\`\`\`

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
