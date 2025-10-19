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
        Schema::table('posts', function (Blueprint $table) {
            $table->softDeletes();
        });

        Schema::table('post_categories', function (Blueprint $table) {
            $table->softDeletes();
        });

        Schema::table('post_tags', function (Blueprint $table) {
            $table->softDeletes();
        });

        Schema::table('comments', function (Blueprint $table) {
            $table->softDeletes();
        });

        Schema::table('translations', function (Blueprint $table) {
            $table->softDeletes();
        });

        Schema::table('room_types', function (Blueprint $table) {
            $table->softDeletes();
        });

        Schema::table('staff_roles', function (Blueprint $table) {
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('posts', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });

        Schema::table('post_categories', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });

        Schema::table('post_tags', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });

        Schema::table('comments', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });

        Schema::table('translations', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });

        Schema::table('room_types', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });

        Schema::table('staff_roles', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
    }
};
