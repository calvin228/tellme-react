<?php

namespace App\Http\Controllers;

use App\Like;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LikeController extends Controller
{
    public function like(Request $request)
    {
        if (Auth::check()) {

            $like = new Like;
            $like->user_id = Auth::user()->id;  
            $like->article_id = $request->story_id;
            $like->story_slug = $request->slug;
            $like->save();
            
            return response()->json(['message' => 'Story liked'], 201);
        } else if (!Auth::check()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        } else {
            return response()->json(['message' => 'Error']);
        }
    }

    public function checkLike(Request $request){
        if (Auth::check()){ 
            $isExist = Like::where('user_id', Auth::user()->id)->where('story_slug', $request->slug)->exists();
            return response()->json($isExist);
        }
    }

    public function dislike(Request $request){
        if (Auth::check()) {

            $like = Like::where('user_id', Auth::user()->id)->delete();

            return response()->json(['like'=>$like, 'message' => 'Like deleted'], 201);

        } 
    }

    public function countLike($slug){
        $countLike = Like::where('story_slug', $slug)->get()->count();
        // $countComment = count($comment);
        return $countLike;
    }
}
