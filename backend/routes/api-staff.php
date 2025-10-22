<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Staff\DashboardController;

Route::prefix('staff')
    ->name('staff.')
    ->middleware(['auth.role', 'role:staff'])
    ->group(function () {
        Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    });

