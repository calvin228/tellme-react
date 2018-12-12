<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Comment;
use App\User;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    public function index($slug){
        $comments = Comment::where('story_slug',$slug)->with('user')->orderBy('updated_at', "desc")->get();
        if ($comments) {
            return $comments;
        } else {
            return response()->json();
        }
    }

    public function store(Request $request){
        if (Auth::check()){
            $comment = new Comment;
            $comment->comment = $request->comment;
            $comment->user_id = Auth::user()->id;
            $comment->article_id = $request->story_id;
            $comment->story_slug = $request->story_slug;
            $comment->save();
            return response()->json(['message'=> "Comment saved"], 201);
        } else if (!Auth::check()) {
            return response()->json(['message'=> 'Unauthorized'], 401);
        } else {
            return response()->json();
        }
    }

    public function countComment($slug){
        $countComment = Comment::where('story_slug', $slug)->get()->count();
        // $countComment = count($comment);
        return $countComment;
    }

    public function destroy($id){
        if (Auth::check()){
            $comment = Comment::find($id);
            if ($comment->user_id == Auth::user()->id){
                $comment->delete();
                return response()->json(["message"=>"Comment deleted"], 202);
            }
        }
    }

    public function update(Request $request, $id){
        if (Auth::check()){
            $comment = Comment::find($id);
            if ($comment->user_id == Auth::user()->id){
                $comment->comment = $request->comment;
                $comment->save();
                return response()->json(["message"=>"Comment successfully updated"], 202);
            }
        }
    }
}
