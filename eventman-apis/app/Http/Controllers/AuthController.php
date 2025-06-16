<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class AuthController extends Controller
{
    /**
     * Register a new user
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:100', // Max length adjusted to match database
            'email' => 'required|string|email|max:190|unique:users', // Max length adjusted to match database
            'password' => 'required|string|min:8|confirmed',
            'role' => 'required|string|in:attendee,organizer,admin',
            'location' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            DB::beginTransaction();

            $user = new User();
            $user->full_name = $request->name;
            $user->email = $request->email;
            $user->password = $request->password; // Use mutator for password_hash
            $user->role = $request->role;
            $user->location = $request->role === 'organizer' ? $request->location : null;
            $user->save();

            DB::commit();

            return response()->json([
                'message' => 'User registered successfully',
                'user' => [
                    'id' => $user->id,
                    'name' => $user->full_name,
                    'email' => $user->email,
                    'role' => $user->role
                ]
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Registration failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Login user
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // Debug line - log the login attempt
        \Log::info('Login attempt', ['email' => $credentials['email']]);

        // This is where the issue might be - Auth::attempt expects a password field
        // but your database might have password_hash
        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            $user = Auth::user();

            return response()->json([
                'user' => $user,
                'message' => 'Login successful',
            ]);
        }

        // Debug failed attempt
        \Log::warning('Failed login', ['email' => $credentials['email']]);

        return response()->json([
            'message' => 'Invalid login credentials',
        ], 401);
    }

    /**
     * Logout user (revoke token)
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout(Request $request)
    {
        Auth::logout();

        return response()->json([
            'message' => 'Successfully logged out'
        ]);
    }

    /**
     * Get authenticated user
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function user(Request $request)
    {
        $user = $request->user();

        return response()->json([
            'id' => $user->id,
            'name' => $user->full_name,
            'email' => $user->email,
            'role' => $user->role
        ]);
    }
}
