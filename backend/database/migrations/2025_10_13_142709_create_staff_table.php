<?php

use App\Constants\StaffConst;
use App\Models\Hotel;
use App\Models\StaffRole;
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
        Schema::create('staff', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Hotel::class)->constrained()->cascadeOnDelete();
            $table->string('name', 100);
            $table->foreignIdFor(StaffRole::class)->constrained()->cascadeOnDelete();
            $table->string('phone', 20)->nullable();
            $table->string('email', 150)->unique();
            $table->string('password');
            $table->string('avatar', 255)->nullable();
            $table->unsignedInteger('status')->default(StaffConst::ACTIVE);
            $table->timestamps();
            
            $table->index(['hotel_id', 'staff_role_id']);
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('staff');
    }
};
