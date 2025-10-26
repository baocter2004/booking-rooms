<?php

namespace App\Http\Requests\Admin\hotels;

use App\Http\Requests\BaseAdminRequest;

class GetHotelRequest extends BaseAdminRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'search' => 'nullable|string|max:255',
            'name' => 'nullable|string|max:255',
            'address' => 'nullable|string|max:500',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:20',
            'from_date' => 'nullable|date',
            'to_date' => 'nullable|date|after_or_equal:from_date',
            'page' => 'nullable|integer|min:1',
            'per_page' => 'nullable|integer|min:1|max:100',
            'sort' => 'nullable|string',
            'rooms_page' => 'nullable|integer|min:1',
            'rooms_per_page' => 'nullable|integer|min:1|max:100',
            'staff_page' => 'nullable|integer|min:1',
            'staff_per_page' => 'nullable|integer|min:1|max:100',
        ];
    }
}
