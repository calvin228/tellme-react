<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Topic;
use App\Article;

class SearchController extends Controller
{
    
    public function search(Request $request){
        $data = $request->input('search');

        $articles = Article::where('title', 'like', '%'.$data.'%')->orWhere('body','like','%'.$data.'%')->with('user','comment','like')->get();
        $topic = Topic::where('subject','like','%'.$data.'%')->with('post', 'user')->get();
        return response()->json(['articles' => $articles, 'topics'=>$topic], 200);
    }
}
