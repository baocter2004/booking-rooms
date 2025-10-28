<?php

namespace App\Http\Requests\Admin\Rooms;

use App\Http\Requests\BaseAdminRequest;
use Illuminate\Validation\Rule;
use App\Constants\RoomConst;

class GetRoomRequest extends BaseAdminRequest
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
            'description' => 'nullable|string',
            'image_url' => 'nullable|url|max:500',
            'price' => 'nullable|numeric|min:0',
            'status' => [
                'nullable',
                Rule::in(RoomConst::STATUS),
            ],
        ];
    }
}
