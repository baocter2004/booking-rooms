<?php

namespace App\Enums;

class StaffConst
{
    const ACTIVE = 1;
    const UNACTIVE = 2;

    const STATUS = [
        self::ACTIVE => 'active',
        self::UNACTIVE => 'unactive'
    ];
}