<?php

use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Faker\Generator as Faker;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([

            UserSeeder::class,
            HotelSeeder::class,
            // RoomSeeder::class,
            // BookingSeeder::class,
            // FeatureSeeder::class,
            // ReviewSeeder::class,
        ]);
    }
}
