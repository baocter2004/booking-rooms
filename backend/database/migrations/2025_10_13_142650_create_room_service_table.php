<?php

use App\Models\Room;
use App\Models\Service;
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
        Schema::create('room_service', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Room::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(Service::class)->constrained()->cascadeOnDelete();
            $table->boolean('is_included')->default(true)->comment('Service included in room or additional charge');
            $table->decimal('additional_price', 10, 2)->default(0);
            $table->timestamps();
            $table->unique(['room_id', 'service_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('room_service');
    }
};

