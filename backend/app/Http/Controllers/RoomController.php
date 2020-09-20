<?php

namespace App\Http\Controllers;

use App\Room;
use App\Feature;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class RoomController extends Controller
{
    //get all rooms
    public function index()
    {
        if (Auth::user()->is_admin) {
            $data['success'] = true;
            $data['rooms'] =  Room::join('hotels', 'hotels.id', '=', 'rooms.hotel_id')
                ->select('rooms.id', 'rooms.name as room_name',  'hotels.name as hotel_name', 'rooms.image')
                ->groupBy('rooms.id', 'rooms.name', 'hotels.name', 'rooms.image')
                ->paginate(6);
        } else
            $data['success'] = false;


        return response()->json(['data' => $data]);
    }

    //create a room
    public function store(Request $request)
    {
        try {
            if (Auth::user()->is_admin) {
                $data = $this->validateData([
                    'name' => 'required',
                    'description' => 'required',
                    'price' => 'required',
                    'guest' => 'required',
                    'hotel_id' => 'required',
                    'image' => 'required',
                ]);

                $fileName = null;
                $names = [];


                if ($request->hasFile('image')) {
                    if (count($request->file('image')) < 3) {
                        $data['success'] =  false;
                        $data['errors'] =  ['You need to choose at least 3 images!'];
                    } else {
                        if ($request->file('image')) {
                            foreach ($request->file('image') as $image) {
                                $fileName = pathinfo($image->getClientOriginalName(), PATHINFO_FILENAME)
                                    . "_"
                                    . time()
                                    . "."
                                    . $image->getClientOriginalExtension();
                                array_push($names,  $fileName);
                                $image->move(public_path("/img/rooms/"), $fileName);
                            }
                        }
                        $room = new Room;
                        $room->name = $request->name;
                        $room->description = $request->description;
                        $room->price = $request->price;
                        $room->guest = $request->guest;
                        $room->hotel_id = $request->hotel_id;
                        $room->image = implode(",", $names);

                        if ($room->save()) {
                            $data['success'] = true;
                            $data['room'] = $room;
                            $features = json_decode($request->features);
                            foreach ($features as $feature) {
                                (new FeatureController)->store(["name" => $feature, "room_id" => $room->id]);
                            }
                        }
                    }
                } else {
                    $data['success'] =  false;
                    $data['errors'] =  ['You need to choose at least 3 images!'];
                }
            } else
                $data['success'] =  false;
        } catch (\Throwable $th) {
            $data['success'] =  false;
        }

        return response()->json(['data' => $data]);
    }

    //show a room
    public function show(Room $room)
    {
        if ($room) {
            $data['success'] = true;
            $data['room'] = $room;
            $data['room']['features'] = Feature::select('name')->where('room_id', $room->id)->get();
            $data['suggested_rooms'] = count(Room::where('rooms.id', '!=', $room->id)->get()) >= 3 ? Room::where('rooms.id', '!=', $room->id)->inRandomOrder()->limit(3)->get() : [];
        }

        return response()->json(['data' => $data]);
    }

    //update a room
    public function update(Request $request, Room $room)
    {
        try {
            if (Auth::user()->is_admin) {
                $data = $this->validateData([
                    'name' => 'required',
                    'description' => 'required',
                    'price' => 'required',
                    'hotel_id' => 'required',
                ]);


                $fileName = null;
                $names = [];


                if ($request->hasFile('image')) {
                    if (count($request->file('image')) >= 1 && count($request->file('image')) < 3) {
                        $data['success'] =  false;
                        $data['errors'] =  ['You need to choose at least 3 images!'];
                        return response()->json(['data' => $data]);
                    }

                    foreach ($request->file('image') as $image) {
                        $fileName = pathinfo($image->getClientOriginalName(), PATHINFO_FILENAME)
                            . "_"
                            . time()
                            . "."
                            . $image->getClientOriginalExtension();
                        array_push(
                            $names,
                            $fileName
                        );
                        $image->move(public_path("/img/rooms/"), $fileName);
                    }
                    $room->image = implode(",", $names);
                }
                $room->name = $request->name;
                $room->description = $request->description;
                $room->price = $request->price;
                $room->guest = $request->guest;
                $room->hotel_id = $request->hotel_id;

                if ($room->save()) {
                    $data['success'] = true;
                    $data['room'] = $room;
                    $data['room']['features'] = Feature::select('name')->where('room_id', $room->id)->get();

                    $features = json_decode($request->features);

                    DB::table('features')->where('room_id',  $room->id)->delete();

                    foreach ($features as $feature) {
                        (new FeatureController)->store(["name" => $feature, "room_id" => $room->id]);
                    }
                }
            } else
                $data['success'] = false;
        } catch (\Throwable $th) {
            $data['success'] =  false;
        }

        return response()->json(['data' => $data]);
    }

    //delete a room
    public function destroy(Room $room)
    {
        if (Auth::user()->is_admin) {
            $room->delete();
            $data['success'] = true;
            $data['room'] = $room;
        } else
            $data['success'] = false;


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
