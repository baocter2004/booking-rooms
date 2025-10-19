<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->softDeletes();
        });

        Schema::table('bookings', function (Blueprint $table) {
            $table->softDeletes();
        });

        Schema::table('hotels', function (Blueprint $table) {
            $table->softDeletes();
        });

        Schema::table('rooms', function (Blueprint $table) {
            $table->softDeletes();
        });

        Schema::table('reviews', function (Blueprint $table) {
            $table->softDeletes();
        });

        Schema::table('staff', function (Blueprint $table) {
            $table->softDeletes();
        });

        Schema::table('appointments', function (Blueprint $table) {
            $table->softDeletes();
        });

        Schema::table('services', function (Blueprint $table) {
            $table->softDeletes();
        });

        Schema::table('service_types', function (Blueprint $table) {
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });

        Schema::table('bookings', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });

        Schema::table('hotels', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });

        Schema::table('rooms', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });

        Schema::table('reviews', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });

        Schema::table('staff', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });

        Schema::table('appointments', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });

        Schema::table('services', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });

        Schema::table('service_types', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
    }
};
