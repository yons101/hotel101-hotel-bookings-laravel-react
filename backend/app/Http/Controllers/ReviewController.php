<?php

namespace App\Http\Controllers;

use App\User;
use App\Hotel;
use App\Review;
use App\Booking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ReviewController extends Controller
{
    //get all reviews
    public function index()
    {
        if (Auth::user()->is_admin) {
            $data['success'] = true;
            $data['reviews'] =  Review::join('hotels', 'hotels.id', '=', 'reviews.hotel_id')
                ->select('reviews.id', 'reviews.content', 'reviews.rating', 'reviews.created_at', 'hotels.name', 'reviews.hotel_id', 'reviews.user_id',  'hotels.city')
                ->groupBy('reviews.id', 'reviews.content', 'reviews.rating', 'reviews.created_at', 'hotels.name', 'reviews.hotel_id', 'reviews.user_id', 'hotels.city')
                ->paginate(6);
        } else
            $data['success'] = false;

        return response()->json(['data' => $data]);
    }

    //create a review
    public function store(Request $request)
    {
        try {
            if ($request->user_id == Auth::user()->id) {
                //You can only review a hotel you booked
                $bookings =  Booking::join('rooms', 'rooms.id', '=', 'bookings.room_id')
                    ->join('hotels', 'hotels.id', '=', 'rooms.hotel_id')
                    ->select('bookings.id as booking_id', 'rooms.id as room_id', 'hotels.id as hotel_id')
                    ->where('bookings.user_id', $request->user_id)
                    ->where('hotel_id', $request->hotel_id)
                    ->get();

                //You can only post one review per hotel
                $count =  Review::join('users', 'users.id', '=', 'reviews.user_id')
                    ->select(DB::raw('COUNT(reviews.id) as count'))
                    ->where('reviews.user_id', $request->user_id)
                    ->where('reviews.hotel_id', $request->hotel_id)
                    ->get()
                    ->pluck('count');


                $data = $this->validateData([
                    'content' => 'required',
                    'rating' => 'required',
                    'user_id' => 'required',
                    'hotel_id' => 'required',
                ]);

                if ($count[0] === 0) {
                    if (count($bookings) !== 0) {
                        $review = new Review;
                        $review->content = $request->content;
                        $review->rating = $request->rating;
                        $review->user_id = $request->user_id;
                        $review->hotel_id = $request->hotel_id;

                        if ($review->save()) {
                            $data['success'] = true;
                            $data['review'] = $review;
                        }
                    } else {
                        $data['success'] = false;
                        $data['errors'] = collect(['You can only review a hotel you booked']);
                    }
                } else {
                    $data['success'] = false;
                    $data['errors'] = collect(['You can only post one review per hotel']);
                }
            } else
                $data['success'] = false;
        } catch (\Throwable $th) {
            $data['success'] =  false;
            if ($data['errors']->messages()['content']) {
                $data['errors'] = collect(['You need to enter a review!']);
            }
        }

        return response()->json(['data' => $data]);
    }


    //update a review
    public function update(Request $request, Review $review)
    {
        try {
            if ($request->user_id == Auth::user()->id || Auth::user()->is_admin) {
                $data = $this->validateData([
                    'content' => 'required',
                    'rating' => 'required',
                    'user_id' => 'required',
                    'hotel_id' => 'required',
                ]);
                $review->content = $request->content;
                $review->rating = $request->rating;
                $review->user_id = $request->user_id;
                $review->hotel_id = $request->hotel_id;
                if ($review->save()) {
                    $data['success'] = true;
                    $data['review'] = $review;
                }
            } else
                $data['success'] = false;
        } catch (\Throwable $th) {
            $data['success'] =  false;
        }

        return response()->json(['data' => $data]);
    }

    //delete a review
    public function destroy(Review $review)
    {
        if ($review->user_id == Auth::user()->id || Auth::user()->is_admin) {
            $review->delete();
            $data['success'] = true;
            $data['review'] = $review;
        } else
            $data['success'] = false;

        return response()->json(['data' => $data]);
    }

    //get the reviews of a user
    public function getUserReviews(User $user)
    {
        if ($user->id == Auth::user()->id) {
            $data['success'] = true;
            $data['reviews'] =  Review::join('hotels', 'hotels.id', '=', 'reviews.hotel_id')
                ->select('reviews.id', 'reviews.content', 'reviews.rating', 'reviews.created_at', 'hotels.name', 'reviews.hotel_id', 'reviews.user_id',  'hotels.city')
                ->groupBy('reviews.id', 'reviews.content', 'reviews.rating', 'reviews.created_at', 'hotels.name', 'reviews.hotel_id', 'reviews.user_id', 'hotels.city')
                ->where('reviews.user_id', $user->id)
                ->paginate(6);
        } else
            $data['success'] = false;

        return response()->json(['data' => $data]);
    }

    //get the reviews of a hotel
    public function getHotelReviews(Hotel $hotel, User $user)
    {
        if ($hotel && $user) {
            //You can only review a hotel you booked
            //if logged
            $bookings =  Booking::join('rooms', 'rooms.id', '=', 'bookings.room_id')
                ->join('hotels', 'hotels.id', '=', 'rooms.hotel_id')
                ->select('bookings.id as booking_id', 'rooms.id as room_id', 'hotels.id as hotel_id')
                ->where('bookings.user_id', $user->id)
                ->where('hotel_id', $hotel->id)
                ->get();
            $data['success'] = true;
            $data['count'] = count($bookings);
            $data['reviews'] =  Review::join('hotels', 'hotels.id', '=', 'reviews.hotel_id')
                ->join('users', 'users.id', '=', 'reviews.user_id')
                ->select('reviews.id as id', 'rating', 'content', 'hotel_id', 'user_id', 'first_name', 'last_name', 'users.image')
                ->groupBy('reviews.id', 'rating', 'content', 'hotel_id', 'user_id', 'first_name', 'last_name', 'users.image')
                ->where('hotel_id', '=', $hotel->id)
                ->orderBy('reviews.updated_at', 'desc')
                ->paginate(5);
        } else {
            //if not logged
            $data['success'] = true;
            $data['reviews'] =  Review::join('hotels', 'hotels.id', '=', 'reviews.hotel_id')
                ->join('users', 'users.id', '=', 'reviews.user_id')
                ->select('reviews.id as id', 'rating', 'content', 'hotel_id', 'user_id', 'first_name', 'last_name', 'users.image')
                ->groupBy('reviews.id', 'rating', 'content', 'hotel_id', 'user_id', 'first_name', 'last_name', 'users.image')
                ->where('hotel_id', '=', $hotel->id)
                ->orderBy('reviews.updated_at', 'desc')
                ->paginate(5);
        }
        return response()->json(['data' => $data]);
    }


    //Validate data and return data with errors if exist
    public function validateData(array $rules)
    {
        $validator = Validator::make(request()->all(), $rules);
        if ($validator->fails()) {

            $data['errors'] =  $validator->errors();

            return $data;
        }
    }
}
