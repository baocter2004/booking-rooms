<?php

namespace App\Http\Requests\Admin\Hotels;

use App\Constants\RoomConst;
use App\Constants\StaffConst;
use App\Http\Requests\BaseAdminRequest;
use Illuminate\Validation\Rule;

class PostHotelRequest extends BaseAdminRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $hotelId = $this->route('id');
        
        return [
            'name' => 'required|string|max:255',
            'address' => 'required|string|max:500',
            'phone' => 'required|string|max:20',
            'email' => [
                'required',
                'email',
                'max:255',
                Rule::unique('hotels', 'email')->ignore($hotelId)
            ],
            'description' => 'nullable|string',
            'image_url' => 'nullable|string|max:500',
            
            'images' => 'nullable|array|max:5',
            'images.*' => 'required|string|max:500',

            'services' => 'nullable|array',
            'services.*.id' => 'nullable|integer|exists:services,id',
            'services.*.service_type_id' => 'required_with:services|integer|exists:service_types,id',
            'services.*.name' => 'required_with:services|string|max:255',
            'services.*.description' => 'nullable|string',
            'services.*.price' => 'nullable|numeric|min:0',
            'services.*.duration' => 'nullable|integer|min:0',
            'services.*.image_url' => 'nullable|string|max:500',

            'rooms' => 'nullable|array',
            'rooms.*.id' => 'nullable|integer|exists:rooms,id',
            'rooms.*.room_type_id' => 'required_with:rooms|integer|exists:room_types,id',
            'rooms.*.number' => 'required_with:rooms|string|max:50',
            'rooms.*.price' => 'required_with:rooms|numeric|min:0',
            'rooms.*.status' => ['nullable', 'integer', Rule::in(array_keys(RoomConst::STATUS))],
            'rooms.*.image_url' => 'nullable|string|max:500',
            'rooms.*.description' => 'nullable|string',
            'rooms.*.images' => 'nullable|array|max:5',
            'rooms.*.images.*' => 'required|string|max:500',

            'staff' => 'nullable|array',
            'staff.*.id' => 'nullable|integer|exists:staff,id',
            'staff.*.staff_role_id' => 'required_with:staff|integer|exists:staff_roles,id',
            'staff.*.name' => 'required_with:staff|string|max:255',
            'staff.*.email' => 'required_with:staff|email|max:255',
            'staff.*.password' => 'nullable|string|min:6',
            'staff.*.phone' => 'nullable|string|max:20',
            'staff.*.avatar' => 'nullable|string|max:500',
            'staff.*.status' => ['nullable', 'integer', Rule::in(array_keys(StaffConst::STATUS))],
        ];
    }

    /**
     * Configure the validator instance.
     */
    public function withValidator($validator): void
    {
        $validator->after(function ($validator) {
            $staff = $this->input('staff', []);

            foreach ($staff as $index => $staffData) {
                if (isset($staffData['email'])) {
                    $query = \App\Models\Staff::where('email', $staffData['email']);

                    // Nếu đang update (có id), ignore id đó
                    if (isset($staffData['id'])) {
                        $query->where('id', '!=', $staffData['id']);
                    }

                    if ($query->exists()) {
                        $validator->errors()->add(
                            "staff.{$index}.email",
                            'The email has already been taken.'
                        );
                    }
                }
            }
        });
    }
}
