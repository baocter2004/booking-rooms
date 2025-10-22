<?php

namespace App\Http\Middleware;

use App\Enums\RoleType;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class AuthenticateWithRole
{
    public function handle(Request $request, Closure $next): Response
    {
        try {
            JWTAuth::parseToken();
            $payload = JWTAuth::getPayload();
            $guard = $payload->get('guard');
            
            if (!$guard || !RoleType::isValid($guard)) {
                return $this->unauthorized('Invalid token guard');
            }

            $user = Auth::guard($guard)->user();

            if (!$user) {
                return $this->unauthorized('User not found');
            }

            Auth::shouldUse($guard);
            $request->setUserResolver(fn() => $user);
            
            $request->merge([
                'authenticated_guard' => $guard,
                'authenticated_role' => $guard,
            ]);

            return $next($request);

        } catch (JWTException $e) {
            return $this->unauthorized('Token is invalid or expired: ' . $e->getMessage());
        } catch (\Exception $e) {
            return $this->unauthorized('Authentication failed: ' . $e->getMessage());
        }
    }

    protected function unauthorized(string $message = 'Unauthenticated'): Response
    {
        return response()->json([
            'success' => false,
            'message' => $message,
            'error' => 'Unauthorized'
        ], Response::HTTP_UNAUTHORIZED);
    }
}

