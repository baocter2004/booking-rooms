<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Models\Room;
use App\Repositories\BaseRepository;

class RoomRepository extends BaseRepository
{
    protected function getModel(): Room
    {
        if(empty($this->model)) {
            $this->model = app()->make(Room::class);
        }

        return $this->model;
    }
}