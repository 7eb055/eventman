<?php

if (!function_exists('cors_json')) {
    /**
     * Return a JSON response with CORS headers.
     */
    function cors_json($responseData, $status = 200)
    {
        return response()->json($responseData, $status)
            ->header('Access-Control-Allow-Origin', 'http://localhost:5173')
            ->header('Access-Control-Allow-Methods', 'GET, OPTIONS, POST, PUT, DELETE')
            ->header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, Authorization');
    }
}
