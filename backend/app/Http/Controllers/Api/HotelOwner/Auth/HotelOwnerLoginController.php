<?php

namespace App\Http\Controllers\Api\HotelOwner\Auth;

use App\Http\Controllers\ApiController;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\JsonResponse;

class HotelOwnerLoginController extends ApiController
{
    public function login(LoginRequest $request): JsonResponse
    {
        if (!$token = $this->auth('hotel_owner')->attempt($request->validated())) {
            return $this->json(statusCode: JsonResponse::HTTP_BAD_REQUEST, message: 'Email or password is not correct.');
        }

        return $this->json($this->respondWithTokenAndUser($token, 'hotel_owner'), JsonResponse::HTTP_OK, 'Login Successful');
    }

    public function logout(): JsonResponse
    {
        $this->auth('hotel_owner')->logout();
        return $this->json();
    }
}

