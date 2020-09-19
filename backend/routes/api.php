<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/



Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

//Protected Routes

Route::group(['middleware' => 'auth:api'], function () {
    //Hotel routes
    Route::post('hotels', 'HotelController@store');
    Route::put('hotels/{hotel}', 'HotelController@update');
    Route::delete('hotels/{hotel}', 'HotelController@destroy');
    Route::get('hotels/all', 'HotelController@getAllHotels');

    //Room routes
    Route::post('rooms', 'RoomController@store');
    Route::put('rooms/{room}', 'RoomController@update');
    Route::delete('rooms/{room}', 'RoomController@destroy');
    Route::get('rooms', 'RoomController@index');

    //Booking routes

    Route::get('bookings', 'BookingController@index');
    Route::post('bookings', 'BookingController@store');
    Route::get('bookings/user/{user}', 'BookingController@getUserBookings');

    //Review routes

    Route::get('reviews', 'ReviewController@index');
    Route::post('reviews', 'ReviewController@store');
    Route::put('reviews/{review}', 'ReviewController@update');
    Route::delete('reviews/{review}', 'ReviewController@destroy');
    Route::get('reviews/user/{user}', 'ReviewController@getUserReviews');

    //User routes

    Route::get('users/{user}', 'UserController@show');
    Route::put('users/{user}', 'UserController@update');
    Route::put('users/{user}/update-personal-info', 'UserController@updatePersonalInfo');
    Route::put('users/{user}/update-email', 'UserController@updateEmail');
    Route::put('users/{user}/update-password', 'UserController@updatePassword');
    Route::delete('users/{user}', 'UserController@destroy');
});


//Hotel routes
Route::get('hotels', 'HotelController@index');
Route::post('hotels/search', 'HotelController@search');
Route::get('hotels/search', 'HotelController@getSearchData');
Route::get('hotels/images', 'HotelController@getHotelImages');
Route::get('hotels/{hotel}', 'HotelController@show');

//Room routes
Route::get('rooms/{room}', 'RoomController@show');

//User routes

Route::post('login', 'UserController@login'); //auth
Route::post('register', 'UserController@register'); //auth

//Feature routes

Route::get('features', 'FeatureController@index');
Route::get('features/{feature}', 'FeatureController@show');
Route::post('features', 'FeatureController@store');
Route::put('features/{feature}', 'FeatureController@update');
Route::delete('features/{feature}', 'FeatureController@destroy');

//Review routes
//if no logged
Route::get('reviews/hotel/{hotel}/', 'ReviewController@getHotelReviews');
//if logged
Route::get('reviews/hotel/{hotel}/{user}', 'ReviewController@getHotelReviews');
