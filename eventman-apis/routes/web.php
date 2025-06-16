<?php

use Illuminate\Support\Facades\Route;

// Route::get('/', function () {
//     return view('welcome');
// });

// Prevent accidental GET requests to /api/login
Route::any('/api/login', function() {
    return response()->json(['error' => 'Use POST method for login'], 405);
});
