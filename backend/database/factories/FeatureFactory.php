<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Feature;
use Faker\Generator as Faker;

$factory->define(Feature::class, function (Faker $faker) {
    return [
        'name' => $faker->sentence(2),
        'room_id' => $faker->randomDigitNot(0),
    ];
});
