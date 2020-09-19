<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Booking;
use Faker\Generator as Faker;

$factory->define(Booking::class, function (Faker $faker) {
    return [
        'check_in' => $faker->date(),
        'check_out' => $faker->date(),
        'user_id' => $faker->randomDigitNot(0),
        'room_id' => $faker->randomDigitNot(0),
    ];
});
