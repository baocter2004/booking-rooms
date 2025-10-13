<?php

namespace App\Http\Controllers;

use App\Constants\GlobalConst;
use App\Helpers\Constant;
use App\Http\Requests\BaseAdminRequest;
use App\Http\Resources\BaseResource;
use App\Services\BaseAdminCrudService;
use BaseResourceCollection;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

abstract class BaseCrudController extends ApiController
{
    /**
     * @var BaseAdminCrudService|null
     */
    protected BaseAdminCrudService|null $service = null;

    /**
     * @throws Exception
     */
    public function __construct()
    {
        $this->setService();
    }

    /**
     * @return void
     * @throws Exception
     */
    private function setService()
    {
        $service = $this->getService();
        if (!($service instanceof BaseAdminCrudService)) {
            throw new Exception('Service not found');
        }
        $this->service = $service;
    }

    /**
     * @return BaseAdminCrudService
     */
    abstract protected function getService(): BaseAdminCrudService;

    /**
     * @param $id
     * @return BaseAdminRequest
     */
    abstract function getFormRequest($id = null): BaseAdminRequest;

    /**
     * @return BaseAdminRequest
     */
    abstract function getListRequest(): BaseAdminRequest;

    /**
     * @param $data
     * @return BaseResourceCollection
     */
    abstract function getResourceCollection($data): BaseResourceCollection;

    /**
     * @param $data
     * @return BaseResource
     */
    abstract function getJsonResource($data): BaseResource;

    /**
     * @param $id
     * @return BaseAdminRequest
     */
    protected function getListFormRequest($id = null): BaseAdminRequest
    {
        return $this->getFormRequest($id);
    }

    /**
     * @return array
     */
    protected function getHeadersExport(): array
    {
        return [];
    }

    /**
     * @param Request $request
     * @param string $action
     * @return array
     */
    protected function getDataValidated(Request $request, string $action = 'index'): array
    {
        return $request->validated();
    }

    /**
     * @return BaseResourceCollection
     */
    public function index(): BaseResourceCollection
    {
        $request = $this->getListRequest();
        $data = $this->service->search($this->getDataValidated($request, 'index'), $request->limit ?? GlobalConst::LIMIT_DEFAULT);

        return $this->getResourceCollection($data);
    }

    /**
     * @return BaseResourceCollection
     */
    public function all(): BaseResourceCollection
    {
        $request = $this->getListRequest();
        $data = $this->service->get($this->getDataValidated($request, 'all'));

        return $this->getResourceCollection($data);
    }

    /**
     * @param $id
     * @return BaseResource
     */
    public function show($id): BaseResource
    {
        $data = $this->service->find($id);

        if (!$data) {
            throw new ModelNotFoundException(__CLASS__ . " id=${id} not found");
        }

        return $this->getJsonResource($data);
    }

    /**
     * @return BaseResource
     */
    public function create(): BaseResource
    {
        $request = $this->getFormRequest();
        $data = $this->service->create($this->getDataValidated($request, 'create'));

        return $this->getJsonResource($data);
    }

    /**
     * @param int|string $id
     * @return BaseResource
     */
    public function edit(int|string $id): BaseResource
    {
        $request = $this->getFormRequest($id);
        $data = $this->service->update($id, $this->getDataValidated($request, 'edit'));

        return $this->getJsonResource($data);
    }

    /**
     * @param int|string $id
     * @return BaseResource
     */
    public function editList(int|string $id): BaseResource
    {
        $request = $this->getListFormRequest($id);
        $data = $this->service->update($id, $this->getDataValidated($request, 'editList'));

        return $this->getJsonResource($data);
    }

    /**
     * @param $id
     * @return JsonResponse
     */
    public function destroy($id): JsonResponse
    {
        $result = $this->service->delete($id);
        return $this->json([
            'status' => !!$result
        ], $result ? 200 : 500);
    }
}
