<?php

namespace App\Http\Controllers;

use App\Feature;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class FeatureController extends Controller
{
    //create a feature
    public function store($request)
    {
        try {
            $data = $this->validateData([
                'name' => 'required',
                'room_id' => 'required',
            ]);

            $feature = new Feature;
            $feature->name = $request['name'];
            $feature->room_id = $request['room_id'];
            $feature->save();
        } catch (\Throwable $th) {
            $data['success'] =  false;
        }

        return response()->json(['data' => $data]);
    }

    // //show a feature

    //delete a feature
    public function destroy(Feature $feature)
    {
        if ($feature->delete()) {
            $data['success'] = true;
            $data['feature'] = $feature;
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
