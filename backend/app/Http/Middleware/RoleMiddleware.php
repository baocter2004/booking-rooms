<?php

namespace App\Http\Middleware;

use App\Enums\RoleType;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class RoleMiddleware
{
    public function handle(Request $request, Closure $next, string ...$roles): Response
    {
        if (empty($roles)) {
            return $this->unauthorized('No role specified');
        }

        $allowedRoles = $this->parseRoles($roles);
        if (empty($allowedRoles)) {
            return $this->unauthorized('Invalid role specified');
        }
        $authenticatedGuard = $this->getAuthenticatedGuard($allowedRoles);

        if (!$authenticatedGuard) {
            return $this->unauthorized('Unauthenticated');
        }

        if (!in_array($authenticatedGuard, $allowedRoles)) {
            return $this->forbidden(
                "Access denied. Required role(s): " . implode(', ', $allowedRoles) . 
                ". Current role: {$authenticatedGuard}"
            );
        }
        
        $request->merge(['authenticated_guard' => $authenticatedGuard]);
        $request->merge(['authenticated_role' => $authenticatedGuard]);

        return $next($request);
    }

    protected function parseRoles(array $roles): array
    {
        $parsed = [];

        foreach ($roles as $role) {
            $roleParts = explode(',', $role);
            
            foreach ($roleParts as $rolePart) {
                $rolePart = trim($rolePart);
                
                if (RoleType::isValid($rolePart)) {
                    $parsed[] = $rolePart;
                }
            }
        }

        return array_unique($parsed);
    }

    protected function getAuthenticatedGuard(array $allowedRoles): ?string
    {
        foreach ($allowedRoles as $role) {
            $roleEnum = RoleType::fromValue($role);
            
            if ($roleEnum && Auth::guard($roleEnum->guard())->check()) {
                return $role;
            }
        }

        return null;
    }

    protected function unauthorized(string $message = 'Unauthenticated'): Response
    {
        return response()->json([
            'success' => false,
            'message' => $message,
            'error' => 'Unauthorized'
        ], Response::HTTP_UNAUTHORIZED);
    }

    protected function forbidden(string $message = 'Access denied'): Response
    {
        return response()->json([
            'success' => false,
            'message' => $message,
            'error' => 'Forbidden'
        ], Response::HTTP_FORBIDDEN);
    }
}

