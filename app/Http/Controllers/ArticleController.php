<?php

namespace App\Http\Controllers;

use DB;
use App\Article;
use App\Category;
use App\User;
use App\Like;
use App\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $articles = Article::with('user','comment', 'like')->orderBy('created_at', 'desc')->get();
        return response()->json($articles, 200);
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
                'title' => 'required',
                'body' => 'required',
            ]);

            $slug = $this->generateSlug($request->title);

            $article = new Article;
            $article->title = $request->title;
            $article->body = $request->body;
            $article->slug = $slug;
            $article->user_id = Auth::user()->id;
            $article->visit_count = 0;
            $article->save();

            return response()->json($article, 200);
        } else {
            return response()->json(["message"=>"Unauthorized"], 401);
        }
    }

    public function generateSlug($title)
    {
        $slug = str_slug($title);
        $randomString = uniqid();
        return $slug."-".$randomString;
    }


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($slug)
    {
        $article = Article::where('slug', $slug)->with('user')->get();
        Article::where('slug',$slug)->increment('visit_count');
        if (count($article) == 0){
            return response()->json(['message' => 'Story not found'], 404);
        }

        return response()->json(['article'=>$article, 'current_user' => auth()->user()], 200);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $slug)
    {
        $this->validate($request, [
            "title" => "required",
            "body"=>"required"
        ]);

        if (Auth::check()){

            $article = Article::where('slug', $slug)->first();
            if ($article->user_id == Auth::user()->id || Auth::user()->name == "admin"){
                $article->title = $request->title;
                $article->body = $request->body;
                $article->save();
                
                return response()->json(["message" => "Story sucessfully updated"], 202);
            } else {
                return response()->json(['message' => "Story not found"], 404);
            }   
        } else if (!Auth::check()) {
            return response()->json(['message' => "Unauthorized"], 401);
        }
        return response()->json(['message' => "Oops, something has gone wrong"], 500);
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
            $article = Article::find($id);

            if($article == null){
                return response()->json(['message'=>'Story not found'], 404);
            } else {
                if ($article->user_id == Auth::user()->id){
                    $article->delete();
                    return response()->json(['message'=>'Story deleted'], 202);   
                } else {
                    return response()->json(['message' => 'This is not your story!'], 401);
                }
                
            }
        } else if (!Auth::check()){
            return response()->json(['message'=>'Unauthorized'], 401);
        }

        //Step 2:
        //Delete image on cloudinary
    }
}
