<?php

namespace App\Http\Requests\Admin\RoomTypes;

use App\Http\Requests\BaseAdminRequest;

class GetRoomTypeRequest extends BaseAdminRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'from_date' => 'nullable',
            'to_date' => 'nullable',
            'name' => 'nullable',
            'display_name' => 'nullable',
            'description' => 'nullable',
            'capacity' => 'nullable',
            'from_base_price' => 'nullable',
            'to_base_price' => 'nullable',
        ];
    }
}
