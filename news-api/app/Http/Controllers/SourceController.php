<?php

namespace App\Http\Controllers;

use App\Models\Source;
use Illuminate\Http\Request;
use App\Http\Resources\SourceResource;
use Illuminate\Support\Facades\Validator;

class SourceController extends Controller
{
    public function index(Request $request)
    {
        // Fetch sources with optional filtering
        $query = Source::query();

        // Apply search filter
        if ($request->has('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        // Get sources with pagination
        $sources = $query->paginate(10);

        // Return the paginated sources wrapped in SourceResource
        return SourceResource::collection($sources);
    }
}
