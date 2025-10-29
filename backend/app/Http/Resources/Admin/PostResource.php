<?php 

namespace App\Http\Resources\Admin;

use App\Http\Resources\BaseResource;
use Illuminate\Http\Request;

class PostResource extends BaseResource 
{
    protected function toList(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'auth_id' => $this->auth_id,
            'post_category_id' => $this->post_category_id,
            'excerpt' => $this->excerpt,
            'content' => $this->content,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at
        ];
    }

    protected function toDetail(Request $request): array {
        return $this->toList($request);
    }
}