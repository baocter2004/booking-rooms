<?php

namespace App\Services;

use App\Constants\GlobalConst;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use \Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Pagination\LengthAwarePaginator as LengthAwarePag;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Hash;

abstract class BaseService
{
    protected BaseRepository|null $repository = null;

    abstract protected function getRepository(): BaseRepository;

    /**
     * @return array{
     *     where_equals: ?array<mixed>,
     *     wheres: ?array<mixed>,
     *     where_likes: ?array<mixed>
     *     likes: ?array<mixed>
     *     where_ins: ?array<string, array>
     *     where_not_ins: ?array<string, array>
     *     where_has: ?array<mixed>
     *     or_wheres: ?array<mixed>
     *     in_month: ?array<string, string>
     *     where_raw: ?array<mixed>
     *     not_null: ?array<string>
     *     is_null: ?array<string>
     *     sort: ?string
     *     sorts: array<string, mixed>
     *     relates: ?array<mixed>
     * }
     */
    abstract protected function buildFilterParams(array $params): array;

    public function __construct()
    {
        $this->setRepository();
    }

    private function setRepository()
    {
        $repository = $this->getRepository();
        if (!($repository instanceof BaseRepository)) {
            throw new \Exception('Repository not found');
        }
        $this->repository = $repository;
    }

    public function get(array $params = []): Collection
    {
        return $this->filter($params)->get();
    }

    public function paginate(array $params = [], $limit = GlobalConst::LIMIT_DEFAULT): LengthAwarePaginator
    {
        if (!empty($params['limit'])) {
            $limit = $params['limit'];
        }

        return $this->filter($params)->paginate($limit);
    }

    public function filter(array $params = []): Builder
    {
        return $this->getRepository()->filter($this->buildFilterParams($params));
    }

    public function find(int|string $id, array $params = []): ?Model
    {
        if (empty($params)) {
            return $this->getRepository()->find($id);
        }
        $params['wheres'] = array_merge($params['wheres'] ?? [], [['id', '=', $id]]);
        return $this->filter($params)->first();
    }

    public function findBy(array $params = []): ?Model
    {
        return $this->filter($params)->first();
    }

    public function create(array $params = []): Model
    {
        $params = $this->hashPassword($params);
        $item = $this->getRepository()->create($params);

        return $item;
    }

    public function insert(array $params = [])
    {
        $item = $this->getRepository()->insert($params);

        return $item;
    }

    public function update(int|string $id, array $params = []): Model
    {
        $params = $this->hashPassword($params);

        $item = $this->getRepository()->update($id, $params);

        return $item;
    }

    public function delete($id)
    {
        return $this->getRepository()->delete($id);
    }


    public function deleteAll(array $ids)
    {
        return $this->getRepository()->deleteAll($ids);
    }

    public function next($id, array $params = [])
    {
        $params['wheres'] = $params['wheres'] ?? [];
        $params['wheres'][] = ['id', '>', $id];
        $params['sort'] = 'id:asc';

        return $this->getRepository()->filter($params)->first();
    }

    public function prev($id, array $params = [])
    {
        $params['wheres'] = $params['wheres'] ?? [];
        $params['wheres'][] = ['id', '<', $id];
        $params['sort'] = 'id:desc';

        return $this->getRepository()->filter($params)->first();
    }

    protected function hashPassword($params)
    {
        if (!empty($value = Arr::get($params, 'password'))) {
            if ($salt = Arr::get($params, 'password_salt')) {
                $params['password'] = Hash::make($value, ['salt' => $salt]);
            } else {
                $params['password'] = Hash::make($value);
            }
        } else {
            // remove null or empty string password
            unset($params['password']);
            unset($params['password_salt']);
        }

        return $params;
    }

    public function createOrUpdate($params, $instance = null)
    {
        return $this->getRepository()->createOrUpdate($params, $instance);
    }

    public function getLastId()
    {
        if ($lastest = $this->getRepository()->lastest())
            return $lastest->id;

        return 0;
    }

    public function checkExist($column, $value)
    {
        return $this->getRepository()->existOrNot($value, $column);
    }

    public function getPaginateForPage($data, int $total, ?int $perPage, int $currentPage)
    {
        return new LengthAwarePag($data, $total, $perPage, $currentPage, [
            'path' => LengthAwarePag::resolveCurrentPath(),
            'pageName' => 'page',
        ]);
    }

    public function updateOrCreate(array $values, array $attributes = [])
    {
        return $this->getRepository()->updateOrCreate($values, $attributes);
    }

    public function searchMinMax(
        array $params,
        Builder $query,
        string $minColumn = 'min_duration',
        string $maxColumn = 'max_duration',
        string $minKey = null,
        string $maxKey = null
    ): void
    {
        $minKey = $minKey ?? $minColumn;
        $maxKey = $maxKey ?? $maxColumn;
        $min = Arr::get($params, $minKey);
        $max = Arr::get($params, $maxKey);
        $min = isset($min) ? (float)$min : 0;
        $max = isset($max) ? (int)$max : 999;

        $query->where(function ($subQuery) use ($min, $max, $minColumn, $maxColumn) {
            if (isset($min) && isset($max)) {
                $subQuery->orWhere(function ($query1) use ($minColumn, $maxColumn, $min, $max) {
                    $query1->where($minColumn, '>=', $min)
                        ->where($maxColumn, '<=', $max);
                })
                    ->orWhere(function ($query1) use ($min, $max, $minColumn, $maxColumn) {
                        $query1->where($minColumn, '>=', 0)
                            ->where(function ($query2) use ($min, $max, $maxColumn) {
                                $query2->where($maxColumn, '>=', $min)
                                    ->where($maxColumn, '<=', $max);
                            });
                    })
                    ->orWhere(function ($query1) use ($min, $max, $minColumn, $maxColumn) {
                        $query1->where(function ($query2) use ($min, $max, $minColumn) {
                            $query2->where($minColumn, '>=', $min)
                                ->where($minColumn, '<=', $max);
                        })
                            ->where($maxColumn, '<=', 999);
                    })
                    ->orWhere(function ($query1) use ($min, $max, $minColumn, $maxColumn) {
                        $query1->where(function ($query2) use ($min, $max, $minColumn, $maxColumn) {
                            $query2->where($minColumn, '=', 0)
                                ->where($maxColumn, '=', 999);
                        });
                    })
                    ->orWhere(function ($query1) use ($min, $max, $minColumn, $maxColumn) {
                        $query1->where(function ($query2) use ($min, $max, $minColumn, $maxColumn) {
                            $query2->where($minColumn, '<=', $min)
                                ->where($maxColumn, '>=', $max);
                        });
                    });
            } elseif (isset($min)) {
                $subQuery->where($minColumn, '>=', $min)
                    ->orWhere($minColumn, 0)
                    ->orWhere($minColumn, 999)
                    ->orWhere($maxColumn, 0)
                    ->orWhere($maxColumn, 999);
            } elseif (isset($max)) {
                $subQuery->where($maxColumn, '<=', $max)
                    ->orWhere($minColumn, 0)
                    ->orWhere($minColumn, 999)
                    ->orWhere($maxColumn, 0)
                    ->orWhere($maxColumn, 999);
            }
        });
    }
}
