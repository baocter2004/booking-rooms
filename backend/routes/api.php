<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Admin\Auth\AdminLoginController;
use App\Http\Controllers\Api\Client\Auth\UserLoginController;
use App\Http\Controllers\Api\HotelOwner\Auth\HotelOwnerLoginController;
use App\Http\Controllers\Api\Staff\Auth\StaffLoginController;

Route::prefix('admin')
    ->name('admin.')
    ->group(function () {
        Route::post('login', [AdminLoginController::class, 'login'])->name('login');
        Route::post('logout', [AdminLoginController::class, 'logout'])
            ->middleware('auth:admin')
            ->name('logout');
    });


Route::prefix('hotel-owner')
    ->name('hotel-owner.')
    ->group(function () {
        Route::post('login', [HotelOwnerLoginController::class, 'login'])->name('login');
        Route::post('logout', [HotelOwnerLoginController::class, 'logout'])
            ->middleware('auth:hotel_owner')
            ->name('logout');
    });


Route::prefix('staff')
    ->name('staff.')
    ->group(function () {
        Route::post('login', [StaffLoginController::class, 'login'])->name('login');
        Route::post('logout', [StaffLoginController::class, 'logout'])
            ->middleware('auth:staff')
            ->name('logout');
    });


Route::prefix('user')
    ->name('user.')
    ->group(function () {
        Route::post('login', [UserLoginController::class, 'login'])->name('login');
        Route::post('logout', [UserLoginController::class, 'logout'])
            ->middleware('auth:user')
            ->name('logout');
    });
