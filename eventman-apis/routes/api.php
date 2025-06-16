<?php


use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TestController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;

// /**
//  * Helper function to add CORS headers to a response
//  *
//  * @param mixed $responseData The data to return in the response
//  * @param int $status HTTP status code
//  * @return \Illuminate\Http\JsonResponse
//  */
// function cors_json($responseData, $status = 200) {
//     return response()->json($responseData, $status)
//         ->header('Access-Control-Allow-Origin', 'http://localhost:5173')
//         ->header('Access-Control-Allow-Methods', 'GET, OPTIONS, POST, PUT, DELETE')
//         ->header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, Authorization');
// }

// Simple status endpoint (useful for quick health checks)
Route::get('/status', function() {
    return cors_json(['status' => 'ok', 'timestamp' => now()->toIso8601String()]);
});

// OPTIONS route for status
Route::options('/status', function() {
    return response('')
        ->header('Access-Control-Allow-Origin', 'http://localhost:5173')
        ->header('Access-Control-Allow-Methods', 'GET, OPTIONS')
        ->header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With')
        ->header('Access-Control-Allow-Credentials', 'true');
});

// Debug endpoint to check CORS and authentication settings
Route::options('/debug-cors', function() {
    return cors_json(['message' => 'CORS preflight request successful']);
});

Route::get('/debug', function(Request $request) {
    return cors_json([
        'message' => 'API debug endpoint',
        'request' => [
            'headers' => $request->headers->all(),
            'ip' => $request->ip(),
            'method' => $request->method(),
        ],
        'server' => [
            'php_version' => PHP_VERSION,
            'laravel_version' => app()->version(),
        ]
    ]);
});

// API health check endpoint
Route::get('/api-health-check', function () {
    return cors_json(['status' => 'ok']);
});

// OPTIONS route for API health check
Route::options('/api-health-check', function() {
    return response('')
        ->header('Access-Control-Allow-Origin', 'http://localhost:5173')
        ->header('Access-Control-Allow-Methods', 'GET, OPTIONS')
        ->header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With')
        ->header('Access-Control-Allow-Credentials', 'true');
});

Route::get('/test', [TestController::class, 'test']);
Route::post('/test', [TestController::class, 'store']);

// Auth Routes
Route::post('/register', [AuthController::class, 'register']);
Route::options('/register', function() {
    return response('')
        ->header('Access-Control-Allow-Origin', 'http://localhost:5173')
        ->header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        ->header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, X-CSRF-TOKEN')
        ->header('Access-Control-Allow-Credentials', 'true');
});

Route::post('/login', [AuthController::class, 'login']);
Route::options('/login', function() {
    return response('')
        ->header('Access-Control-Allow-Origin', 'http://localhost:5173')
        ->header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        ->header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, X-CSRF-TOKEN')
        ->header('Access-Control-Allow-Credentials', 'true');
});

Route::post('/logout', [AuthController::class, 'logout']);
Route::get('/user', [AuthController::class, 'user'])->middleware('auth:sanctum');

// Echo endpoint - useful for testing POST/PUT requests
Route::match(['post', 'put'], '/echo', function(Request $request) {
    return cors_json([
        'received' => [
            'headers' => $request->headers->all(),
            'body' => $request->all(),
            'method' => $request->method(),
            'path' => $request->path(),
            'url' => $request->url(),
        ],
        'timestamp' => now()->toIso8601String()
    ]);
});

// OPTIONS route for echo endpoint
Route::options('/echo', function() {
    return response('')
        ->header('Access-Control-Allow-Origin', 'http://localhost:5173')
        ->header('Access-Control-Allow-Methods', 'POST, PUT, OPTIONS')
        ->header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With')
        ->header('Access-Control-Allow-Credentials', 'true');
});

// Event Routes
Route::get('/events', [EventController::class, 'index']);
Route::post('/events', [EventController::class, 'store']);
Route::get('/events/{id}', [EventController::class, 'show']);
Route::put('/events/{id}', [EventController::class, 'update']);
Route::delete('/events/{id}', [EventController::class, 'destroy']);

// Additional Event Routes
Route::get('/events/category/{category}', [EventController::class, 'getByCategory']);
Route::get('/events/upcoming', [EventController::class, 'getUpcoming']);
Route::get('/events/past', [EventController::class, 'getPast']);
Route::get('/events/organizer/{organizerId}', [EventController::class, 'getByOrganizer']);
