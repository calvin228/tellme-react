<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $table = 'posts';

    protected $primaryKey = 'id';

    public function user(){
        return $this->belongsTo('App\User');
    }

    public function topic(){
        return $this->hasOne('App\Topic', 'topic_id');
    }
}
