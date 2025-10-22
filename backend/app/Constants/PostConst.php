<?php

namespace App\Constants;

class PostConst
{
    const DRAFT = 1;
    const PUBLISHED = 2;
    const SCHEDULED = 3;
    const ARCHIVED = 4;

    const STATUS = [
        self::DRAFT => 'draft',
        self::PUBLISHED => 'published',
        self::SCHEDULED => 'scheduled',
        self::ARCHIVED => 'archived',
    ];
}

