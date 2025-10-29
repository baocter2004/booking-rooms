<?php

namespace App\Enums;

enum RoleType: string
{
    case ADMIN = 'admin';
    case HOTEL_OWNER = 'hotel_owner';
    case STAFF = 'staff';
    case USER = 'user';

    /**
     * Get all role values
     */
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }

    /**
     * Get all role names
     */
    public static function names(): array
    {
        return array_column(self::cases(), 'name');
    }

    /**
     * Check if a role value is valid
     */
    public static function isValid(string $role): bool
    {
        return in_array($role, self::values());
    }

    /**
     * Get role from string value
     */
    public static function fromValue(string $value): ?self
    {
        return self::tryFrom($value);
    }

    /**
     * Get the guard name for this role
     */
    public function guard(): string
    {
        return $this->value;
    }

    /**
     * Get display name for this role
     */
    public function label(): string
    {
        return match($this) {
            self::ADMIN => 'Administrator',
            self::HOTEL_OWNER => 'Hotel Owner',
            self::STAFF => 'Staff Member',
            self::USER => 'User',
        };
    }
}

