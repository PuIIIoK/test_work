<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Модель комментария к статье
 * 
 * Представляет отзыв пользователя на статью блога.
 * Каждый комментарий принадлежит одной статье.
 * 
 * @property int $id
 * @property int $article_id ID родительской статьи
 * @property string $author_name Имя автора комментария
 * @property string $content Текст комментария
 * @property \Illuminate\Support\Carbon $created_at
 * @property \Illuminate\Support\Carbon $updated_at
 */
class Comment extends Model
{
    use HasFactory;

    /**
     * Атрибуты, доступные для массового заполнения
     * 
     * @var array<string>
     */
    protected $fillable = ['article_id', 'author_name', 'content'];

    /**
     * Связь "многие к одному" со статьей
     * 
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function article()
    {
        return $this->belongsTo(Article::class);
    }
}
