composer require laravel/socialite<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\ApiKey;

class ApiKeyAuth
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $apiKey = $request->header('X-API-KEY');

        if (!$apiKey || !ApiKey::where('api_key', $apiKey)->exists()) {
            return response()->json(['message' => 'Unauthorized: Invalid API Key'], 401);
        }

        // Optionally update last_used timestamp
        ApiKey::where('api_key', $apiKey)->update(['last_used' => now()]);

        return $next($request);
    }
}
