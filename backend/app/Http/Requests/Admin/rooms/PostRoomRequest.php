<?php

namespace App\Http\Requests\Admin\rooms;

use App\Constants\RoomConst;
use App\Http\Requests\BaseAdminRequest;
use Illuminate\Validation\Rule;

class PostRoomRequest extends BaseAdminRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image_url' => 'nullable|url|max:500',
            'price' => 'required|numeric|min:0',
            'status' => [
                'nullable',
                Rule::in(RoomConst::STATUS),
            ],
        ];
    }
}
