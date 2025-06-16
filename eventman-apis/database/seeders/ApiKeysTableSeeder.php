<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ApiKeysTableSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('api_keys')->insert([
            [
                'id' => 1,
                'NAME' => 'Test Service 1',
                'api_key' => Str::random(32),
                'last_used' => null,
                'created_at' => now(),
            ],
            [
                'id' => 2,
                'NAME' => 'Test Service 2',
                'api_key' => Str::random(32),
                'last_used' => null,
                'created_at' => now(),
            ],
        ]);
    }
}
