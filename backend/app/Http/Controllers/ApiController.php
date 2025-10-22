<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\Auth\Guard;
use Illuminate\Contracts\Auth\StatefulGuard;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class ApiController extends Controller
{
    /**
     * @param array|object $data
     * @param int $statusCode
     * @param string $message
     * @return JsonResponse
     */
    protected function json(array|object $data = [], int $statusCode = 200, string $message = 'success'): JsonResponse
    {
        if (!is_array($data) && !is_object($data)) {
            $data = empty($data) ? [] : [$data];
        }

        $dataFormat = [
            'success' => $statusCode === 200,
            'message' => $message,
            'data' => empty($data) ? (object)[] : $data
        ];

        return response()->json($dataFormat, $statusCode);
    }

    /**
     * @param string|null $authName
     * @return Guard|StatefulGuard
     */
    protected function auth(?string $authName = null): Guard|StatefulGuard
    {
        return Auth::guard($authName);
    }

    protected function respondWithToken(string $token): array
    {
        return [
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_at' => now()->addMinutes(config('jwt.ttl')),
        ];
    }
}
