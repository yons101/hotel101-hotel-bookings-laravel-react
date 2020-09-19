<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class HotelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Hotel::class, 10)->create()->each(function ($hotel) {
            factory(App\Room::class, 10)->create([
                'hotel_id' => $hotel->id
            ])->each(function ($room) {
                factory(App\Feature::class, 10)->create([
                    'room_id' => $room->id
                ]);
                factory(App\Booking::class, 1)->create([
                    'room_id' => $room->id
                ]);
            });
            factory(App\Review::class, 10)->create([
                'hotel_id' => $hotel->id
            ]);
        });
    }
}
