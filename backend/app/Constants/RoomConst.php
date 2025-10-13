<?php

namespace App\Constants;

class RoomConst
{
    const AVAILABLE = 1;
    const OCCUPIED = 2;
    const MAINTENANCE = 3;

    const STATUS = [
        self::AVAILABLE => 'available',
        self::OCCUPIED => 'occupied',
        self::MAINTENANCE => 'maintenance'
    ];
}
