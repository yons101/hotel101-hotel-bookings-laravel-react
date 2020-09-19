<?php

use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\User::class, 10)->create();
        DB::table('users')->insert([
            'first_name' => "Ahmed",
            'last_name' => "Hamada",
            'phone' => "0666336633",
            'address' => "Rue 55, Qt X",
            'city' => "Rabat",
            'email' => "admin@gmail.com",
            'password' => Hash::make('password'),
            'remember_token' => Str::random(10),
            'is_admin' => 1,
        ]);
    }
}
