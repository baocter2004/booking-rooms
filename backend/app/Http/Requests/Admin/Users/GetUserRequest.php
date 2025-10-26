<?php

namespace App\Http\Requests\Admin\Users;

use App\Http\Requests\BaseAdminRequest;

class GetUserRequest extends BaseAdminRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'nullable',
            'email' => 'nullable',
            'phone' => 'nullable',
            'from_date' => 'date|nullable',
            'to_date' => 'date|nullable'
        ];
    }
}
