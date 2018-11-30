<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ImageController extends Controller
{
    public function image_show($category, $image){
        switch ($category){

            case "profile":
            $subPath = '/app/public/profile_images/';
            break;
            case "cover":
            $subPath = '/app/public/cover_images/';
            break;
            default:
            return response()->json(["messages"=> "Image path not found"], 404);
            break;
        }
        
        $path = storage_path().$subPath.$image;
        
        if(file_exists($path)){
            return response()->download($path);
        } else {
            return response()->json(['messages'=> "Image file not found"], 404);
        }
    }
}
