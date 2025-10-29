<?php

namespace App\Http\Requests\HotelOwner\Hotels;

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
            'status' => 'nullable|integer|in:0,1',
            
            'images' => 'nullable|array|max:10',
            'images.*' => 'required|string|max:500',
        ];
    }

    /**
     * Merge authenticated hotel_owner_id into request
     */
    protected function prepareForValidation(): void
    {
        $this->merge([
            'hotel_owner_id' => auth('hotel_owner')->id(),
        ]);
    }
}
