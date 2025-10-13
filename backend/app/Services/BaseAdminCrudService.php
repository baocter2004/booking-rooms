<?php

namespace App\Services;

use App\Constants\GlobalConst;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

abstract class BaseAdminCrudService extends BaseService
{
    public function search(array $params = [], $limit = GlobalConst::LIMIT_DEFAULT): LengthAwarePaginator
    {
        return $this->paginate($params, $limit);
    }

    public function all(array $params): Collection
    {
        return $this->get($params);
    }

    public function prepareExportData($params)
    {
        return $params;
    }
}
