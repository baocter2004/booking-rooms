<?php

namespace App\Constants;

class AppointmentConst
{
    const PENDING = 1;
    const CONFIRMED = 2;
    const CANCELLED = 3;

    const STATUS = [
        self::PENDING => 'pending',
        self::CONFIRMED => 'confirmed',
        self::CANCELLED => 'cancelled',
    ];
}