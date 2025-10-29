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
        Schema::create('hotel_owners', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100);
            $table->string('email', 150)->unique();
            $table->string('password');
            $table->string('phone', 20)->nullable();
            $table->string('avatar', 255)->nullable();
            $table->string('company_name', 150)->nullable();
            $table->text('bio')->nullable();
            $table->boolean('is_verified')->default(false);
            $table->unsignedInteger('status')->default(1);
            $table->timestamps();
            $table->softDeletes();
            
            $table->index('email');
            $table->index(['status', 'is_verified']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hotel_owners');
    }
};
