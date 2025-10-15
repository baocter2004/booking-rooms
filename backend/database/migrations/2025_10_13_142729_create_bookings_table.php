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
            $table->date('checkout_date');
            $table->integer('guests')->default(1);
            $table->decimal('room_price', 12, 2)->default(0);
            $table->decimal('services_price', 12, 2)->default(0);
            $table->decimal('total_price', 12, 2)->default(0);
            $table->text('special_requests')->nullable();
            $table->unsignedInteger('status')->default(BookingConst::PENDING);
            $table->timestamps();
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
