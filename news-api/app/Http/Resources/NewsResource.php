<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class NewsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array<string, mixed>
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'image' => $this->image,
            'publishAt' => $this->publishAt,
            'content' => $this->content,
            'url' => $this->url,
            'language' => $this->language,
            'source_id' => $this->source_id,
            'source_name' => $this->source->name,
            'author_id' => $this->author_id,
            'author_name' => $this->author->name,
            'category_id' => $this->category_id,
            'category_name' => $this->category->name,
        ];
    }
}
