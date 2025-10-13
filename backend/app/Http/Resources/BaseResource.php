<?php

declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Resources\MissingValue;

abstract class BaseResource extends JsonResource
{
    protected bool $showDetail = false;

    public function __construct($resource, bool $showDetail = NULL)
    {
        parent::__construct($resource);
        if ($showDetail) {
            $this->showDetail = $showDetail;
        }
    }

    /**
     * @param Request $request
     * @return array<string, mixed>
     */
    final public function toArray(Request $request)
    {
        return $this->showDetail ? $this->toDetail($request) : $this->toList($request);
    }

      /**
     * @param Request $request
     * @return array<string, mixed>
     */
    abstract protected function toList(Request $request): array;

      /**
     * @param Request $request
     * @return array<string, mixed>
     */
    abstract protected function toDetail(Request $request): array;

     /**
     * @param string $relation
     * @return Model|null
     */
    protected function getLoaded(string $relation): ?Model
    {
        $relations = explode('.',$relation);
        $model = $this->whenLoaded($relations[0]);
        $model = $model instanceof MissingValue ? null : $model;
        if (!$model) {
            return null;
        }

        unset($relation[0]);

        foreach ($relations as $relationship) {
            $model = $model->relationLoaded($relationship) ? $model->{$relationship} : null;
            if (!$model) {
                break;
            }
        }

        return $model;
    }
}
