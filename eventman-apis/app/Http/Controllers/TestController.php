<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TestController extends Controller
{
    public function test()
    {
        return response()->json([
            'message' => 'Connection successful!',
            'timestamp' => now()
        ]);
    }

    public function store(Request $request)
    {
        return response()->json([
            'message' => 'Data received',
            'data' => $request->all()
        ]);
    }
}
