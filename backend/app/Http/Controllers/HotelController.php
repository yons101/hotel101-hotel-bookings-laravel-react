<?php

namespace App\Http\Controllers;

use App\Room;
use App\User;
use App\Hotel;
use App\Booking;
use App\Feature;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class HotelController extends Controller
{
    //get featured hotels
    public function index()
    {
        $data['success'] = true;
        $data['hotels'] =  Hotel::leftjoin('rooms', 'hotels.id', '=', 'rooms.hotel_id')
            ->leftjoin('reviews', 'hotels.id', '=', 'reviews.hotel_id')
            ->select('hotels.id', 'hotels.name', 'hotels.star', 'hotels.image', DB::raw('MIN(rooms.price) as min_price'), DB::raw('(SUM(reviews.rating) / COUNT(reviews.id)) as rating'))
            ->groupBy('hotels.id', 'hotels.name', 'hotels.star', 'hotels.image')
            ->take(6)
            ->get();

        return response()->json(['data' => $data]);
    }

    //get all hotels
    public function getAllHotels()
    {
        if (Auth::user()->is_admin) {
            $data['success'] = true;
            $data['hotels'] =  Hotel::leftjoin('rooms', 'hotels.id', '=', 'rooms.hotel_id')
                ->leftjoin('bookings', 'rooms.id', '=', 'bookings.room_id')
                ->select('hotels.id', 'hotels.name', 'hotels.image', DB::raw('COUNT(DISTINCT rooms.id) as rooms_count'), DB::raw('COUNT(DISTINCT bookings.id) as bookings_count'))
                ->groupBy('hotels.id', 'hotels.name', 'hotels.image')
                ->paginate(6);
        } else
            $data['success'] = false;


        return response()->json(['data' => $data]);
    }

    //get featured hotels
    public function getHotelImages()
    {
        $data['success'] = true;
        $data['images'] =  DB::table('hotels')->select('image')->get();
        return response()->json(['data' => $data]);
    }

    //create a hotel
    public function store(Request $request)
    {
        try {
            if (Auth::user()->is_admin) {
                $data = $this->validateData([
                    'name' => 'required',
                    'address' => 'required',
                    'city' => 'required',
                    'star' => 'required',
                    'x_coordinate' => 'required',
                    'y_coordinate' => 'required',
                    'image' => 'required',
                ]);

                $fileName = null;
                if ($request->file('image')) {
                    $fileName = "hotel_" . time() . "." . $request->file('image')->getClientOriginalExtension();
                    $request->file('image')->move(public_path("/img/hotels"), $fileName);
                }

                $hotel = new Hotel;
                $hotel->name = $request->name;
                $hotel->address = $request->address;
                $hotel->city = $request->city;
                $hotel->star = $request->star;
                $hotel->x_coordinate = $request->x_coordinate;
                $hotel->y_coordinate = $request->y_coordinate;
                $hotel->image = $fileName;

                if ($hotel->save()) {
                    $data['success'] = true;
                    $data['hotel'] = $hotel;
                }
            } else
                $data['success'] = false;
        } catch (\Throwable $th) {
            $data['success'] =  false;
        }

        return response()->json(['data' => $data]);
    }

    //show a hotel
    public function show(Hotel $hotel)
    {
        if ($hotel) {
            $data['success'] = true;
            $data['hotel'] = Hotel::leftjoin('rooms', 'hotels.id', '=', 'rooms.hotel_id')
                ->select('hotels.id', 'hotels.name', 'hotels.star', 'hotels.image', 'hotels.city', 'hotels.address', 'hotels.x_coordinate', 'hotels.y_coordinate', DB::raw('MIN(rooms.price) as min_price'))
                ->groupBy('hotels.id', 'hotels.name', 'hotels.star', 'hotels.image', 'hotels.city', 'hotels.address', 'hotels.x_coordinate', 'hotels.y_coordinate')
                ->where('hotels.id', $hotel->id)
                ->first();
            $data['hotel']['rooms'] = $hotel->rooms->take(6);
            $data['hotel']['reviews'] = $hotel->reviews;
        }

        return response()->json(['data' => $data]);
    }

    //update a hotel
    public function update(Request $request, Hotel $hotel)
    {
        try {
            if (Auth::user()->is_admin) {
                $data = $this->validateData([
                    'name' => 'required',
                    'address' => 'required',
                    'city' => 'required',
                    'star' => 'required',
                    'x_coordinate' => 'required',
                    'y_coordinate' => 'required',
                ]);

                if ($request->hasFile('image')) {
                    $fileName = null;
                    if ($request->file('image')) {
                        $fileName = "hotel_" . time() . "." . $request->file('image')->getClientOriginalExtension();
                        $request->file('image')->move(public_path("/img/hotels"), $fileName);
                        $hotel->image = $fileName;
                    }
                }

                $hotel->name = $request->name;
                $hotel->address = $request->address;
                $hotel->city = $request->city;
                $hotel->star = $request->star;
                $hotel->x_coordinate = $request->x_coordinate;
                $hotel->y_coordinate = $request->y_coordinate;

                if ($hotel->save()) {
                    $data['success'] = true;
                    $data['hotel'] = $hotel;
                }
            } else
                $data['success'] = false;
        } catch (\Throwable $th) {
            $data['success'] =  false;
        }

        return response()->json(['data' => $data]);
    }

    //delete a hotel
    public function destroy(Hotel $hotel)
    {
        if (Auth::user()->is_admin) {
            $hotel->delete();
            $data['success'] = true;
            $data['hotel'] = $hotel;
        } else
            $data['success'] = false;

        return response()->json(['data' => $data]);
    }


    //search
    public function search()
    {
        try {
            $data['success'] = true;

            //get the booked rooms where check_out is not between request()->check_in and request()->check_out
            $booked_rooms = array_merge(
                Room::join('bookings', 'rooms.id', '=', 'bookings.room_id')
                    ->whereBetween('bookings.check_in', [request()->check_in, request()->check_out])
                    ->get()->toArray(),
                Room::join('bookings', 'rooms.id', '=', 'bookings.room_id')
                    ->whereBetween('bookings.check_out', [request()->check_in, request()->check_out])
                    ->get()->toArray()
            );

            //get ids of all booked rooms so we can filter them
            $booked_rooms_ids = collect($booked_rooms)->pluck('room_id');


            //get available rooms
            $available_rooms = Room::when(request()->guest != null, function ($query) {
                return $query->where('guest', '>=', request()->guest);
            })
                ->select('id')

                ->when(request()->min_price != null, function ($query) {
                    return $query->where('price', '>=', request()->min_price);
                })

                ->when(request()->max_price != null, function ($query) {
                    return $query->where('price', '<=', request()->max_price);
                })
                ->when(request()->min_price != null && request()->max_price != null, function ($query) {
                    return $query->whereBetween('price', [request()->min_price, request()->max_price]);
                })
                ->when(request()->features != null, function ($query) {
                    //check if id is in rooms that have those features
                    return $query->whereIn('id', Feature::whereIn('name', request()->features)
                        ->select('room_id')->get());
                })

                ->whereNotIn('id', $booked_rooms_ids)

                ->get();

            //get the hotels that meet the criteria
            $data['hotels'] =  Hotel::join('rooms', 'hotels.id', '=', 'rooms.hotel_id')
                ->leftjoin('reviews', 'hotels.id', '=', 'reviews.hotel_id')
                ->select('hotels.id', 'hotels.name', 'hotels.star', 'hotels.city', 'hotels.image', DB::raw('MIN(rooms.price) as min_price'), DB::raw('(SUM(reviews.rating) / COUNT(reviews.id)) as rating'))
                ->when(request()->star != null, function ($query) {
                    return $query->whereIn('star', request()->star);
                })
                ->when(request()->city != null, function ($query) {
                    return $query->where('city', request()->city);
                })
                ->whereIn('rooms.id', $available_rooms)
                ->groupBy('hotels.id', 'hotels.name', 'hotels.star', 'hotels.city', 'hotels.image')
                ->paginate(6);
        } catch (\Throwable $th) {
            $data['success'] = false;
        }
        return response()->json(['data' => $data]);
    }

    //get rooms of a hotel
    public function getSearchData()
    {
        $data['cities'] = Hotel::all()->pluck('city');
        $data['features'] = DB::table('features')->limit(10)->get()->pluck('name');


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
