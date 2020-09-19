<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Review;
use Faker\Generator as Faker;

$factory->define(Review::class, function (Faker $faker) {
    return [
        'content' => $faker->sentence(),
        'rating' => $faker->randomFloat(0, 1, 10),
        'user_id' => $faker->randomDigitNot(0),
        'hotel_id' => $faker->randomDigitNot(0),
    ];
});
