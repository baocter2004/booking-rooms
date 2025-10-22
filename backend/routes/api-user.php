<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Client\ClientController;

Route::prefix('user')
    ->name('user.')
    ->middleware(['auth.role', 'role:user'])
    ->group(function () {
        Route::get('profile', [ClientController::class, 'profile'])->name('profile');
        Route::put('profile', [ClientController::class, 'updateProfile'])->name('profile.update');
    });
