<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Hotel;
use Faker\Generator as Faker;

$factory->define(Hotel::class, function (Faker $faker) {
    return [
        'name' => $faker->company(),
        'address' => $faker->streetAddress(),
        'city' => $faker->city(),
        'star' => $faker->randomFloat(0, 1, 5),
        'x_coordinate' => 31.633914,
        'y_coordinate' => -8.0108967,
        'image' => $faker->randomElement(['hotel-1.jpg', 'hotel-2.jpg', 'hotel-3.jpg', 'hotel-4.jpg', 'hotel-5.jpg', 'hotel-6.jpg', 'hotel-7.jpg', 'hotel-8.jpg']),
    ];
});
