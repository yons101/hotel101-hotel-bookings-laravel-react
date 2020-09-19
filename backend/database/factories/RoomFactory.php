<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Room;
use Faker\Generator as Faker;

$factory->define(Room::class, function (Faker $faker) {
    return [
        'name' => $faker->sentence(2),
        'description' => $faker->sentence(44),
        'price' => $faker->randomFloat(0, 100, 1000),
        'guest' => $faker->randomFloat(0, 1, 3),
        'hotel_id' => $faker->randomDigitNot(0),
        'image' => $faker->randomElement(['room-1.jpg,room-2.jpg,room-3.jpg,room-4.jpg', 'room-5.jpg,room-6.jpg,room-7.jpg,room-8.jpg', 'room-9.jpg,room-10.jpg,room-11.jpg,room-12.jpg', 'room-13.jpg,room-14.jpg,room-15.jpg,room-16.jpg', 'room-17.jpg,room-18.jpg,room-19.jpg,room-20.jpg', 'room-21.jpg,room-22.jpg,room-23.jpg,room-24.jpg']),
    ];
});
