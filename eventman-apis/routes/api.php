<?php


use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TestController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;

// Debug endpoint to check CORS and authentication settings
Route::options('/debug-cors', function() {
    return response()->json(['message' => 'CORS preflight request successful']);
});

Route::get('/debug', function(Request $request) {
    return response()->json([
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
Route::get('/api-health-check', function() {
    // Check database connection
    $dbStatus = 'connected';
    try {
        \DB::connection()->getPdo();
    } catch (\Exception $e) {
        $dbStatus = 'disconnected: ' . $e->getMessage();
    }
    
    return response()->json([
        'status' => 'healthy',
        'timestamp' => now()->toIso8601String(),
        'environment' => app()->environment(),
        'database' => $dbStatus,
        'version' => [
            'app' => config('app.version', '1.0.0'),
            'php' => PHP_VERSION,
            'laravel' => app()->version()
        ]
    ]);
});

Route::get('/test', [TestController::class, 'test']);
Route::post('/test', [TestController::class, 'store']);

// Auth Routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);
Route::get('/user', [AuthController::class, 'user'])->middleware('auth:sanctum');

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
