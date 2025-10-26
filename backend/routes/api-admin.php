<?php

use App\Http\Controllers\Api\Admin\CommentController;
use App\Http\Controllers\Api\Admin\UserController;
use App\Http\Controllers\Api\Admin\DashboardController;
use App\Http\Controllers\Api\Admin\HotelController;
use App\Http\Controllers\Api\Admin\PostCategoryController;
use App\Http\Controllers\Api\Admin\PostController;
use App\Http\Controllers\Api\Admin\ReviewController;
use App\Http\Controllers\Api\Admin\RoomController;
use App\Http\Controllers\Api\Admin\RoomServiceController;
use App\Http\Controllers\Api\Admin\RoomTypeController;
use App\Http\Controllers\Api\Admin\ServiceController;
use App\Http\Controllers\Api\Admin\ServiceTypeController;
use App\Http\Controllers\Api\Admin\StaffController;
use App\Http\Controllers\Api\UploadController;
use Illuminate\Support\Facades\Route;

Route::prefix('admin')
    ->name('admin.')
    ->middleware(['auth.role', 'role:admin'])
    ->group(function () {
        Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

        // Upload routes
        Route::post('upload/image', [UploadController::class, 'uploadImage'])->name('upload.image');
        Route::post('upload/delete', [UploadController::class, 'deleteImage'])->name('upload.delete');

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

        Route::prefix('staffs')
            ->name('staffs.')
            ->group(function () {
                Route::get('/', [StaffController::class, 'index'])->name('index');
                Route::get('/{id}', [StaffController::class, 'show'])->name('show');

                Route::post('/', [StaffController::class, 'create'])->name('.create');
                Route::put('/{id}', [StaffController::class, 'edit'])->name('edit');
                Route::patch('/{id}', [StaffController::class, 'editList']);

                Route::delete('/{id}', [StaffController::class, 'destroy'])->name('destroy');
            });

        Route::prefix('services')
            ->name('services.')
            ->group(function () {
                Route::get('/', [ServiceController::class, 'index'])->name('index');
                Route::get('/{id}', [ServiceController::class, 'show'])->name('show');

                Route::post('/', [ServiceController::class, 'create'])->name('.create');
                Route::put('/{id}', [ServiceController::class, 'edit'])->name('edit');
                Route::patch('/{id}', [ServiceController::class, 'editList']);

                Route::delete('/{id}', [ServiceController::class, 'destroy'])->name('destroy');
            });

        Route::prefix('service-types')
            ->name('service-types.')
            ->group(function () {
                Route::get('/', [ServiceTypeController::class, 'index'])->name('index');
                Route::get('/{id}', [ServiceTypeController::class, 'show'])->name('show');

                Route::post('/', [ServiceTypeController::class, 'create'])->name('.create');
                Route::put('/{id}', [ServiceTypeController::class, 'edit'])->name('edit');
                Route::patch('/{id}', [ServiceTypeController::class, 'editList']);

                Route::delete('/{id}', [ServiceTypeController::class, 'destroy'])->name('destroy');
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

        Route::prefix('room-types')
            ->name('room-types')
            ->group(function () {
                Route::get('/', [RoomTypeController::class, 'index'])->name('index');
                Route::get('/{id}', [RoomTypeController::class, 'show'])->name('show');

                Route::post('/', [RoomTypeController::class, 'create'])->name('.create');
                Route::put('/{id}', [RoomTypeController::class, 'edit'])->name('edit');
                Route::patch('/{id}', [RoomTypeController::class, 'editList']);

                Route::delete('/{id}', [RoomTypeController::class, 'destroy'])->name('destroy');
            });

        Route::prefix('room-services')
            ->name('room-services')
            ->group(function () {
                Route::get('/', [RoomServiceController::class, 'index'])->name('index');
                Route::get('/{id}', [RoomServiceController::class, 'show'])->name('show');

                Route::post('/', [RoomServiceController::class, 'create'])->name('.create');
                Route::put('/{id}', [RoomServiceController::class, 'edit'])->name('edit');
                Route::patch('/{id}', [RoomServiceController::class, 'editList']);

                Route::delete('/{id}', [RoomServiceController::class, 'destroy'])->name('destroy');
            });

        Route::prefix('reviews')
            ->name('reviews')
            ->group(function () {
                Route::get('/', [RoomController::class, 'index'])->name('index');
                Route::get('/{id}', [RoomController::class, 'show'])->name('show');

                Route::post('/', [RoomController::class, 'create'])->name('.create');
                Route::put('/{id}', [RoomController::class, 'edit'])->name('edit');
                Route::patch('/{id}', [RoomController::class, 'editList']);

                Route::delete('/{id}', [RoomController::class, 'destroy'])->name('destroy');
            });

        // ============================================== Post - Marketing =====================================
        Route::prefix('posts')
            ->name('posts')
            ->group(function () {
                Route::get('/', [ReviewController::class, 'index'])->name('index');
                Route::get('/{id}', [ReviewController::class, 'show'])->name('show');

                Route::post('/', [ReviewController::class, 'create'])->name('.create');
                Route::put('/{id}', [ReviewController::class, 'edit'])->name('edit');
                Route::patch('/{id}', [ReviewController::class, 'editList']);

                Route::delete('/{id}', [ReviewController::class, 'destroy'])->name('destroy');
            });

        Route::prefix('posts')
            ->name('posts')
            ->group(function () {
                Route::get('/', [PostController::class, 'index'])->name('index');
                Route::get('/{id}', [PostController::class, 'show'])->name('show');

                Route::post('/', [PostController::class, 'create'])->name('.create');
                Route::put('/{id}', [PostController::class, 'edit'])->name('edit');
                Route::patch('/{id}', [PostController::class, 'editList']);

                Route::delete('/{id}', [PostController::class, 'destroy'])->name('destroy');
            });

        Route::prefix('post-categories')
            ->name('post-categories')
            ->group(function () {
                Route::get('/', [PostCategoryController::class, 'index'])->name('index');
                Route::get('/{id}', [PostCategoryController::class, 'show'])->name('show');

                Route::post('/', [PostCategoryController::class, 'create'])->name('.create');
                Route::put('/{id}', [PostCategoryController::class, 'edit'])->name('edit');
                Route::patch('/{id}', [PostCategoryController::class, 'editList']);

                Route::delete('/{id}', [PostCategoryController::class, 'destroy'])->name('destroy');
            });

        Route::prefix('comments')
            ->name('comments')
            ->group(function () {
                Route::get('/', [CommentController::class, 'index'])->name('index');
                Route::get('/{id}', [CommentController::class, 'show'])->name('show');

                Route::post('/', [CommentController::class, 'create'])->name('.create');
                Route::put('/{id}', [CommentController::class, 'edit'])->name('edit');
                Route::patch('/{id}', [CommentController::class, 'editList']);

                Route::delete('/{id}', [CommentController::class, 'destroy'])->name('destroy');
            });
    });
