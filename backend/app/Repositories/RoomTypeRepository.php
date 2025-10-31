<?php

namespace App\Repositories;

use App\Models\RoomType;

class RoomTypeRepository extends BaseRepository
{
    protected function getModel(): RoomType
    {
        if(empty($this->model)) {
            $this->model = app()->make(RoomType::class);
        }
        return $this->model;
    }
}