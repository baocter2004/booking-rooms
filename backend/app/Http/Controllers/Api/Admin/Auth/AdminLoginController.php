<?php

namespace App\Http\Controllers\Api\Admin\Auth;

use App\Http\Controllers\ApiController;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminLoginController extends ApiController
{
    public function login(Request $request): JsonResponse
    {
        $credentials = $request->only(['email', 'password']);

        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        if (!$token = $this->auth('admin')->attempt($credentials)) {
            return $this->json(statusCode: JsonResponse::HTTP_BAD_REQUEST, message: 'Email or password is not correct.');
        }

        return $this->json($this->respondWithToken($token));
    }

    public function logout(): JsonResponse
    {
        $this->auth('admin')->logout();
        return $this->json();
    }

    private function respondWithToken(string $token): array
    {
        return [
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_at' => now()->addMinutes(config('jwt.ttl')),
        ];
    }
}
