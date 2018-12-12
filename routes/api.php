<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
    // return $request->user();
// });

// Auth route
Route::post('login', 'UserController@login');
Route::post('register', 'UserController@register');

Route::group(['middleware'=>'auth:api'], function(){
    Route::get('logout', 'UserController@logout');
    Route::get('user', 'UserController@detail');
    // if error shown Route[login] undefined, means unauthorized because of middleware auth;
});


Route::get('user/{slug}', 'UserController@user_info');
Route::put('user/update', 'UserController@update')->middleware("auth:api");
Route::put('user/update/image', "UserController@updateProfileImage")->middleware('auth:api');
// Route::get('password/reset/{token?}', "Auth")
// Articles Route

Route::get('articles', 'ArticleController@index');
Route::group(['middleware'=>'auth:api'], function(){
	Route::post('articles', 'ArticleController@store'); 
});
Route::put('articles/{slug}/update', 'ArticleController@update')->middleware('auth:api');
Route::delete('articles/delete/{id}', 'ArticleController@destroy')->middleware('auth:api');
Route::post('articles/draft/create', 'ArticleController@createDraft');
Route::put('articles/draft/edit/{id}', 'ArticleController@editDraft');
Route::get('articles/{slug}', 'ArticleController@show')->middleware('auth:api');

// Category Route
Route::get('categories', 'CategoryController@index');
Route::post('category', 'CategoryController@store');
// categories/....

// Serve Image Route
Route::get('image/{category}/{image}', 'ImageController@image_show');

// Comment Route
Route::get('comments/{slug}', "CommentController@index");
Route::post('comment/create', 'CommentController@store')->middleware('auth:api');
Route::get('comments/{slug}/count', "CommentController@countComment");
Route::delete('comment/{id}/delete', "CommentController@destroy")->middleware('auth:api');
Route::put('comment/{id}/update', "CommentController@update")->middleware('auth:api');
// Like Route
Route::post('like/{slug}', "LikeController@like")->middleware('auth:api');
Route::delete('dislike/{slug}', "LikeController@dislike")->middleware('auth:api');
Route::get('like/{slug}/check', "LikeController@checkLike")->middleware('auth:api');
Route::get('like/{slug}/count', "LikeController@countLike");

Route::get('topics', "TopicController@index");
Route::post('topic/create', "TopicController@store")->middleware('auth:api');
Route::get('topics/{id}', "TopicController@show");
Route::put('topics/{id}/update', "TopicController@update")->middleware('auth:api');
Route::delete('topics/{id}/delete', "TopicController@destroy")->middleware("auth:api");

Route::get('posts/{topic_id}', "PostController@index")->middleware('auth:api');
Route::post('post/{topic_id}/create', "PostController@store")->middleware('auth:api'); // why doesnt accept param topic id?
Route::delete('post/{id}/delete', "PostController@destroy")->middleware('auth:api');
Route::put('post/{id}/update', "PostController@update")->middleware('auth:api');
//Note : middleware auth is required to do authentication 

//Search Route
Route::get('search', "SearchController@search");

