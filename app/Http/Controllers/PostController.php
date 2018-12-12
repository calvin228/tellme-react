<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Post;
use App\User;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($topic_id)
    {
        $posts = Post::where('topic_id', $topic_id)->with('user')->get();
        $current_user = Auth::user();
        return response()->json(["post"=>$posts, "current_user"=>$current_user], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        if (Auth::check()){
            $this->validate($request, [
                'content' => 'required',
            ]);
    
            $post = new Post;
            $post->content = $request->content;
            $post->topic_id = $request->topic_id;
            $post->user_id = Auth::user()->id;
            $post->save();

            return response()->json(['message'=>'Post successfully saved'], 201);
        } 
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        if(Auth::check()){
            $post = Post::find($id);
            if($post == null){
                return response()->json(['message'=>"Post not found"], 404);
            } else {
                $post->content = $request->content;
                $post->save();
                return response()->json(['message' => 'Post successfully updated'], 202);
            }
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        if (Auth::check()){
            $post = Post::find($id);
            if ($post->user_id == Auth::user()->id){
                $post->delete();
                return response()->json(["message"=>"Reply deleted"], 202);
            }
        }
    }
}
