<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Article;
use App\Models\Comment;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $articles = [
            [
                'title' => 'Getting Started with Laravel',
                'content' => 'Laravel is a web application framework with expressive, elegant syntax...'
            ],
            [
                'title' => 'React Integration',
                'content' => 'Integrating React with Laravel is seamless using tools like Inertia or standard API calls...'
            ],
            [
                'title' => 'Docker for Development',
                'content' => 'Docker containers allow you to package up an application with all of the parts it needs...'
            ]
        ];

        foreach ($articles as $data) {
            $article = Article::create($data);
            
            // Add some dummy comments
            Comment::create([
                'article_id' => $article->id,
                'author_name' => 'Test User',
                'content' => 'Great article! Very helpful.'
            ]);
        }
    }
}
