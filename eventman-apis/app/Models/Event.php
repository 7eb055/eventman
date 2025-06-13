<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'description',
        'category',
        'date',
        'venue',
        'price',
        'capacity',
        'organizer',
        'status',
        'image_url',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'date' => 'datetime',
        'price' => 'float',
        'capacity' => 'integer',
    ];

    /**
     * Get the organizer that owns the event.
     */
    public function organizerUser()
    {
        return $this->belongsTo(User::class, 'organizer');
    }

    /**
     * Get the tickets for the event.
     */
    public function tickets()
    {
        return $this->hasMany(Ticket::class);
    }

    /**
     * Get the attendees for the event.
     */
    public function attendees()
    {
        return $this->belongsToMany(User::class, 'tickets')
            ->withTimestamps()
            ->withPivot(['id', 'status', 'price_paid']);
    }
}
