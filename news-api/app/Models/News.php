<?php

namespace App\Models;

use App\Models\Author as ModelsAuthor;
use App\Models\Source as ModelsSource;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use PharIo\Manifest\Author;
use PHPUnit\TextUI\Configuration\Source;

class News extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'image',
        'publishAt',
        'content',
        'url',
        'language',
        'source_id',
        'author_id',
        'category_id',
    ];

    public function source()
    {
        return $this->belongsTo(ModelsSource::class);
    }

    public function author()
    {
        return $this->belongsTo(ModelsAuthor::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
