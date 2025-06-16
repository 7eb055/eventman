<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class ManualCors
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);

        // Add CORS headers
        $response->headers->set('Access-Control-Allow-Origin', 'http://localhost:5173');
        $response->headers->set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        $response->headers->set('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, Authorization');

        // Handle preflight OPTIONS request
        if ($request->getMethod() === 'OPTIONS') {
            $response->setStatusCode(200);
            $response->setContent('');
        }

        return $response;
    }
}
