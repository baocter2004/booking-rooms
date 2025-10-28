<?php

namespace App\Http\Requests\Admin\room_types;

use App\Http\Requests\BaseAdminRequest;
use Illuminate\Validation\Rule;

class PostRoomTypeRequest extends BaseAdminRequest
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
            'name' => [
                'required',
                'string',
                'max:100',
                Rule::unique('room_types', 'name')->ignore($hotelId),
            ],
            'display_name' => [
                'required',
                'string',
                'max:100',
                Rule::unique('room_types', 'display_name')->ignore($hotelId),
            ],
            'base_price' => [
                'required',
                'numeric',
                'min:0',
            ],
            'description' => [
                'required',
            ],
            'capacity' => [
                'required',
                'integer',
                'min:1',
            ],
        ];
    }
}
