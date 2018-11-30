<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    protected $table = 'articles';

    protected $primaryKey = 'id';

    // protected $fillable = ['title','body','cover_image','slug']
    public function category(){
        return $this->belongsTo('App\Category');
    }

    public function user(){
    	return $this->belongsTo('App\User');
    }

    public function comment(){
    	return $this->hasMany('App\Comment');
    }

    public function like(){
    	return $this->hasMany('App\Like');
    }
}

