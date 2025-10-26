<?php

namespace App\Http\Controllers\Api\Admin\Auth;

use App\Http\Controllers\ApiController;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\JsonResponse;

class AdminLoginController extends ApiController
{
    public function login(LoginRequest $request): JsonResponse
    {
        if (!$token = $this->auth('admin')->attempt($request->validated())) {
            return $this->json(statusCode: JsonResponse::HTTP_BAD_REQUEST, message: 'Email or password is not correct.');
        }

        return $this->json($this->respondWithTokenAndUser($token, 'admin'), JsonResponse::HTTP_OK, 'Login Successful');
    }

    public function logout(): JsonResponse
    {
        $this->auth('admin')->logout();
        return $this->json();
    }
}
