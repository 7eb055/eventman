<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('api_keys', function (Blueprint $table) {
            $table->integer('id')->primary(); // No auto_increment
            $table->string('NAME', 50); // Service name
            $table->string('api_key', 190);
            $table->timestamp('last_used')->nullable();
            $table->timestamp('created_at')->nullable()->default(DB::raw('CURRENT_TIMESTAMP'));
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('api_keys');
    }
};
