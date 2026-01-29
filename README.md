# Fullstack Blog Application

Тестовое задание для b2b.polis.online. Простой блог с комментариями.

## Технологии

*   **Backend**: Laravel 10+, MySQL 8
*   **Frontend**: React (Vite), TailwindCSS
*   **Infrastructure**: Docker Compose

## Требования

*   Docker & Docker Compose
*   Node.js & NPM (для локальной разработки фронтенда, если не через Docker)

## Запуск проекта

### 1. Backend (через Docker)

В корневой папке проекта выполните:

```bash
# Сборка и запуск контейнеров
docker compose up -d --build

# Установка зависимостей Laravel
docker compose exec app composer install

# Генерация ключа приложения
docker compose exec app php artisan key:generate

# Запуск миграций и сидеров
docker compose exec app php artisan migrate --seed
```

API будет доступно по адресу: `http://localhost:8000/api`

### 2. Frontend

В папке `frontend`:

```bash
cd frontend

# Установка зависимостей
npm install

# Запуск режима разработки
npm run dev
```

Приложение будет доступно по адресу: `http://localhost:5173`

## Функционал

*   **Статьи**: Просмотр списка, просмотр детальной страницы, создание статьи.
*   **Комментарии**: Просмотр комментариев к статье, добавление нового комментария.

## API Эндпоинты

*   `GET /api/articles` - Список статей
*   `GET /api/articles/{id}` - Детальная информация статьи
*   `POST /api/articles` - Создание статьи (`title`, `content`)
*   `POST /api/articles/{id}/comments` - Добавление комментария (`author_name`, `content`)

## Затраченное время

Примерно 30-45 минут на настройку окружения и написание кода.
