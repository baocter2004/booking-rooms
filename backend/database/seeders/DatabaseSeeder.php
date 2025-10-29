<?php

namespace Database\Seeders;

use App\Constants\BookingConst;
use App\Constants\RoomConst;
use App\Constants\StaffConst;
use App\Constants\AppointmentConst;
use App\Constants\NotificationConst;
use App\Constants\PostConst;
use App\Models\Admin;
use App\Models\HotelOwner;
use App\Models\User;
use App\Models\Staff;
use App\Models\Hotel;
use App\Models\ServiceType;
use App\Models\Service;
use App\Models\RoomType;
use App\Models\Room;
use App\Models\StaffRole;
use App\Models\Booking;
use App\Models\Appointment;
use App\Models\Availability;
use App\Models\Review;
use App\Models\PostCategory;
use App\Models\Post;
use App\Models\PostTag;
use App\Models\Comment;
use App\Models\UserNotification;
use App\Models\StaffNotification;
use App\Models\AdminNotification;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Faker\Factory as Faker;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create();
        
        $this->command->info('🌱 Starting seeding...');
        $this->command->info('👤 Seeding Admins...');
        
        Admin::create([
            'name' => 'Super Admin',
            'email' => 'admin@example.com',
            'is_super' => true,
            'password' => Hash::make('admin123'),
            'phone' => '0901234567',
        ]);

        Admin::create([
            'name' => 'Admin Staff',
            'email' => 'staff@example.com',
            'is_super' => false,
            'password' => Hash::make('admin123'),
            'phone' => '0901234568',
        ]);

        $this->command->info('🏨 Seeding Hotel Owners...');
        $this->call(HotelOwnerSeeder::class);

        $this->command->info('👥 Seeding Users...');
        
        $users = collect();
        $users->push(User::create([
            'name' => 'John Doe',
            'email' => 'user@example.com',
            'email_verified_at' => now(),
            'password' => Hash::make('password'),
            'phone' => '0912345678',
        ]));

        for ($i = 2; $i <= 20; $i++) {
            $users->push(User::create([
                'name' => $faker->name(),
                'email' => "user{$i}@example.com",
                'email_verified_at' => now(),
                'password' => Hash::make('password'),
                'phone' => $faker->phoneNumber(),
            ]));
        }

        $this->command->info('🏨 Seeding Hotels...');
        
        $hotelOwners = HotelOwner::all();
        
        $hotels = collect([
            Hotel::create([
                'hotel_owner_id' => $hotelOwners->get(0)->id ?? null,
                'name' => 'Grand Ocean Hotel',
                'address' => '123 Beach Road, Da Nang',
                'phone' => '0236 3812345',
                'email' => 'info@grandocean.com',
                'description' => 'Luxury beachfront hotel with stunning ocean views',
                'image_url' => 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
                'status' => 1,
            ]),
            Hotel::create([
                'hotel_owner_id' => $hotelOwners->get(0)->id ?? null,
                'name' => 'Mountain View Resort',
                'address' => '456 Highland Street, Sapa',
                'phone' => '0214 3871234',
                'email' => 'contact@mountainview.com',
                'description' => 'Peaceful mountain retreat with panoramic views',
                'image_url' => 'https://images.unsplash.com/photo-1564501049412-61c2a3083791',
                'status' => 1,
            ]),
            Hotel::create([
                'hotel_owner_id' => $hotelOwners->get(1)->id ?? null,
                'name' => 'City Center Plaza',
                'address' => '789 Downtown Avenue, Ho Chi Minh',
                'phone' => '028 38123456',
                'email' => 'hello@cityplaza.com',
                'description' => 'Modern hotel in the heart of the city',
                'image_url' => 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa',
                'status' => 1,
            ]),
        ]);

        $this->command->info('🏷️  Seeding Service Types...');
        
        $serviceTypes = collect([
            ServiceType::create(['name' => 'Room Amenities', 'description' => 'In-room services and amenities']),
            ServiceType::create(['name' => 'Spa & Wellness', 'description' => 'Spa, massage, and wellness services']),
            ServiceType::create(['name' => 'Food & Beverage', 'description' => 'Restaurant and in-room dining']),
            ServiceType::create(['name' => 'Transportation', 'description' => 'Airport transfer and car rental']),
            ServiceType::create(['name' => 'Housekeeping', 'description' => 'Room cleaning and laundry']),
        ]);

        $this->command->info('🛎️  Seeding Services...');
        
        $servicesList = [
            ['type' => 'Room Amenities', 'name' => 'WiFi', 'price' => 0, 'duration' => null],
            ['type' => 'Room Amenities', 'name' => 'Minibar', 'price' => 150000, 'duration' => null],
            ['type' => 'Room Amenities', 'name' => 'Breakfast in Room', 'price' => 200000, 'duration' => 30],
            ['type' => 'Spa & Wellness', 'name' => 'Swedish Massage', 'price' => 500000, 'duration' => 60],
            ['type' => 'Spa & Wellness', 'name' => 'Aromatherapy', 'price' => 600000, 'duration' => 90],
            ['type' => 'Spa & Wellness', 'name' => 'Facial Treatment', 'price' => 400000, 'duration' => 45],
            ['type' => 'Food & Beverage', 'name' => 'Buffet Breakfast', 'price' => 250000, 'duration' => null],
            ['type' => 'Food & Beverage', 'name' => 'Room Service', 'price' => 100000, 'duration' => 30],
            ['type' => 'Transportation', 'name' => 'Airport Transfer', 'price' => 300000, 'duration' => 60],
            ['type' => 'Transportation', 'name' => 'Car Rental (per day)', 'price' => 800000, 'duration' => null],
            ['type' => 'Housekeeping', 'name' => 'Laundry Service', 'price' => 150000, 'duration' => 120],
            ['type' => 'Housekeeping', 'name' => 'Extra Cleaning', 'price' => 200000, 'duration' => 60],
        ];

        $services = collect();
        foreach ($hotels as $hotel) {
            foreach ($servicesList as $svc) {
                $type = $serviceTypes->firstWhere('name', $svc['type']);
                $services->push(Service::create([
                    'service_type_id' => $type->id,
                    'hotel_id' => $hotel->id,
                    'name' => $svc['name'],
                    'description' => $faker->sentence(8),
                    'price' => $svc['price'],
                    'duration' => $svc['duration'],
                    'image_url' => 'https://images.unsplash.com/photo-1540555700478-4be289fbecef',
                ]));
            }
        }

        $this->command->info('🚪 Seeding Room Types...');
        
        $roomTypes = collect([
            RoomType::create([
                'name' => 'single',
                'display_name' => 'Single Room',
                'description' => 'Cozy room perfect for solo travelers',
                'base_price' => 500000,
                'capacity' => 1
            ]),
            RoomType::create([
                'name' => 'double',
                'display_name' => 'Double Room',
                'description' => 'Comfortable room with double bed',
                'base_price' => 800000,
                'capacity' => 2
            ]),
            RoomType::create([
                'name' => 'twin',
                'display_name' => 'Twin Room',
                'description' => 'Room with two single beds',
                'base_price' => 850000,
                'capacity' => 2
            ]),
            RoomType::create([
                'name' => 'deluxe',
                'display_name' => 'Deluxe Room',
                'description' => 'Spacious room with premium amenities',
                'base_price' => 1200000,
                'capacity' => 2
            ]),
            RoomType::create([
                'name' => 'suite',
                'display_name' => 'Suite',
                'description' => 'Luxury suite with living area',
                'base_price' => 2500000,
                'capacity' => 4
            ]),
            RoomType::create([
                'name' => 'family',
                'display_name' => 'Family Room',
                'description' => 'Large room perfect for families',
                'base_price' => 1800000,
                'capacity' => 4
            ]),
        ]);

        $this->command->info('🛏️  Seeding Rooms...');
        
        $rooms = collect();
        foreach ($hotels as $hotelIndex => $hotel) {
            $roomCounter = 101; // Start from room 101 for each hotel
            foreach ($roomTypes as $type) {
                $roomsPerType = $faker->numberBetween(3, 8);
                for ($i = 1; $i <= $roomsPerType; $i++) {
                    $rooms->push(Room::create([
                        'hotel_id' => $hotel->id,
                        'room_type_id' => $type->id,
                        'number' => $roomCounter,
                        'price' => $type->base_price + $faker->numberBetween(-100000, 500000),
                        'status' => RoomConst::AVAILABLE,
                        'image_url' => 'https://images.unsplash.com/photo-1611892440504-42a792e24d32',
                        'description' => $faker->sentence(10),
                    ]));
                    $roomCounter++; // Increment to ensure unique room numbers
                }
            }
        }

        $this->command->info('🔗 Seeding Room-Service relationships...');
        
        $amenityServices = $services->filter(function($service) {
            return $service->serviceType->name === 'Room Amenities';
        });

        foreach ($rooms as $room) {
            $wifi = $amenityServices->firstWhere('name', 'WiFi');
            if ($wifi) {
                DB::table('room_service')->insert([
                    'room_id' => $room->id,
                    'service_id' => $wifi->id,
                    'is_included' => true,
                    'additional_price' => 0,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }

            if (in_array($room->roomType->name, ['deluxe', 'suite'])) {
                $breakfast = $amenityServices->firstWhere('name', 'Breakfast in Room');
                if ($breakfast) {
                    DB::table('room_service')->insert([
                        'room_id' => $room->id,
                        'service_id' => $breakfast->id,
                        'is_included' => true,
                        'additional_price' => 0,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                }
            }

            if ($room->roomType->name === 'suite') {
                $minibar = $amenityServices->firstWhere('name', 'Minibar');
                if ($minibar) {
                    DB::table('room_service')->insert([
                        'room_id' => $room->id,
                        'service_id' => $minibar->id,
                        'is_included' => true,
                        'additional_price' => 0,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                }
            } else {
                $minibar = $amenityServices->firstWhere('name', 'Minibar');
                if ($minibar && $faker->boolean(50)) {
                    DB::table('room_service')->insert([
                        'room_id' => $room->id,
                        'service_id' => $minibar->id,
                        'is_included' => false,
                        'additional_price' => 150000,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                }
            }
        }

        $this->command->info('👔 Seeding Staff Roles...');
        
        $staffRoles = collect([
            StaffRole::create(['name' => 'Receptionist', 'description' => 'Handles check-in, check-out, and guest services']),
            StaffRole::create(['name' => 'Spa Therapist', 'description' => 'Provides spa and massage treatments']),
            StaffRole::create(['name' => 'Housekeeper', 'description' => 'Maintains room cleanliness']),
            StaffRole::create(['name' => 'Concierge', 'description' => 'Assists guests with reservations and information']),
            StaffRole::create(['name' => 'Chef', 'description' => 'Prepares meals and manages kitchen']),
        ]);

        $this->command->info('👨‍💼 Seeding Staff...');
        
        $staffs = collect();
        foreach ($hotels as $hotel) {
            foreach ($staffRoles as $role) {
                $staffCount = $faker->numberBetween(2, 5);
                for ($i = 1; $i <= $staffCount; $i++) {
                    $staffs->push(Staff::create([
                        'hotel_id' => $hotel->id,
                        'name' => $faker->name(),
                        'staff_role_id' => $role->id,
                        'phone' => $faker->phoneNumber(),
                        'email' => $faker->unique()->safeEmail(),
                        'password' => Hash::make('staff123'),
                        'status' => StaffConst::ACTIVE,
                    ]));
                }
            }
        }

        $this->command->info('🔗 Seeding Service-Staff relationships...');
        
        $spaServices = $services->filter(fn($s) => $s->serviceType->name === 'Spa & Wellness');
        $therapists = $staffs->filter(fn($s) => $s->staffRole->name === 'Spa Therapist');
        
        foreach ($spaServices as $service) {
            $hotelTherapists = $therapists->where('hotel_id', $service->hotel_id);
            foreach ($hotelTherapists->take(3) as $index => $therapist) {
                DB::table('service_staff')->insert([
                    'service_id' => $service->id,
                    'staff_id' => $therapist->id,
                    'is_primary' => $index === 0,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }

        $cleaningServices = $services->filter(fn($s) => $s->serviceType->name === 'Housekeeping');
        $housekeepers = $staffs->filter(fn($s) => $s->staffRole->name === 'Housekeeper');
        
        foreach ($cleaningServices as $service) {
            $hotelHousekeepers = $housekeepers->where('hotel_id', $service->hotel_id);
            foreach ($hotelHousekeepers->take(4) as $index => $housekeeper) {
                DB::table('service_staff')->insert([
                    'service_id' => $service->id,
                    'staff_id' => $housekeeper->id,
                    'is_primary' => $index === 0,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }

        $this->command->info('📅 Seeding Bookings...');
        
        $bookings = collect();
        $statuses = [BookingConst::PENDING, BookingConst::CONFIRMED, BookingConst::COMPLETED, BookingConst::CANCELLED];
        
        foreach ($users->take(15) as $user) {
            $bookingCount = $faker->numberBetween(1, 3);
            
            for ($b = 0; $b < $bookingCount; $b++) {
                $room = $rooms->random();
                $checkinDate = now()->subDays($faker->numberBetween(0, 60))->startOfDay();
                $nights = $faker->numberBetween(2, 7);
                $checkoutDate = $checkinDate->copy()->addDays($nights);
                $guests = $faker->numberBetween(1, $room->roomType->capacity);
                
                $roomPrice = $room->price * $nights;
                $status = $faker->randomElement($statuses);
                
                $booking = Booking::create([
                    'user_id' => $user->id,
                    'hotel_id' => $room->hotel_id,
                    'room_id' => $room->id,
                    'checkin_date' => $checkinDate,
                    'checkin_time' => $faker->randomElement(['14:00:00', '15:00:00', '16:00:00']),
                    'checkout_date' => $checkoutDate,
                    'checkout_time' => $faker->randomElement(['11:00:00', '12:00:00', '13:00:00']),
                    'guests' => $guests,
                    'room_price' => $roomPrice,
                    'services_price' => 0,
                    'total_price' => $roomPrice,
                    'special_requests' => $faker->boolean(30) ? $faker->sentence(8) : null,
                    'status' => $status,
                    'booking_code' => 'BK' . strtoupper($faker->bothify('???###')),
                ]);
                
                $bookings->push($booking);
            }
        }

        $this->command->info('🔗 Seeding Booking-Services relationships...');
        
        $additionalServices = $services->filter(function($service) {
            return !in_array($service->name, ['WiFi']);
        });

        foreach ($bookings as $booking) {
            if ($faker->boolean(50)) {
                $hotelServices = $additionalServices->where('hotel_id', $booking->hotel_id);
                $numServices = $faker->numberBetween(1, 3);
                $servicesPrice = 0;
                
                foreach ($hotelServices->random(min($numServices, $hotelServices->count())) as $service) {
                    $quantity = $faker->numberBetween(1, 3);
                    $price = $service->price * $quantity;
                    $servicesPrice += $price;
                    
                    DB::table('booking_services')->insert([
                        'booking_id' => $booking->id,
                        'service_id' => $service->id,
                        'quantity' => $quantity,
                        'price' => $price,
                        'scheduled_time' => $service->duration ? $booking->checkin_date->addHours($faker->numberBetween(10, 18)) : null,
                        'notes' => $faker->boolean(20) ? $faker->sentence(6) : null,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                }
                
                $booking->update([
                    'services_price' => $servicesPrice,
                    'total_price' => $booking->room_price + $servicesPrice,
                ]);
            }
        }

        $this->command->info('📆 Seeding Appointments...');
        
        $appointmentStatuses = [
            AppointmentConst::PENDING,
            AppointmentConst::CONFIRMED,
            AppointmentConst::COMPLETED,
            AppointmentConst::CANCELLED
        ];
        
        // Create appointments for services with staff
        $serviceableServices = $services->filter(fn($s) => $s->staff()->count() > 0);
        
        for ($i = 0; $i < 30; $i++) {
            $service = $serviceableServices->random();
            $staff = $service->staff->random();
            $startTime = now()->addDays($faker->numberBetween(-30, 30))->setHour($faker->numberBetween(9, 17))->setMinute(0);
            $duration = $service->duration ?? 60;
            $endTime = $startTime->copy()->addMinutes($duration);
            
            Appointment::create([
                'user_id' => $users->random()->id,
                'hotel_id' => $service->hotel_id,
                'service_id' => $service->id,
                'staff_id' => $staff->id,
                'start_time' => $startTime,
                'end_time' => $endTime,
                'price' => $service->price,
                'notes' => $faker->boolean(20) ? $faker->sentence(6) : null,
                'status' => $faker->randomElement($appointmentStatuses),
            ]);
        }

        // ============================================
        // 15. REVIEWS (Only for completed bookings)
        // ============================================
        $this->command->info('⭐ Seeding Reviews...');
        
        $completedBookings = $bookings->where('status', BookingConst::COMPLETED);
        
        foreach ($completedBookings->take(20) as $booking) {
            // 70% chance to have review for completed booking
            if ($faker->boolean(70)) {
                $overallRating = $faker->numberBetween(3, 5);
                $hasDetailedRatings = $faker->boolean(60);
                
                $reviewData = [
                    'user_id' => $booking->user_id,
                    'booking_id' => $booking->id,
                    'rating' => $overallRating,
                    'comment' => $faker->paragraph(3),
                ];
                
                if ($hasDetailedRatings) {
                    $reviewData['cleanliness_rating'] = $faker->numberBetween($overallRating - 1, 5);
                    $reviewData['service_rating'] = $faker->numberBetween($overallRating - 1, 5);
                    $reviewData['facilities_rating'] = $faker->numberBetween($overallRating - 1, 5);
                    $reviewData['location_rating'] = $faker->numberBetween($overallRating - 1, 5);
                    $reviewData['value_rating'] = $faker->numberBetween($overallRating - 1, 5);
                }
                
                // 30% chance to have images
                if ($faker->boolean(30)) {
                    $numImages = $faker->numberBetween(1, 4);
                    $reviewData['images'] = [];
                    for ($img = 0; $img < $numImages; $img++) {
                        $reviewData['images'][] = 'https://images.unsplash.com/photo-' . $faker->numberBetween(1500000000000, 1600000000000);
                    }
                }
                
                $review = Review::create($reviewData);
                
                // 40% chance hotel has responded
                if ($faker->boolean(40)) {
                    $review->update([
                        'hotel_response' => $faker->paragraph(2),
                        'hotel_response_at' => now()->subDays($faker->numberBetween(1, 10)),
                    ]);
                }
            }
        }

        // ============================================
        // 16. AVAILABILITIES (Next 30 days)
        // ============================================
        $this->command->info('📊 Seeding Availabilities...');
        
        foreach ($rooms as $room) {
            for ($day = 0; $day < 30; $day++) {
                $date = now()->addDays($day)->toDateString();
                
                // Check if room is booked on this date
                $isBooked = $bookings->where('room_id', $room->id)
                    ->where('status', '!=', BookingConst::CANCELLED)
                    ->filter(function($booking) use ($date) {
                        return $date >= $booking->checkin_date->toDateString() 
                            && $date < $booking->checkout_date->toDateString();
                    })
                    ->isNotEmpty();
                
                Availability::create([
                    'room_id' => $room->id,
                    'service_id' => null,
                    'date' => $date,
                    'is_available' => !$isBooked,
                ]);
            }
        }

        // ============================================
        // 17. POST CATEGORIES
        // ============================================
        $this->command->info('📂 Seeding Post Categories...');
        
        $postCategories = collect([
            PostCategory::create([
                'name' => 'Tin tức',
                'slug' => 'tin-tuc',
                'description' => 'Tin tức mới nhất về khách sạn',
                'order' => 1,
                'is_active' => true,
            ]),
            PostCategory::create([
                'name' => 'Khuyến mãi',
                'slug' => 'khuyen-mai',
                'description' => 'Các chương trình khuyến mãi đặc biệt',
                'order' => 2,
                'is_active' => true,
            ]),
            PostCategory::create([
                'name' => 'Du lịch',
                'slug' => 'du-lich',
                'description' => 'Chia sẻ về địa điểm du lịch',
                'order' => 3,
                'is_active' => true,
            ]),
            PostCategory::create([
                'name' => 'Sự kiện',
                'slug' => 'su-kien',
                'description' => 'Sự kiện tại khách sạn',
                'order' => 4,
                'is_active' => true,
            ]),
            PostCategory::create([
                'name' => 'Ẩm thực',
                'slug' => 'am-thuc',
                'description' => 'Khám phá ẩm thực',
                'order' => 5,
                'is_active' => true,
            ]),
        ]);

        // Subcategories
        PostCategory::create([
            'parent_id' => $postCategories[0]->id,
            'name' => 'Tin khách sạn',
            'slug' => 'tin-khach-san',
            'description' => 'Tin tức về khách sạn',
            'order' => 1,
            'is_active' => true,
        ]);

        PostCategory::create([
            'parent_id' => $postCategories[1]->id,
            'name' => 'Giảm giá phòng',
            'slug' => 'giam-gia-phong',
            'description' => 'Khuyến mãi giảm giá phòng',
            'order' => 1,
            'is_active' => true,
        ]);

        // ============================================
        // 18. POST TAGS
        // ============================================
        $this->command->info('🏷️  Seeding Post Tags...');
        
        $postTags = collect([
            PostTag::create(['name' => 'Khuyến mãi', 'slug' => 'khuyen-mai']),
            PostTag::create(['name' => 'Du lịch hè', 'slug' => 'du-lich-he']),
            PostTag::create(['name' => 'Nghỉ dưỡng', 'slug' => 'nghi-duong']),
            PostTag::create(['name' => 'Gia đình', 'slug' => 'gia-dinh']),
            PostTag::create(['name' => 'Spa', 'slug' => 'spa']),
            PostTag::create(['name' => 'Ẩm thực', 'slug' => 'am-thuc']),
            PostTag::create(['name' => 'Biển', 'slug' => 'bien']),
            PostTag::create(['name' => 'Núi', 'slug' => 'nui']),
            PostTag::create(['name' => 'Thành phố', 'slug' => 'thanh-pho']),
            PostTag::create(['name' => 'Tiết kiệm', 'slug' => 'tiet-kiem']),
        ]);

        // ============================================
        // 19. POSTS
        // ============================================
        $this->command->info('📝 Seeding Posts...');
        
        $adminAuthor = Admin::first();
        $posts = collect();
        
        $postTitles = [
            'Khám phá vẻ đẹp của biển cả cùng Grand Ocean Hotel',
            'Ưu đãi đặc biệt mùa hè - Giảm giá lên đến 30%',
            'Top 10 địa điểm du lịch không thể bỏ qua',
            'Trải nghiệm ẩm thực đỉnh cao tại nhà hàng 5 sao',
            'Chương trình Wellness Spa - Thư giãn hoàn hảo',
            'Tổ chức sự kiện tại Mountain View Resort',
            'Hướng dẫn đặt phòng khách sạn tiết kiệm',
            'Những điều cần biết khi đi du lịch Sapa',
            'Khám phá văn hóa ẩm thực miền Trung',
            'Kỳ nghỉ gia đình hoàn hảo tại City Center Plaza',
            'Bí quyết chọn phòng khách sạn phù hợp',
            'Chương trình khuyến mãi cuối năm',
            'Trải nghiệm dịch vụ spa cao cấp',
            'Du lịch bụi - Kinh nghiệm và lời khuyên',
            'Ẩm thực đường phố Sài Gòn',
        ];

        foreach ($postTitles as $index => $title) {
            $category = $postCategories->random();
            $isPublished = $faker->boolean(80);
            
            $post = Post::create([
                'author_id' => $adminAuthor->id,
                'post_category_id' => $category->id,
                'title' => $title,
                'slug' => Str::slug($title),
                'excerpt' => $faker->paragraph(2),
                'content' => implode("\n\n", $faker->paragraphs(8)),
                'featured_image' => 'https://images.unsplash.com/photo-' . $faker->numberBetween(1500000000000, 1700000000000),
                'status' => $isPublished ? PostConst::PUBLISHED : $faker->randomElement([PostConst::DRAFT, PostConst::PUBLISHED]),
                'is_featured' => $faker->boolean(20),
                'allow_comments' => true,
                'views' => $faker->numberBetween(50, 5000),
                'published_at' => $isPublished ? now()->subDays($faker->numberBetween(1, 60)) : null,
            ]);

            // Attach tags (2-4 tags per post)
            $numTags = $faker->numberBetween(2, 4);
            $post->tags()->attach($postTags->random($numTags)->pluck('id'));
            
            $posts->push($post);
        }

        // ============================================
        // 20. COMMENTS
        // ============================================
        $this->command->info('💬 Seeding Comments...');
        
        $publishedPosts = $posts->where('status', PostConst::PUBLISHED);
        
        foreach ($publishedPosts as $post) {
            if ($faker->boolean(70)) {
                $numComments = $faker->numberBetween(1, 5);
                
                for ($i = 0; $i < $numComments; $i++) {
                    $commenter = $users->random();
                    
                    $comment = Comment::create([
                        'post_id' => $post->id,
                        'parent_id' => null,
                        'commentable_type' => 'App\\Models\\User',
                        'commentable_id' => $commenter->id,
                        'content' => $faker->paragraph(2),
                        'is_approved' => $faker->boolean(90),
                    ]);

                    // Add replies (30% chance)
                    if ($faker->boolean(30)) {
                        $numReplies = $faker->numberBetween(1, 2);
                        
                        for ($j = 0; $j < $numReplies; $j++) {
                            Comment::create([
                                'post_id' => $post->id,
                                'parent_id' => $comment->id,
                                'commentable_type' => $faker->randomElement(['App\\Models\\User', 'App\\Models\\Admin']),
                                'commentable_id' => $faker->randomElement([$users->random()->id, $adminAuthor->id]),
                                'content' => $faker->paragraph(1),
                                'is_approved' => true,
                            ]);
                        }
                    }
                }
            }
        }

        // ============================================
        // 21. USER NOTIFICATIONS
        // ============================================
        $this->command->info('🔔 Seeding User Notifications...');
        
        foreach ($users->take(15) as $user) {
            // Booking confirmed notification
            if ($user->bookings()->count() > 0) {
                $booking = $user->bookings()->first();
                UserNotification::create([
                    'user_id' => $user->id,
                    'type' => 'booking_confirmed',
                    'title' => 'Đặt phòng thành công',
                    'message' => 'Đặt phòng #' . $booking->booking_code . ' của bạn đã được xác nhận.',
                    'data' => ['booking_id' => $booking->id, 'booking_code' => $booking->booking_code],
                    'action_url' => '/bookings/' . $booking->id,
                    'read_at' => $faker->boolean(50) ? now()->subDays($faker->numberBetween(1, 5)) : null,
                ]);
            }

            // Promotion notification
            if ($faker->boolean(70)) {
                UserNotification::create([
                    'user_id' => $user->id,
                    'type' => 'promotion',
                    'title' => 'Ưu đãi đặc biệt dành cho bạn',
                    'message' => 'Giảm giá 20% cho lần đặt phòng tiếp theo. Mã: SPECIAL20',
                    'data' => ['discount_code' => 'SPECIAL20', 'discount' => 20],
                    'action_url' => '/promotions',
                    'read_at' => $faker->boolean(30) ? now()->subDays($faker->numberBetween(1, 3)) : null,
                ]);
            }

            // Payment reminder
            if ($faker->boolean(40)) {
                UserNotification::create([
                    'user_id' => $user->id,
                    'type' => 'payment_reminder',
                    'title' => 'Nhắc nhở thanh toán',
                    'message' => 'Bạn có đơn đặt phòng cần thanh toán trong vòng 24h.',
                    'data' => ['deadline' => now()->addHours(24)->toIso8601String()],
                    'action_url' => '/bookings/pending',
                    'read_at' => null,
                ]);
            }
        }

        // ============================================
        // 22. STAFF NOTIFICATIONS
        // ============================================
        $this->command->info('🔔 Seeding Staff Notifications...');
        
        foreach ($staffs->take(10) as $staff) {
            // New appointment notification (urgent)
            StaffNotification::create([
                'staff_id' => $staff->id,
                'type' => 'new_appointment',
                'title' => 'Lịch hẹn mới - Khẩn cấp',
                'message' => 'Bạn có lịch hẹn mới vào ngày ' . now()->addDays(1)->format('d/m/Y H:i'),
                'data' => ['appointment_date' => now()->addDays(1)->format('Y-m-d'), 'time' => '10:00'],
                'action_url' => '/staff/appointments',
                'priority' => NotificationConst::PRIORITY_HIGH,
                'read_at' => null,
            ]);

            // Task assignment (normal)
            if ($faker->boolean(60)) {
                StaffNotification::create([
                    'staff_id' => $staff->id,
                    'type' => 'task_assigned',
                    'title' => 'Nhiệm vụ mới',
                    'message' => 'Bạn được phân công phục vụ phòng ' . $faker->numberBetween(101, 999),
                    'data' => ['room_number' => $faker->numberBetween(101, 999), 'task_type' => 'cleaning'],
                    'action_url' => '/staff/tasks',
                    'priority' => NotificationConst::PRIORITY_NORMAL,
                    'read_at' => $faker->boolean(40) ? now()->subHours($faker->numberBetween(1, 24)) : null,
                ]);
            }

            // Schedule change
            if ($faker->boolean(30)) {
                StaffNotification::create([
                    'staff_id' => $staff->id,
                    'type' => 'schedule_change',
                    'title' => 'Thay đổi lịch làm việc',
                    'message' => 'Lịch làm việc của bạn đã được cập nhật cho tuần tới.',
                    'data' => ['week' => now()->addWeek()->weekOfYear],
                    'action_url' => '/staff/schedule',
                    'priority' => NotificationConst::PRIORITY_NORMAL,
                    'read_at' => null,
                ]);
            }
        }

        // ============================================
        // 23. ADMIN NOTIFICATIONS
        // ============================================
        $this->command->info('🔔 Seeding Admin Notifications...');
        
        // New bookings (system notification - high priority)
        AdminNotification::create([
            'admin_id' => $adminAuthor->id,
            'type' => 'new_booking',
            'title' => 'Đặt phòng mới chờ xác nhận',
            'message' => 'Có ' . Booking::where('status', BookingConst::PENDING)->count() . ' đặt phòng mới chờ xác nhận.',
            'data' => ['pending_count' => Booking::where('status', BookingConst::PENDING)->count()],
            'action_url' => '/admin/bookings',
            'priority' => NotificationConst::PRIORITY_HIGH,
            'is_system' => true,
            'read_at' => null,
        ]);

        // New reviews (normal priority)
        AdminNotification::create([
            'admin_id' => $adminAuthor->id,
            'type' => 'new_review',
            'title' => 'Đánh giá mới từ khách hàng',
            'message' => 'Có ' . Review::count() . ' đánh giá mới từ khách hàng.',
            'data' => ['review_count' => Review::count(), 'avg_rating' => 4.5],
            'action_url' => '/admin/reviews',
            'priority' => NotificationConst::PRIORITY_NORMAL,
            'is_system' => false,
            'read_at' => null,
        ]);

        // Low inventory (urgent)
        AdminNotification::create([
            'admin_id' => $adminAuthor->id,
            'type' => 'system_alert',
            'title' => 'Cảnh báo: Phòng trống sắp hết',
            'message' => 'Chỉ còn ' . Room::where('status', RoomConst::AVAILABLE)->count() . ' phòng trống.',
            'data' => ['available_rooms' => Room::where('status', RoomConst::AVAILABLE)->count()],
            'action_url' => '/admin/rooms',
            'priority' => NotificationConst::PRIORITY_URGENT,
            'is_system' => true,
            'read_at' => null,
        ]);

        // Revenue report (normal)
        AdminNotification::create([
            'admin_id' => $adminAuthor->id,
            'type' => 'report',
            'title' => 'Báo cáo doanh thu tháng',
            'message' => 'Báo cáo doanh thu tháng ' . now()->format('m/Y') . ' đã sẵn sàng.',
            'data' => ['month' => now()->format('m'), 'year' => now()->format('Y')],
            'action_url' => '/admin/reports/revenue',
            'priority' => NotificationConst::PRIORITY_NORMAL,
            'is_system' => false,
            'read_at' => $faker->boolean(50) ? now()->subDays(1) : null,
        ]);

        // New staff registered
        AdminNotification::create([
            'admin_id' => $adminAuthor->id,
            'type' => 'staff_management',
            'title' => 'Nhân viên mới cần phê duyệt',
            'message' => 'Có yêu cầu đăng ký từ nhân viên mới.',
            'data' => ['staff_name' => 'Nguyễn Văn A'],
            'action_url' => '/admin/staff/pending',
            'priority' => NotificationConst::PRIORITY_NORMAL,
            'is_system' => false,
            'read_at' => null,
        ]);

        $this->command->info('');
        $this->command->info('✅ Seeding completed successfully!');
        $this->command->info('');
        $this->command->info('📊 Summary:');
        $this->command->info("   - Admins: " . Admin::count());
        $this->command->info("   - Hotel Owners: " . HotelOwner::count());
        $this->command->info("   - Users: " . User::count());
        $this->command->info("   - Hotels: " . Hotel::count());
        $this->command->info("   - Room Types: " . RoomType::count());
        $this->command->info("   - Rooms: " . Room::count());
        $this->command->info("   - Service Types: " . ServiceType::count());
        $this->command->info("   - Services: " . Service::count());
        $this->command->info("   - Staff Roles: " . StaffRole::count());
        $this->command->info("   - Staff: " . Staff::count());
        $this->command->info("   - Bookings: " . Booking::count());
        $this->command->info("   - Appointments: " . Appointment::count());
        $this->command->info("   - Reviews: " . Review::count());
        $this->command->info("   - Availabilities: " . Availability::count());
        $this->command->info("   - Post Categories: " . PostCategory::count());
        $this->command->info("   - Posts: " . Post::count());
        $this->command->info("   - Post Tags: " . PostTag::count());
        $this->command->info("   - Comments: " . Comment::count());
        $this->command->info("   - User Notifications: " . UserNotification::count());
        $this->command->info("   - Staff Notifications: " . StaffNotification::count());
        $this->command->info("   - Admin Notifications: " . AdminNotification::count());
        $this->command->info('');
        $this->command->info('🔐 Test Credentials:');
        $this->command->info('   Admin: admin@example.com / admin123');
        $this->command->info('   Hotel Owner: owner@hotel.com / password123');
        $this->command->info('   User: user@example.com / password');
        $this->command->info('   Staff: (any staff email) / staff123');
    }
}
