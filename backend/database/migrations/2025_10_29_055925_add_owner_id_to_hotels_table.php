<?php

use App\Models\HotelOwner;
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
        Schema::table('hotels', function (Blueprint $table) {
            $table->foreignIdFor(HotelOwner::class)->nullable()->after('id')->constrained()->nullOnDelete();
            $table->unsignedInteger('status')->default(1)->after('image_url');
            
            $table->index(['hotel_owner_id', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('hotels', function (Blueprint $table) {
            $table->dropForeign(['hotel_owner_id']);
            $table->dropColumn(['hotel_owner_id', 'status']);
        });
    }
};
