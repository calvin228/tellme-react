<?php

namespace App\Http\Controllers;

use App\Topic;
use App\Post;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TopicController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $topics = Topic::with('user','post')->orderBy('created_at', 'desc')->get();

        return response()->json($topics , 200);
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
        if (Auth::check()) {
            $this->validate($request, [
                'subject' => 'required',
                'category_id' => 'required',
            ]);

            $topic = new Topic;
            $topic->subject = $request->subject;
            $topic->category_id = $request->category_id;
            $topic->is_closed = 0; //0 = True, 1 = False
            $topic->user_id = Auth::user()->id;
            $topic->visit_count = 0;
            $topic->save();

            return response()->json(['message' => 'Topic successfully saved', "topic" => $topic], 201);
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
    
        $topic = Topic::where('id',$id)->with('user')->get();
        Topic::where('id',$id)->increment('visit_count');
        return response()->json(["topic"=>$topic], 200);
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
            $topic = Topic::find($id);
            if ($topic->user_id == Auth::user()->id){
                $topic->delete();
                return response()->json(["message"=>"Topic deleted"], 202);
            }
        } else if (Auth::check()){
            return response()->json(["message"=>"Unauthorized"], 401);
        }

        return response()->json(['message' => "Oops, something has gone wrong"], 500);
    }

}
