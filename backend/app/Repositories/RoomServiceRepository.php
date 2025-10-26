<?php

namespace App\Repositories;

use App\Models\RoomService;

class RoomServiceRepository extends BaseRepository
{
    protected function getModel(): RoomService
    {
        if(empty($this->model)) {
            $this->model = app()->make(RoomService::class);
        }

        return $this->model;
    }
}