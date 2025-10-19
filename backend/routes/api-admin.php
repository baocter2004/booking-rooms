<?php

use App\Http\Controllers\Api\Admin\UserController;
use App\Http\Controllers\Api\Admin\DashboardController;
use Illuminate\Support\Facades\Route;

Route::prefix('admin')
    ->name('admin.')
    ->middleware(['auth.role', 'role:admin'])
    ->group(function () {
        Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
        Route::prefix('users')
            ->name('users.')
            ->group(function () {
                Route::get('/', [UserController::class, 'index'])->name('index');
                Route::get('/{id}', [UserController::class, 'show'])->name('show');

                Route::post('/', [UserController::class, 'create'])->name('.create');
                Route::put('/{id}', [UserController::class, 'edit'])->name('edit');
                Route::patch('/{id}', [UserController::class, 'editList']);

                Route::delete('/{id}', [UserController::class, 'destroy'])->name('destroy');
            });
    });
