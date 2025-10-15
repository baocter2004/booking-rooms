<?php

use App\Models\Booking;
use App\Models\User;
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
        Schema::create('reviews', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(Booking::class)->constrained()->cascadeOnDelete();
            $table->tinyInteger('rating')->checkBetween(1, 5);
            $table->tinyInteger('cleanliness_rating')->nullable()->checkBetween(1, 5);
            $table->tinyInteger('service_rating')->nullable()->checkBetween(1, 5);
            $table->tinyInteger('facilities_rating')->nullable()->checkBetween(1, 5);
            $table->tinyInteger('location_rating')->nullable()->checkBetween(1, 5);
            $table->tinyInteger('value_rating')->nullable()->checkBetween(1, 5);
            $table->text('comment')->nullable();
            $table->json('images')->nullable()->comment('Array of review image URLs');
            $table->text('hotel_response')->nullable();
            $table->timestamp('hotel_response_at')->nullable();
            
            $table->timestamps();
            $table->unique(['user_id', 'booking_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reviews');
    }
};
