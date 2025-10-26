<?php

namespace App\Http\Controllers\Api\Staff\Auth;

use App\Http\Controllers\ApiController;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\JsonResponse;

class StaffLoginController extends ApiController
{
    public function login(LoginRequest $request): JsonResponse
    {
        if (!$token = $this->auth('staff')->attempt($request->validated())) {
            return $this->json(statusCode: JsonResponse::HTTP_BAD_REQUEST, message: 'Email or Password is not correct');
        }

        return $this->json($this->respondWithTokenAndUser($token, 'staff'), JsonResponse::HTTP_OK, 'Login Successful');
    }

    public function logout(): JsonResponse
    {
        $this->auth('staff')->logout();
        return $this->json();
    }
}
