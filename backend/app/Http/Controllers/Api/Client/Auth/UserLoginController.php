<?php

namespace App\Http\Controllers\Api\Client\Auth;

use App\Http\Controllers\ApiController;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\JsonResponse;

class UserLoginController extends ApiController
{
    public function login(LoginRequest $request): JsonResponse
    {
        if (!$token = $this->auth('user')->attempt($request->validated())) {
            return $this->json(statusCode: JsonResponse::HTTP_BAD_REQUEST, message: 'Email or Password is not correct');
        }

        return $this->json($this->respondWithToken($token), JsonResponse::HTTP_OK, 'Login Successful');
    }

    public function logout(): JsonResponse
    {
        $this->auth('user')->logout();
        return $this->json();
    }
}
