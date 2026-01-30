import axios from 'axios';

/**
 * Axios клиент для взаимодействия с backend API
 * 
 * Настроен на базовый URL Laravel API (http://localhost:8000/api)
 * Все запросы автоматически включают заголовок Content-Type: application/json
 * 
 * @example
 * // Получить все статьи
 * api.get('/articles').then(res => console.log(res.data))
 * 
 * // Создать комментарий
 * api.post('/articles/1/comments', { author_name: 'John', content: 'Great!' })
 */
const api = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;

