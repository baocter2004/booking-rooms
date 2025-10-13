<?php

namespace App\Traits;

trait hasBuildQuery
{
    protected function buildWhereBetween(array $params)
    {
        $data = [];
        foreach ($params as $key => $param) {
            if (empty($params)) continue;
            $data[$key] = is_string($param) ? explode(',', $param) : $param;
        }
        return $data;
    }
    
     protected function buildWhereEqual(array $params)
    {
        return $this->cleanValueNull($params);
    }

    protected function buildWhereIn(array $params)
    {
        return $this->cleanValueNull($params);
    }

    protected function buildWhereLike(array $params)
    {
        $wheres = [];
        $params = $this->cleanValueNull($params);
        foreach ($params as $key => $value) {
            $wheres[] = [$key, 'LIKE', '%' . $value . '%'];
        }

        return $wheres;
    }

    protected function buildSort($sort)
    {
        if (empty($sort) || !str_contains($sort, ':')) return [];
        $sorts = explode(':', $sort);

        if (count($sorts) !== 2 || !in_array($sorts[1], ['asc', 'desc', 'ASC', 'DESC'])) {
            return [];
        }
        return [
            'column'    => $sorts[0],
            'direction' => $sorts[1],
        ];
    }

    protected function cleanValueNull($params)
    {
        return array_filter($params, function ($value) {
            return !is_null($value);
        });
    }
}
