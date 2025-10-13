<?php

use App\Enums\StaffConst;
use App\Models\Hotel;
use App\Models\StaffRole;
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
        Schema::create('staff', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Hotel::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(User::class, 'user_account_id')->nullable()->constrained()->nullOnDelete();
            $table->string('name', 100);
            $table->foreignIdFor(StaffRole::class)->constrained()->cascadeOnDelete();
            $table->string('phone', 20)->nullable();
            $table->string('email', 150)->nullable();
            $table->unsignedInteger('status')->default(StaffConst::ACTIVE);
            $table->timestamps();
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
