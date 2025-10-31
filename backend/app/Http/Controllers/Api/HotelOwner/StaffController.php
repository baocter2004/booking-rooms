<?php

namespace App\Http\Controllers\Api\HotelOwner;

use App\Http\Controllers\ApiController;
use App\Models\Hotel;
use App\Models\Staff;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class StaffController extends ApiController
{
    /**
     * Get all staff for owner's hotels
     */
    public function index(Request $request): JsonResponse
    {
        $ownerId = auth('hotel_owner')->id();
        $hotelId = $request->input('hotel_id');

        $query = Staff::query()
            ->whereHas('hotel', function($q) use ($ownerId) {
                $q->where('hotel_owner_id', $ownerId);
            })
            ->with(['hotel', 'staffRole']);

        if ($hotelId) {
            $query->where('hotel_id', $hotelId);
        }

        if ($search = $request->input('search')) {
            $query->where(function($q) use ($search) {
                $q->where('name', 'LIKE', "%{$search}%")
                  ->orWhere('email', 'LIKE', "%{$search}%")
                  ->orWhere('phone', 'LIKE', "%{$search}%");
            });
        }

        $perPage = $request->input('per_page', 15);
        $staff = $query->latest()->paginate($perPage);

        return $this->json($staff);
    }

    /**
     * Get single staff
     */
    public function show($id): JsonResponse
    {
        $ownerId = auth('hotel_owner')->id();
        
        $staff = Staff::whereHas('hotel', function($q) use ($ownerId) {
                $q->where('hotel_owner_id', $ownerId);
            })
            ->with(['hotel', 'staffRole', 'services'])
            ->findOrFail($id);

        return $this->json($staff);
    }

    /**
     * Create new staff
     */
    public function create(Request $request): JsonResponse
    {
        $ownerId = auth('hotel_owner')->id();

        $validated = $request->validate([
            'hotel_id' => [
                'required',
                'integer',
                Rule::exists('hotels', 'id')->where('hotel_owner_id', $ownerId)
            ],
            'staff_role_id' => 'required|integer|exists:staff_roles,id',
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:staff,email',
            'password' => 'required|string|min:6',
            'phone' => 'nullable|string|max:20',
            'avatar' => 'nullable|string|max:500',
            'status' => 'nullable|integer|in:0,1',
        ]);

        $staff = Staff::create($validated);
        $staff->load(['hotel', 'staffRole']);

        return $this->json($staff, JsonResponse::HTTP_CREATED, 'Staff created successfully');
    }

    /**
     * Update staff
     */
    public function edit($id, Request $request): JsonResponse
    {
        $ownerId = auth('hotel_owner')->id();
        
        $staff = Staff::whereHas('hotel', function($q) use ($ownerId) {
                $q->where('hotel_owner_id', $ownerId);
            })
            ->findOrFail($id);

        $validated = $request->validate([
            'staff_role_id' => 'sometimes|required|integer|exists:staff_roles,id',
            'name' => 'sometimes|required|string|max:255',
            'email' => [
                'sometimes',
                'required',
                'email',
                'max:255',
                Rule::unique('staff', 'email')->ignore($id)
            ],
            'password' => 'nullable|string|min:6',
            'phone' => 'nullable|string|max:20',
            'avatar' => 'nullable|string|max:500',
            'status' => 'nullable|integer|in:0,1',
        ]);

        if (empty($validated['password'])) {
            unset($validated['password']);
        }

        $staff->update($validated);
        $staff->load(['hotel', 'staffRole']);

        return $this->json($staff, JsonResponse::HTTP_OK, 'Staff updated successfully');
    }

    /**
     * Delete staff
     */
    public function destroy($id): JsonResponse
    {
        $ownerId = auth('hotel_owner')->id();
        
        $staff = Staff::whereHas('hotel', function($q) use ($ownerId) {
                $q->where('hotel_owner_id', $ownerId);
            })
            ->findOrFail($id);

        $staff->delete();

        return $this->json(['status' => true], JsonResponse::HTTP_OK, 'Staff deleted successfully');
    }
}
