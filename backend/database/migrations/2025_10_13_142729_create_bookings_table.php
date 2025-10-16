<?php

use App\Constants\BookingConst;
use App\Models\Hotel;
use App\Models\Room;
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
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(Hotel::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(Room::class)->constrained()->cascadeOnDelete();
            $table->date('checkin_date');
            $table->time('checkin_time')->default('14:00:00')->comment('Check-in time');
            $table->date('checkout_date');
            $table->time('checkout_time')->default('12:00:00')->comment('Check-out time');
            $table->integer('guests')->default(1);
            $table->decimal('room_price', 12, 2)->default(0);
            $table->decimal('services_price', 12, 2)->default(0);
            $table->decimal('total_price', 12, 2)->default(0);
            $table->text('special_requests')->nullable();
            $table->unsignedInteger('status')->default(BookingConst::PENDING);
            $table->string('booking_code', 20)->unique()->nullable();
            $table->timestamps();
            
            $table->index(['user_id', 'status']);
            $table->index(['hotel_id', 'status']);
            $table->index(['room_id', 'checkin_date', 'checkout_date']);
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
