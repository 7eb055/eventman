<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // First check if the column exists to avoid errors
            if (Schema::hasColumn('users', 'full_name') && !Schema::hasColumn('users', 'name')) {
                // Rename full_name to name
                $table->renameColumn('full_name', 'name');
            }

            // Rename password_hash to password if it exists
            if (Schema::hasColumn('users', 'password_hash') && !Schema::hasColumn('users', 'password')) {
                $table->renameColumn('password_hash', 'password');
            }

            // Add remember_token if it doesn't exist
            if (!Schema::hasColumn('users', 'remember_token')) {
                $table->rememberToken();
            }

            // Add email_verified_at if it doesn't exist
            if (!Schema::hasColumn('users', 'email_verified_at')) {
                $table->timestamp('email_verified_at')->nullable();
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Reverse the changes
            if (Schema::hasColumn('users', 'name') && !Schema::hasColumn('users', 'full_name')) {
                $table->renameColumn('name', 'full_name');
            }

            if (Schema::hasColumn('users', 'password') && !Schema::hasColumn('users', 'password_hash')) {
                $table->renameColumn('password', 'password_hash');
            }

            if (Schema::hasColumn('users', 'remember_token')) {
                $table->dropColumn('remember_token');
            }

            if (Schema::hasColumn('users', 'email_verified_at')) {
                $table->dropColumn('email_verified_at');
            }
        });
    }
};
