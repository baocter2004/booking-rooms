<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class UploadController extends ApiController
{
    public function uploadImage(Request $request): JsonResponse
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
            'folder' => 'nullable|string|in:hotels,users,rooms,services,posts',
        ]);

        try {
            $folder = $request->input('folder', 'images');
            $image = $request->file('image');
            
            $filename = time() . '_' . Str::random(10) . '.' . $image->getClientOriginalExtension();
            
            $path = $image->storeAs($folder, $filename, 'public');
            
            // Get full URL
            $url = Storage::url($path);
            
            return $this->json([
                'url' => $url,
                'path' => $path,
                'filename' => $filename,
            ], JsonResponse::HTTP_OK, 'Image uploaded successfully');
            
        } catch (\Exception $e) {
            return $this->json(
                statusCode: JsonResponse::HTTP_INTERNAL_SERVER_ERROR,
                message: 'Failed to upload image: ' . $e->getMessage()
            );
        }
    }

    public function deleteImage(Request $request): JsonResponse
    {
        $request->validate([
            'path' => 'required|string',
        ]);

        try {
            $path = $request->input('path');
            
            // Remove leading slash if present
            $path = ltrim($path, '/');
            
            // Remove /storage/ prefix if present
            $path = str_replace('storage/', '', $path);
            
            if (Storage::disk('public')->exists($path)) {
                Storage::disk('public')->delete($path);
                return $this->json([], JsonResponse::HTTP_OK, 'Image deleted successfully');
            }
            
            return $this->json(
                statusCode: JsonResponse::HTTP_NOT_FOUND,
                message: 'Image not found'
            );
            
        } catch (\Exception $e) {
            return $this->json(
                statusCode: JsonResponse::HTTP_INTERNAL_SERVER_ERROR,
                message: 'Failed to delete image: ' . $e->getMessage()
            );
        }
    }
}

