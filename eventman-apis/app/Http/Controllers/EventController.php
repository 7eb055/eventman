<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class EventController extends Controller
{
    /**
     * Display a listing of the events.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        try {
            $events = Event::all();
            return response()->json($events);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to fetch events', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Store a newly created event in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'required|string|max:100',
            'date' => 'required|date',
            'venue' => 'required|string|max:255',
            'price' => 'required|numeric',
            'capacity' => 'required|integer',
            'organizer' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Validation failed', 'errors' => $validator->errors()], 422);
        }

        try {
            $event = Event::create($request->all());
            return response()->json($event, 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to create event', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified event.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        try {
            $event = Event::findOrFail($id);
            return response()->json($event);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Event not found'], 404);
        }
    }

    /**
     * Update the specified event in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        try {
            $event = Event::findOrFail($id);
            
            $validator = Validator::make($request->all(), [
                'title' => 'string|max:255',
                'description' => 'string',
                'category' => 'string|max:100',
                'date' => 'date',
                'venue' => 'string|max:255',
                'price' => 'numeric',
                'capacity' => 'integer',
                'organizer' => 'string|max:255',
                'status' => 'string|in:upcoming,past,cancelled',
            ]);

            if ($validator->fails()) {
                return response()->json(['message' => 'Validation failed', 'errors' => $validator->errors()], 422);
            }

            $event->update($request->all());
            return response()->json($event);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Event not found or update failed', 'error' => $e->getMessage()], 404);
        }
    }

    /**
     * Remove the specified event from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        try {
            $event = Event::findOrFail($id);
            $event->delete();
            return response()->json(['message' => 'Event deleted successfully']);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Event not found or delete failed', 'error' => $e->getMessage()], 404);
        }
    }

    /**
     * Get events by category.
     *
     * @param  string  $category
     * @return \Illuminate\Http\JsonResponse
     */
    public function getByCategory($category)
    {
        try {
            $events = Event::where('category', $category)->get();
            return response()->json($events);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to fetch events', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Get upcoming events.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getUpcoming()
    {
        try {
            $events = Event::where('date', '>=', now())
                ->where('status', 'upcoming')
                ->orderBy('date', 'asc')
                ->get();
            return response()->json($events);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to fetch upcoming events', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Get past events.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getPast()
    {
        try {
            $events = Event::where('date', '<', now())
                ->orWhere('status', 'past')
                ->orderBy('date', 'desc')
                ->get();
            return response()->json($events);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to fetch past events', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Get events by organizer.
     *
     * @param  string  $organizerId
     * @return \Illuminate\Http\JsonResponse
     */
    public function getByOrganizer($organizerId)
    {
        try {
            $events = Event::where('organizer', $organizerId)->get();
            return response()->json($events);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to fetch organizer events', 'error' => $e->getMessage()], 500);
        }
    }
}