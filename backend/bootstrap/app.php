<?php

use App\Http\Middleware\AuthenticateWithRole;
use App\Http\Middleware\RoleMiddleware;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        using: function () {
            Route::prefix('api')->group(function () {
                require __DIR__ . '/../routes/api.php';
                require __DIR__ . '/../routes/api-admin.php';
                require __DIR__ . '/../routes/api-hotel-owner.php';
                require __DIR__ . '/../routes/api-staff.php';
                require __DIR__ . '/../routes/api-user.php';
            });
        },
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->alias([
            'role' => RoleMiddleware::class,
            'auth.role' => AuthenticateWithRole::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->shouldRenderJsonWhen(function (Request $request, Throwable $throwable) {
            if ($request->is('api/*') || $request->wantsJson() || $request->ajax()) {
                return true;
            }
            return false;
        });
    })->create();
