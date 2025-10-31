<?php

namespace Database\Seeders;

use App\Models\HotelOwner;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class HotelOwnerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $hotelOwners = [
            [
                'name' => 'John Smith',
                'email' => 'owner@hotel.com',
                'password' => Hash::make('password123'),
                'phone' => '+84901234567',
                'company_name' => 'Smith Hotel Group',
                'bio' => 'Experienced hotel owner with 15+ years in the hospitality industry.',
                'is_verified' => true,
                'status' => 1,
            ],
            [
                'name' => 'Maria Garcia',
                'email' => 'maria@hotelgroup.com',
                'password' => Hash::make('password123'),
                'phone' => '+84912345678',
                'company_name' => 'Garcia Hospitality',
                'bio' => 'Owner of multiple boutique hotels across Vietnam.',
                'is_verified' => true,
                'status' => 1,
            ],
            [
                'name' => 'David Chen',
                'email' => 'david@luxuryhotels.com',
                'password' => Hash::make('password123'),
                'phone' => '+84923456789',
                'company_name' => 'Chen Luxury Hotels',
                'bio' => 'Specializing in luxury resort management.',
                'is_verified' => true,
                'status' => 1,
            ],
        ];

        foreach ($hotelOwners as $owner) {
            HotelOwner::create($owner);
        }

        $this->command->info('✓ Created ' . count($hotelOwners) . ' hotel owners');
        $this->command->info('✓ Login credentials: owner@hotel.com / password123');
    }
}
