<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{

    //show one
    public function show(User $user)
    {
        if ($user->id == Auth::user()->id) {
            $data['success'] = true;
            $data['user']['first_name'] = $user->first_name;
            $data['user']['last_name'] = $user->last_name;
            $data['user']['phone'] = $user->phone;
            $data['user']['address'] = $user->address;
            $data['user']['city'] = $user->city;
            $data['user']['image'] = $user->image;
        } else
            $data['success'] = false;


        return response()->json(['data' => $data]);
    }


    //update one
    public function updatePersonalInfo(Request $request, User $user)
    {
        try {
            if ($user->id == Auth::user()->id) {
                $data = $this->validateData([
                    'first_name' => 'required',
                    'last_name' => 'required',
                    'phone' => 'nullable',
                    'address' => 'nullable',
                    'city' => 'nullable',
                ]);

                $fileName = null;
                if ($request->file('image')) {
                    $fileName = "user_" . $user->id . "_" . time() . "." . $request->file('image')->getClientOriginalExtension();
                    $request->file('image')->move(public_path("/img/users/"), $fileName);
                    $user->image = $fileName;
                }

                $user->first_name = $request->first_name;
                $user->last_name = $request->last_name;
                $user->phone = $request->phone;

                $user->address = $request->address;
                $user->city = $request->city;

                if ($user->save()) {
                    $data['success'] = true;
                    $data['user']['first_name'] = $user->first_name;
                    $data['user']['last_name'] = $user->last_name;
                    $data['user']['phone'] = $user->phone;
                    $data['user']['address'] = $user->address;
                    $data['user']['city'] = $user->city;
                    $data['user']['image'] = $user->image;
                }
            } else
                $data['success'] = false;
        } catch (\Throwable $th) {
            $data['success'] =  false;
            $data['errors'] =  collect(['Error']);
        }

        return response()->json(['data' => $data]);
    }

    //update one
    public function updateEmail(User $user)
    {
        try {

            if ($user->id == Auth::user()->id) {
                $data = $this->validateData([
                    'email' => 'required',
                    'newEmail' => 'required',
                    'confirmNewEmail' => 'required',
                ]);


                if ($user->email === request()->email) {

                    $user->email = request()->newEmail;
                    if (request()->newEmail == request()->confirmNewEmail) {
                        $user->save();
                        $data['success'] = true;
                        $data['user']['first_name'] = $user->first_name;
                        $data['user']['last_name'] = $user->last_name;
                        $data['user']['phone'] = $user->phone;
                        $data['user']['address'] = $user->address;
                        $data['user']['city'] = $user->city;
                        $data['user']['image'] = $user->image;
                    } else {
                        $data['success'] =  false;
                        $data['errors'] = collect(['You need to confirm your new email']);
                    }
                } else {
                    $data['success'] =  false;
                    $data['errors'] = collect(['You need to enter your old email']);
                }
            } else
                $data['success'] = false;
        } catch (\Throwable $th) {
            $data['success'] =  false;
            $data['errors'] =  collect(['Error']);
        }

        return response()->json(['data' => $data]);
    }

    //update one
    public function updatePassword(User $user)
    {
        try {
            if ($user->id == Auth::user()->id) {
                if (Hash::check(request()->password, $user->password)) {
                    $data = $this->validateData([
                        'password' => 'required',
                        'newPassword' => 'required',
                        'confirmNewPassword' => 'required',
                    ]);

                    $user->password = bcrypt(request()->newPassword);

                    if (request()->newPassword == request()->confirmNewPassword) {
                        $user->save();
                        $data['success'] = true;
                        $data['user']['first_name'] = $user->first_name;
                        $data['user']['last_name'] = $user->last_name;
                        $data['user']['phone'] = $user->phone;
                        $data['user']['address'] = $user->address;
                        $data['user']['city'] = $user->city;
                        $data['user']['image'] = $user->image;
                    } else {
                        $data['success'] =  false;
                        $data['errors'] = ['You need to confirm your new password'];
                    }
                } else {
                    $data['success'] =  false;
                    $data['errors'] = ['You need to enter your old password'];
                }
            } else
                $data['success'] = false;
        } catch (\Throwable $th) {
            $data['success'] =  false;
        }

        return response()->json(['data' => $data]);
    }

    //login a user
    public function login()
    {
        try {
            $data = $this->validateData([
                'email' => 'required|email',
                'password' => 'required',
            ]);

            if (!isset($data['errors'])) {

                Auth::attempt(['email' => request('email'), 'password' => request('password')]);
                $user = Auth::user();
                $data['success'] =  true;
                $data['user_id'] =  $user->id;
                $data['is_admin'] =  $user->is_admin;
                $data['token'] =  $user->createToken('')->accessToken;
            } else {
                $data['success'] =  false;
            }
        } catch (\Throwable $th) {
            $data['success'] =  false;
            $data['errors'] =  collect(['Unauthorised']);
        }

        return response()->json(['data' => $data]);
    }

    //register a user
    public function register()
    {
        try {
            $data = $this->validateData([
                'first_name' => 'required',
                'last_name' => 'required',
                'phone' => 'nullable',
                'address' => 'nullable',
                'city' => 'nullable',
                'email' => 'required|unique:users|email',
                'password' => 'required',
            ]);
            if (!isset($data['errors'])) {
                $validatedData = request()->all();
                $validatedData['password'] = bcrypt($validatedData['password']);
                $validatedData['is_admin'] = 0;
                $user = User::create($validatedData);
                $data['success'] =  true;
                $data['user_id'] =  $user->id;
                $data['is_admin'] =  $user->is_admin;
                $data['token'] =  $user->createToken('')->accessToken;
            } else {
                $data['success'] =  false;
            }
        } catch (\Throwable $th) {
            $data['success'] =  false;
            $data['errors'] =  collect(['Error']);
        }

        return response()->json(['data' => $data]);
    }

    //validate data and return data with errors if exist
    public function validateData(array $rules)
    {
        $validator = Validator::make(request()->all(), $rules);
        if ($validator->fails()) {
            $data['errors'] =  $validator->errors();
            return $data;
        }
    }
}
