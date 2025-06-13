<?php

use Illuminate\Support\Facades\Route;
use Laravel\Sanctum\Http\Controllers\CsrfCookieController;

// Serve the welcome view at the root URL
Route::get('/', function () {
    return view('welcome');
});

// Important for CSRF protection with SPA
// This route will be used to get a CSRF token
Route::get('/sanctum/csrf-cookie', [CsrfCookieController::class, 'show']);

// Add a test endpoint to check if the server is running
Route::get('/api-health-check', function() {
    return response()->json([
        'status' => 'API is running',
        'timestamp' => now()->toIso8601String()
    ]);
});
