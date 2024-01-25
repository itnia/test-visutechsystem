<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\BookRequest;
use App\Models\Book;
use Illuminate\Http\Request;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $books = Book::with('author')->get();

        return response()->json($books, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(BookRequest $request)
    {
        $validated = $request->validated();

        $book = new Book();
        $book->name = $validated['name'];
        $book->author_id = $validated['author_id'];
        $book->save();

        return response()->json($book, 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $book = Book::with('author')->find($id);

        return response()->json($book, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(BookRequest $request, string $id)
    {
        $validated = $request->validated();

        $book = Book::find($id);
        $book->name = $validated['name'];
        $book->author_id = $validated['author_id'];
        $book->save();

        return response()->json($book, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Book::destroy($id);

        return response()->json(null);
    }
}
