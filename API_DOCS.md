# API Documentation

Полная документация REST API для blog-приложения.

## Base URL

\`\`\`
http://localhost:8000/api
\`\`\`

## Content Type

Все запросы и ответы используют `application/json`.

---

## Endpoints

### 1. Получить Список Статей

Возвращает все статьи, отсортированные от новых к старым.

#### Request

\`\`\`http
GET /api/articles
\`\`\`

#### Response

**Status:** `200 OK`

\`\`\`json
[
  {
    "id": 1,
    "title": "Getting Started with Laravel",
    "content": "Laravel is a web application framework...",
    "created_at": "2026-01-30T10:08:56.000000Z",
    "updated_at": "2026-01-30T10:08:56.000000Z"
  },
  {
    "id": 2,
    "title": "React Integration",
    "content": "Integrating React with Laravel is seamless...",
    "created_at": "2026-01-30T10:08:56.000000Z",
    "updated_at": "2026-01-30T10:08:56.000000Z"
  }
]
\`\`\`

#### Example (curl)

\`\`\`bash
curl -X GET http://localhost:8000/api/articles \\
  -H "Content-Type: application/json"
\`\`\`

#### Example (JavaScript)

\`\`\`javascript
import api from './services/api';

const fetchArticles = async () => {
  const response = await api.get('/articles');
  console.log(response.data);
};
\`\`\`

---

### 2. Получить Детали Статьи

Возвращает статью с ID и все связанные комментарии.

#### Request

\`\`\`http
GET /api/articles/{id}
\`\`\`

**Path Parameters:**
- `id` (integer, required) - ID статьи

#### Response

**Status:** `200 OK`

\`\`\`json
{
  "id": 1,
  "title": "Getting Started with Laravel",
  "content": "Laravel is a web application framework with expressive, elegant syntax...",
  "created_at": "2026-01-30T10:08:56.000000Z",
  "updated_at": "2026-01-30T10:08:56.000000Z",
  "comments": [
    {
      "id": 1,
      "article_id": 1,
      "author_name": "John Doe",
      "content": "Great article! Very helpful.",
      "created_at": "2026-01-30T10:15:12.000000Z",
      "updated_at": "2026-01-30T10:15:12.000000Z"
    },
    {
      "id": 2,
      "article_id": 1,
      "author_name": "Jane Smith",
      "content": "Thanks for sharing this!",
      "created_at": "2026-01-30T11:22:45.000000Z",
      "updated_at": "2026-01-30T11:22:45.000000Z"
    }
  ]
}
\`\`\`

#### Error Response

**Status:** `404 Not Found`

\`\`\`json
{
  "message": "No query results for model [App\\Models\\Article] 999"
}
\`\`\`

#### Example (curl)

\`\`\`bash
curl -X GET http://localhost:8000/api/articles/1 \\
  -H "Content-Type: application/json"
\`\`\`

#### Example (JavaScript)

\`\`\`javascript
import api from './services/api';

const fetchArticle = async (id) => {
  try {
    const response = await api.get(`/articles/${id}`);
    console.log(response.data);
  } catch (error) {
    console.error('Article not found:', error);
  }
};
\`\`\`

---

### 3. Создать Новую Статью

Создает новую статью в блоге.

#### Request

\`\`\`http
POST /api/articles
\`\`\`

**Request Body:**

\`\`\`json
{
  "title": "My New Article",
  "content": "This is the content of my new article..."
}
\`\`\`

**Body Parameters:**
- `title` (string, required) - Заголовок статьи (макс. 255 символов)
- `content` (string, required) - Текст статьи

#### Response

**Status:** `201 Created`

\`\`\`json
{
  "id": 4,
  "title": "My New Article",
  "content": "This is the content of my new article...",
  "created_at": "2026-01-30T14:30:00.000000Z",
  "updated_at": "2026-01-30T14:30:00.000000Z"
}
\`\`\`

#### Validation Error Response

**Status:** `422 Unprocessable Entity`

\`\`\`json
{
  "message": "The title field is required. (and 1 more error)",
  "errors": {
    "title": [
      "The title field is required."
    ],
    "content": [
      "The content field is required."
    ]
  }
}
\`\`\`

#### Example (curl)

\`\`\`bash
curl -X POST http://localhost:8000/api/articles \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "My New Article",
    "content": "This is the content..."
  }'
\`\`\`

#### Example (JavaScript)

\`\`\`javascript
import api from './services/api';

const createArticle = async (data) => {
  try {
    const response = await api.post('/articles', {
      title: data.title,
      content: data.content
    });
    console.log('Article created:', response.data);
  } catch (error) {
    console.error('Validation error:', error.response.data.errors);
  }
};
\`\`\`

---

### 4. Добавить Комментарий к Статье

Добавляет новый комментарий к существующей статье.

#### Request

\`\`\`http
POST /api/articles/{id}/comments
\`\`\`

**Path Parameters:**
- `id` (integer, required) - ID статьи

**Request Body:**

\`\`\`json
{
  "author_name": "John Doe",
  "content": "Great article, thanks for sharing!"
}
\`\`\`

**Body Parameters:**
- `author_name` (string, required) - Имя автора комментария (макс. 255 символов)
- `content` (string, required) - Текст комментария

#### Response

**Status:** `201 Created`

\`\`\`json
{
  "id": 5,
  "article_id": 1,
  "author_name": "John Doe",
  "content": "Great article, thanks for sharing!",
  "created_at": "2026-01-30T15:45:23.000000Z",
  "updated_at": "2026-01-30T15:45:23.000000Z"
}
\`\`\`

#### Error Responses

**Article Not Found - Status:** `404 Not Found`

\`\`\`json
{
  "message": "No query results for model [App\\Models\\Article] 999"
}
\`\`\`

**Validation Error - Status:** `422 Unprocessable Entity`

\`\`\`json
{
  "message": "The author name field is required. (and 1 more error)",
  "errors": {
    "author_name": [
      "The author name field is required."
    ],
    "content": [
      "The content field is required."
    ]
  }
}
\`\`\`

#### Example (curl)

\`\`\`bash
curl -X POST http://localhost:8000/api/articles/1/comments \\
  -H "Content-Type: application/json" \\
  -d '{
    "author_name": "John Doe",
    "content": "Great article!"
  }'
\`\`\`

#### Example (JavaScript)

\`\`\`javascript
import api from './services/api';

const addComment = async (articleId, data) => {
  try {
    const response = await api.post(`/articles/${articleId}/comments`, {
      author_name: data.authorName,
      content: data.content
    });
    console.log('Comment added:', response.data);
  } catch (error) {
    if (error.response.status === 404) {
      console.error('Article not found');
    } else if (error.response.status === 422) {
      console.error('Validation error:', error.response.data.errors);
    }
  }
};
\`\`\`

---

## HTTP Status Codes

| Code | Значение | Когда возвращается |
|------|----------|-------------------|
| 200 | OK | Успешный GET запрос |
| 201 | Created | Успешное создание ресурса (POST) |
| 404 | Not Found | Ресурс не найден |
| 422 | Unprocessable Entity | Ошибка валидации входных данных |
| 500 | Internal Server Error | Ошибка сервера |

---

## Validation Rules

### Статья (Article)

| Поле | Тип | Обязательно | Правила |
|------|-----|-------------|---------|
| title | string | Да | Макс. 255 символов |
| content | string | Да | Любая длина |

### Комментарий (Comment)

| Поле | Тип | Обязательно | Правила |
|------|-----|-------------|---------|
| author_name | string | Да | Макс. 255 символов |
| content | string | Да | Любая длина |

---

## CORS Settings

API настроено на прием запросов от фронтенда:

```php
// Allowed Origins
'*' // В продакшене ограничить конкретными доменами

// Allowed Methods  
GET, POST, PUT, DELETE, OPTIONS

// Allowed Headers
Content-Type, Authorization, X-Requested-With
```

---

## Rate Limiting

⚠️ **Примечание:** В текущей версии rate limiting не настроен.

**Рекомендация для продакшена:**
```php
// В routes/api.php
Route::middleware('throttle:60,1')->group(function () {
    // 60 запросов в минуту
});
```

---

## Authentication

⚠️ **Примечание:** В текущей версии аутентификация не реализована.

**Для продакшена рекомендуется:**
- Laravel Sanctum для token-based auth
- Или Laravel Passport для OAuth2

**Пример с Sanctum:**
```javascript
// После логина получаем token
const token = response.data.token;

// Добавляем в каждый запрос
api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
```

---

## Examples Collection

### Полный Workflow: Создание Статьи и Добавление Комментария

```javascript
import api from './services/api';

// 1. Создаем статью
const newArticle = await api.post('/articles', {
  title: 'Understanding Docker',
  content: 'Docker allows you to package applications...'
});

const articleId = newArticle.data.id;
console.log('Created article:', articleId);

// 2. Добавляем комментарий
const newComment = await api.post(`/articles/${articleId}/comments`, {
  author_name: 'Developer01',
  content: 'Very useful guide!'
});

console.log('Added comment:', newComment.data);

// 3. Получаем статью с комментариями
const article = await api.get(`/articles/${articleId}`);
console.log('Article with comments:', article.data);
```

### Обработка Ошибок

```javascript
import api from './services/api';

const safeApiCall = async () => {
  try {
    const response = await api.get('/articles/999');
    return response.data;
  } catch (error) {
    if (error.response) {
      // Сервер ответил с ошибкой
      switch (error.response.status) {
        case 404:
          console.error('Resource not found');
          break;
        case 422:
          console.error('Validation errors:', error.response.data.errors);
          break;
        case 500:
          console.error('Server error');
          break;
        default:
          console.error('Unknown error:', error.response.status);
      }
    } else if (error.request) {
      // Запрос был отправлен, но ответа нет
      console.error('No response from server');
    } else {
      // Ошибка при настройке запроса
      console.error('Request setup error:', error.message);
    }
  }
};
```

---

## Testing API

### Using curl

```bash
# Получить все статьи
curl -X GET http://localhost:8000/api/articles

# Получить статью #1
curl -X GET http://localhost:8000/api/articles/1

# Создать статью
curl -X POST http://localhost:8000/api/articles \\
  -H "Content-Type: application/json" \\
  -d '{"title":"Test","content":"Test content"}'

# Добавить комментарий
curl -X POST http://localhost:8000/api/articles/1/comments \\
  -H "Content-Type: application/json" \\
  -d '{"author_name":"Test User","content":"Nice!"}'
```

### Using Postman

1. Import collection:
   - Method: GET
   - URL: `http://localhost:8000/api/articles`
   - Headers: `Content-Type: application/json`

2. Создайте запросы для всех endpoints
3. Используйте Environment variables для baseURL

### Using Browser DevTools

```javascript
// В консоли браузера на странице http://localhost:5173
fetch('http://localhost:8000/api/articles')
  .then(r => r.json())
  .then(data => console.table(data));
```

---

## Database Schema

**Таблица: articles**

| Column | Type | Null | Default | Extra |
|--------|------|------|---------|-------|
| id | BIGINT UNSIGNED | NO | NULL | AUTO_INCREMENT |
| title | VARCHAR(255) | NO | NULL | |
| content | TEXT | NO | NULL | |
| created_at | TIMESTAMP | YES | NULL | |
| updated_at | TIMESTAMP | YES | NULL | |

**Таблица: comments**

| Column | Type | Null | Default | Extra |
|--------|------|------|---------|-------|
| id | BIGINT UNSIGNED | NO | NULL | AUTO_INCREMENT |
| article_id | BIGINT UNSIGNED | NO | NULL | FOREIGN KEY |
| author_name | VARCHAR(255) | NO | NULL | |
| content | TEXT | NO | NULL | |
| created_at | TIMESTAMP | YES | NULL | |
| updated_at | TIMESTAMP | YES | NULL | |

**Indexes:**
- PRIMARY KEY: `id` (на обеих таблицах)
- FOREIGN KEY: `article_id` REFERENCES `articles(id)`

---

## Future Enhancements

### Планируемые Endpoints

```
PUT    /api/articles/{id}           # Обновить статью
DELETE /api/articles/{id}           # Удалить статью
DELETE /api/comments/{id}           # Удалить комментарий
GET    /api/articles?page=1         # Пагинация
GET    /api/articles?search=query   # Поиск
POST   /api/auth/register           # Регистрация
POST   /api/auth/login              # Вход
POST   /api/auth/logout             # Выход
```

### Pagination Example

```json
{
  "data": [...],
  "links": {
    "first": "http://localhost:8000/api/articles?page=1",
    "last": "http://localhost:8000/api/articles?page=5",
    "prev": null,
    "next": "http://localhost:8000/api/articles?page=2"
  },
  "meta": {
    "current_page": 1,
    "from": 1,
    "last_page": 5,
    "per_page": 15,
    "to": 15,
    "total": 73
  }
}
```

---

## Support

Для вопросов и предложений:
- **Email**: support@example.com
- **GitHub**: [repository-link]
- **Docs**: [documentation-link]
