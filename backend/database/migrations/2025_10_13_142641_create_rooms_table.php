<?php

use App\Constants\RoomConst;
use App\Models\Hotel;
use App\Models\RoomType;
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
        Schema::create('rooms', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Hotel::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(Service::class)->constrained()->cascadeOnDelete();
            $table->string('number', 20);
            $table->foreignIdFor(RoomType::class)->constrained()->cascadeOnDelete();
            $table->integer('capacity')->default(1);
            $table->decimal('price', 12, 2);
            $table->unsignedInteger('status')->default(RoomConst::AVAILABLE);
            $table->string('image_url', 255)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rooms');
    }
};
