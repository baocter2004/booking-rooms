<?php

use App\Http\Controllers\Api\HotelOwner\DashboardController;
use App\Http\Controllers\Api\HotelOwner\HotelController;
use App\Http\Controllers\Api\HotelOwner\StaffController;
use App\Http\Controllers\Api\UploadController;
use Illuminate\Support\Facades\Route;

Route::prefix('hotel-owner')
    ->name('hotel-owner.')
    ->middleware(['auth.role', 'role:hotel_owner'])
    ->group(function () {
        // Dashboard
        Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

        // Upload routes
        Route::post('upload/image', [UploadController::class, 'uploadImage'])->name('upload.image');
        Route::post('upload/delete', [UploadController::class, 'deleteImage'])->name('upload.delete');

        // Hotels Management
        Route::prefix('hotels')
            ->name('hotels.')
            ->group(function () {
                Route::get('/', [HotelController::class, 'index'])->name('index');
                Route::get('/{id}', [HotelController::class, 'show'])->name('show');
                
                Route::post('/', [HotelController::class, 'create'])->name('create');
                Route::put('/{id}', [HotelController::class, 'edit'])->name('edit');
                Route::patch('/{id}', [HotelController::class, 'editList'])->name('editList');
                
                Route::delete('/{id}', [HotelController::class, 'destroy'])->name('destroy');
            });

        // Staff Management
        Route::prefix('staff')
            ->name('staff.')
            ->group(function () {
                Route::get('/', [StaffController::class, 'index'])->name('index');
                Route::get('/{id}', [StaffController::class, 'show'])->name('show');
                
                Route::post('/', [StaffController::class, 'create'])->name('create');
                Route::put('/{id}', [StaffController::class, 'edit'])->name('edit');
                
                Route::delete('/{id}', [StaffController::class, 'destroy'])->name('destroy');
            });
    });

