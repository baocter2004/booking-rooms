<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        using: function () {
            require __DIR__ . '/../routes/api.php';
            require __DIR__ . '/../routes/api-admin.php';
            require __DIR__ . '/../routes/api-client.php';
        },
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        //
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->shouldRenderJsonWhen(function (Request $request, Throwable $throwable) {
            if ($request->is('api/*') || $request->wantsJson() || $request->ajax()) {
                return true;
            }
            return false;
        });
    })->create();
