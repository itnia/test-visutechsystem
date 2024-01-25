<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\AuthorRequest;
use App\Models\Author;
use Illuminate\Http\Request;

class AuthorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $authors = Author::with('books')->get();

        return response()->json($authors, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(AuthorRequest $request)
    {
        $validated = $request->validated();

        $author = new Author();
        $author->name = $validated['name'];
        $author->save();

        return response()->json($author, 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $author = Author::with('books')->find($id);

        return response()->json($author, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(AuthorRequest $request, string $id)
    {
        $validated = $request->validated();

        $author = Author::find($id);
        $author->name = $validated['name'];
        $author->save();

        return response()->json($author, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Author::destroy($id);

        return response()->json(null);
    }
}
