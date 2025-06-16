<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

/**
 * @property int $id
 * @property string $full_name
 * @property string $email
 * @property string $password
 * @property string $role
 * @property bool $is_suspended
 * @property string|null $location
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 */
class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'full_name',
        'email',
        'password_hash', // Store hash in password_hash
        'role',
        'location',
        'is_suspended'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password_hash', // Hide password_hash
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'is_suspended' => 'boolean',
        ];
    }

    /**
     * The model's default values for attributes.
     *
     * @var array<string, mixed>
     */
    protected $attributes = [
        'is_suspended' => 0,
    ];

    /**
     * Get the name attribute (Laravel expects 'name', database has 'full_name')
     */
    public function getNameAttribute()
    {
        return $this->attributes['full_name'];
    }

    /**
     * Set the name attribute (Laravel expects 'name', database has 'full_name')
     */
    public function setNameAttribute($value)
    {
        $this->attributes['full_name'] = $value;
    }

    /**
     * Set the password attribute (hash on set, store in password_hash)
     */
    public function setPasswordAttribute($value)
    {
        $this->attributes['password_hash'] = bcrypt($value);
    }

    /**
     * Get the password attribute (for Laravel Auth)
     */
    public function getAuthPassword()
    {
        return $this->password_hash;
    }
}
