<?php

namespace App\Http\Requests\Admin\Users;

use App\Http\Requests\BaseAdminRequest;
use Illuminate\Validation\Rule;

class PostUserRequest extends BaseAdminRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $userId = $this->segment(4);
        return [
            'name' => [
                'required',
                'string',
                'max:100'
            ],
            'email' => [
                'required',
                'email',
                Rule::unique('users', 'email')->ignore($userId),
            ],
            'password' => [
                $userId ? 'nullable' : 'required',
                'string',
                'min:6',
                'confirmed'
            ],
            'phone' => [
                'nullable',
                'string',
                'max:15',
            ],
            'avatar' => [
                'nullable',
                'image',
                'mimes:jpg,jpeg,png,webp',
                'max:2048',
            ],
        ];
    }
}
