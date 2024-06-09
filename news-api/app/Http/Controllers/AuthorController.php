<?php

namespace App\Http\Controllers;

use App\Models\Author;
use Illuminate\Http\Request;
use App\Http\Resources\AuthorResource;
use Illuminate\Support\Facades\Validator;

class AuthorController extends Controller
{
    public function index(Request $request)
    {
        // Fetch authors with optional filtering
        $query = Author::query();

        // Apply search filter
        if ($request->has('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        // Get authors with pagination
        $authors = $query->get();

        // Return the paginated authors wrapped in AuthorResource
        return AuthorResource::collection($authors);
    }
}
