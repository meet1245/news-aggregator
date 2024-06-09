<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DefaultSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            'name' => 'admin',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('admin@123'), // Hash the password for security
        ]);
        
        DB::table('authors')->insert([
            ['name' => 'Default Author'],
        ]);

        DB::table('categories')->insert([
            ['name' => 'Default Categories'],
        ]);

        DB::table('sources')->insert([
            ['name' => 'Default Source'],
        ]);
    }
}
