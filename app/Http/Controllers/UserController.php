<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{

    public function register(Request $request)
    {
        // TODO: Upload to cloudinary

        $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|confirmed',
            'profile_image' => 'image|nullable|max:1999',
        ]);

        if ($request->profile_image) {
            $imageName = str_slug($request->name) . "-" . time() . '.' . $request->profile_image->getClientOriginalExtension();
            $request->profile_image->storeAs(('public\profile_images'), $imageName);
        } else {
            $imageName = "no-profile-image.png";
        }

        $user = new User;
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->profile_image = $imageName;
        $user->description = "";
        $user->slug = str_slug($request->name)."-".uniqid();
        $user->save();


    
        // var_dump($request->file('profile_image'));

        return response()->json([
            'message' => 'Successfully created new User',
        ], 201);
    }

    public function login(Request $request)
    {

        $credentials = [
            'email' => $request->email,
            'password' => $request->password,
        ];

        if (auth()->attempt($credentials)) {
            $token = auth()->user()->createToken('Tellme_token')->accessToken;

            return response()->json(['token' => $token], 200);
        } else {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    }

    public function updateProfileImage(Request $request){
        if (Auth::check()){
            $user = User::find(Auth::user()->id);
            if ($request->profile_image) {
                $imageName = str_slug($request->name) . "-" . time() . '.' . $request->profile_image->getClientOriginalExtension();
                $request->profile_image->storeAs(('public\profile_images'), $imageName);
            } else {
                $imageName = "noimage.png";
            }
            $user->profile_image = $imageName;
            $user->save();

            return response()->json(['message'=>"Image successfully updated"], 202);
        } 

    }

    public function updatePassword(Request $request){
        if (Auth::check()){
            $user = User::find(Auth::user()->id);
            if (Hash::check($request->password_old, $user->password)){
                $user->password = Hash::make($request->password_new);
                $user->save();

                return response()->json(['password'=>$user->password], 200);
            } else {
                return response()->json(['message'=>"Wrong password"], 401);
            }
        }   
    }
    public function logout(Request $request)
    {
        $request->user()->token()->revoke();
        return response()->json([
            'message' => 'Successfully logged out',
        ], 200);
    }

    public function detail()
    {
        if (Auth::check()) {
            return response()->json(['user' => auth()->user()], 200);
        }

    }

    public function update(Request $request){
        $this->validate($request, [
            'name'=>'required',
            'email'=>'required',
            'description'=>'nullable'
        ]);

        if (Auth::check()){
            $user = User::find(Auth::user()->id);
            $user->name = $request->name;
            $user->email = $request->email;
            $user->description = $request->description;
            $user->save();
            
            return response()->json(["message" => "Profile updated succeed"], 200);
        } else {
        	return "Error";
        }
                
    }

    public function user_info($slug){
        $user = User::where('slug', $slug)->first();
        // $stories = $user->articles();
        return response()->json(['user' => $user]);
    }
}
