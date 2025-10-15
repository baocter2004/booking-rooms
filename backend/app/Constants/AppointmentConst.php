<?php

namespace App\Constants;

class AppointmentConst
{
    const PENDING = 1;
    const CONFIRMED = 2;
    const COMPLETED = 3;
    const CANCELLED = 4;

    const STATUS = [
        self::PENDING => 'pending',
        self::CONFIRMED => 'confirmed',
        self::COMPLETED => 'completed',
        self::CANCELLED => 'cancelled',
    ];
}