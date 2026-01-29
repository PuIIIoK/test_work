<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Comment;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    // GET /api/articles
    public function index()
    {
        return Article::latest()->get();
    }

    // GET /api/articles/{id}
    public function show($id)
    {
        return Article::with('comments')->findOrFail($id);
    }

    // POST /api/articles
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        return Article::create($validated);
    }

    // POST /api/articles/{id}/comments
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
