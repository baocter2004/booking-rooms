<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Models\Hotel;

class HotelRepository extends BaseRepository
{
    protected function getModel(): Hotel
    {
         if (empty($this->model)) {
            $this->model = app()->make(Hotel::class);
        }

        return $this->model;
    }
}