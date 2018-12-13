<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $table = 'comments';

    protected $primaryKey = 'id';

    protected $fillable = ['comment','user_id','article_id','story_slug'];

    public function user(){
        return $this->belongsTo('App\User');
    }

    public function articles(){
    	return $this->belongsTo('App\Article');
    }
}
