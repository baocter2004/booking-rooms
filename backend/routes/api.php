<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Admin\Auth\AdminLoginController;

Route::prefix('admin')
    ->name('admin.')
    ->group(function () {
        Route::post('login', [AdminLoginController::class, 'login'])->name('login');
        Route::post('logout', [AdminLoginController::class, 'logout'])
            ->middleware('auth:admin')
            ->name('logout');
    });
