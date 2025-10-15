<?php

namespace App\Constants;

class BookingConst
{
    const PENDING = 1;
    const CONFIRMED = 2;
    const CHECKED_IN = 3;
    const CHECKED_OUT = 4;
    const COMPLETED = 5;
    const CANCELLED = 6;

    const STATUS = [
        self::PENDING => 'pending',
        self::CONFIRMED => 'confirmed',
        self::CHECKED_IN => 'checked_in',
        self::CHECKED_OUT => 'checked_out',
        self::COMPLETED => 'completed',
        self::CANCELLED => 'cancelled',
    ];
}
