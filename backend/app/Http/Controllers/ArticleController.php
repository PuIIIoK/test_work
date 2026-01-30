<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Comment;
use Illuminate\Http\Request;

/**
 * API контроллер для управления статьями блога
 * 
 * Обрабатывает CRUD операции для статей и комментариев к ним
 */
class ArticleController extends Controller
{
    /**
     * Получить список всех статей
     * 
     * Возвращает статьи в порядке от новых к старым
     * 
     * @return \Illuminate\Database\Eloquent\Collection
     * @response 200 [{"id": 1, "title": "...", "content": "...", "created_at": "..."}]
     */
    public function index()
    {
        return Article::latest()->get();
    }

    /**
     * Получить детальную информацию о статье
     * 
     * Включает статью со всеми связанными комментариями
     * 
     * @param int $id ID статьи
     * @return \App\Models\Article
     * @throws \Illuminate\Database\Eloquent\ModelNotFoundException если статья не найдена
     * @response 200 {"id": 1, "title": "...", "comments": [...]}
     */
    public function show($id)
    {
        return Article::with('comments')->findOrFail($id);
    }

    /**
     * Создать новую статью
     * 
     * @param \Illuminate\Http\Request $request
     * @bodyParam title string required Заголовок статьи (макс. 255 символов)
     * @bodyParam content string required Содержимое статьи
     * @return \App\Models\Article
     * @response 201 {"id": 1, "title": "...", "content": "...", "created_at": "..."}
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        return Article::create($validated);
    }

    /**
     * Добавить комментарий к статье
     * 
     * @param \Illuminate\Http\Request $request
     * @param int $id ID статьи
     * @bodyParam author_name string required Имя автора комментария (макс. 255 символов)
     * @bodyParam content string required Текст комментария
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Database\Eloquent\ModelNotFoundException если статья не найдена
     * @response 201 {"id": 1, "article_id": 1, "author_name": "...", "content": "...", "created_at": "..."}
     */
    public function storeComment(Request $request, $id)
    {
        $article = Article::findOrFail($id);

        $validated = $request->validate([
            'author_name' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        $comment = $article->comments()->create($validated);

        return response()->json($comment, 201);
    }
}
