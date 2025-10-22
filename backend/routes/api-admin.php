<?php

use App\Http\Controllers\Api\Admin\UserController;
use App\Http\Controllers\Api\Admin\DashboardController;
use App\Http\Controllers\Api\Admin\HotelController;
use App\Http\Controllers\Api\Admin\RoomController;
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

        Route::prefix('hotels')
            ->name('hotels')
            ->group(function () {
                Route::get('/', [HotelController::class, 'index'])->name('index');
                Route::get('/{id}', [HotelController::class, 'show'])->name('show');

                Route::post('/', [HotelController::class, 'create'])->name('.create');
                Route::put('/{id}', [HotelController::class, 'edit'])->name('edit');
                Route::patch('/{id}', [HotelController::class, 'editList']);

                Route::delete('/{id}', [HotelController::class, 'destroy'])->name('destroy');
            });

        Route::prefix('rooms')
            ->name('rooms')
            ->group(function () {
                Route::get('/', [RoomController::class, 'index'])->name('index');
                Route::get('/{id}', [RoomController::class, 'show'])->name('show');

                Route::post('/', [RoomController::class, 'create'])->name('.create');
                Route::put('/{id}', [RoomController::class, 'edit'])->name('edit');
                Route::patch('/{id}', [RoomController::class, 'editList']);

                Route::delete('/{id}', [RoomController::class, 'destroy'])->name('destroy');
            });
    });
