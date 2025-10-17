<?php

declare(strict_types = 1);

namespace App\Http\Resources;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

abstract class BaseResourceCollection extends ResourceCollection
{
    abstract protected function getResourceName(): string;

     /**
     * Transform the resource collection into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'data' => $this->collection->map(function ($item) {
                $resource = $this->getResourceName();
                return new $resource($item);
            })
        ];
    }
}