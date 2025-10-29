<?php

namespace App\Services\HotelOwner;

use App\Models\Hotel;
use App\Repositories\HotelRepository;
use App\Services\BaseAdminCrudService;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;

class HotelService extends BaseAdminCrudService
{
    protected function getRepository(): HotelRepository
    {
        if (empty($this->repository)) {
            $this->repository = app()->make(HotelRepository::class);
        }

        return $this->repository;
    }

    protected function buildFilterParams(array $params = []): array
    {
        $wheres = Arr::get($params, 'wheres', []);
        $whereEquals = Arr::get($params, 'where_equals', []);
        $whereIns = Arr::get($params, 'where_ins', []);
        $whereLikes = Arr::get($params, 'likes', []);
        $orWheres = Arr::get($params, 'or_wheres', []);
        $sort = Arr::get($params, 'sort', 'created_at:desc');
        $relates = Arr::get($params, 'relates', []);
        $relatesCount = Arr::get($params, 'relates_count', ['rooms', 'staff', 'bookings', 'services']);

        // Filter by owner
        if (!empty($params['hotel_owner_id'])) {
            $whereEquals[] = ['hotel_owner_id', '=', $params['hotel_owner_id']];
        }

        if (!empty($params['from_date'])) {
            $whereEquals[] = ['created_at', '>=', $params['from_date']];
        }

        if (!empty($params['to_date'])) {
            $whereEquals[] = ['created_at', '<=', $params['to_date']];
        }

        if (!empty($params['search'])) {
            $searchTerm = $params['search'];
            $orWheres['name'] = ['LIKE', '%' . $searchTerm . '%'];
            $orWheres['address'] = ['LIKE', '%' . $searchTerm . '%'];
            $orWheres['email'] = ['LIKE', '%' . $searchTerm . '%'];
            $orWheres['phone'] = ['LIKE', '%' . $searchTerm . '%'];
        }

        if (!empty($params['status'])) {
            $whereEquals[] = ['status', '=', $params['status']];
        }

        return [
            'wheres' => $wheres,
            'likes' => $whereLikes,
            'or_wheres' => $orWheres,
            'where_equals' => $whereEquals,
            'where_ins' => $whereIns,
            'sort' => $sort,
            'relates' => $relates,
            'relates_count' => $relatesCount,
        ];
    }

    public function create(array $params = []): Model
    {
        return DB::transaction(function () use ($params) {
            $hotelData = Arr::only($params, [
                'hotel_owner_id',
                'name',
                'address',
                'phone',
                'email',
                'description',
                'image_url',
                'status'
            ]);

            $hotel = parent::create($hotelData);

            if (!empty($params['images']) && is_array($params['images'])) {
                foreach ($params['images'] as $index => $imageUrl) {
                    $hotel->images()->create([
                        'image_url' => $imageUrl,
                        'order' => $index,
                    ]);
                }
            }

            return $hotel->load(['owner', 'images', 'services', 'rooms', 'staff']);
        });
    }

    public function update(int|string $id, array $params = []): Hotel
    {
        return DB::transaction(function () use ($id, $params) {
            $hotelData = Arr::only($params, [
                'name',
                'address',
                'phone',
                'email',
                'description',
                'image_url',
                'status'
            ]);

            $hotel = parent::update($id, $hotelData);

            if (isset($params['images']) && is_array($params['images'])) {
                $hotel->images()->delete();
                foreach ($params['images'] as $index => $imageUrl) {
                    $hotel->images()->create([
                        'image_url' => $imageUrl,
                        'order' => $index,
                    ]);
                }
            }

            return $hotel->load(['owner', 'images', 'services', 'rooms', 'staff']);
        });
    }

    public function find(int|string $id, array $params = []): ?Hotel
    {
        if (empty($params)) {
            $params = [
                'relates' => ['owner', 'images', 'services.serviceType', 'rooms.roomType', 'staff.staffRole'],
                'relates_count' => ['rooms', 'staff', 'bookings', 'services']
            ];
        }

        return parent::find($id, $params);
    }
}

