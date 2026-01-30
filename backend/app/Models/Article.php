<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Модель статьи блога
 * 
 * Представляет основной контент блога с заголовком и текстом.
 * Каждая статья может иметь множество связанных комментариев.
 * 
 * @property int $id
 * @property string $title Заголовок статьи
 * @property string $content Полный текст статьи
 * @property \Illuminate\Support\Carbon $created_at
 * @property \Illuminate\Support\Carbon $updated_at
 */
class Article extends Model
{
    use HasFactory;

    /**
     * Атрибуты, доступные для массового заполнения
     * 
     * @var array<string>
     */
    protected $fillable = ['title', 'content'];

    /**
     * Связь "один ко многим" с комментариями
     * 
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
}
