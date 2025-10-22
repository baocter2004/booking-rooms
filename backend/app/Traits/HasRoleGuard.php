<?php

namespace App\Traits;

use App\Enums\RoleType;

trait HasRoleGuard
{
    public function getRoleType(): ?RoleType
    {
        $guardName = $this->getJWTCustomClaims()['guard'] ?? null;
        
        if (!$guardName) {
            return null;
        }

        return RoleType::fromValue($guardName);
    }

    public function hasRole(string|RoleType $role): bool
    {
        $roleValue = $role instanceof RoleType ? $role->value : $role;
        $currentRole = $this->getRoleType();

        return $currentRole && $currentRole->value === $roleValue;
    }

    public function hasAnyRole(array $roles): bool
    {
        foreach ($roles as $role) {
            if ($this->hasRole($role)) {
                return true;
            }
        }

        return false;
    }

    public function isAdmin(): bool
    {
        return $this->hasRole(RoleType::ADMIN);
    }

    public function isStaff(): bool
    {
        return $this->hasRole(RoleType::STAFF);
    }

    public function isUser(): bool
    {
        return $this->hasRole(RoleType::USER);
    }

    public function getGuardName(): ?string
    {
        return $this->getJWTCustomClaims()['guard'] ?? null;
    }
}

