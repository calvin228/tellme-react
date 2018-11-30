<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Like extends Model
{
    protected $table = 'likes';

    protected $primaryKey = 'id';

    public function user(){
        return $this->belongsTo('App\User');
    }

    public function article(){
    	return $this->belongsTo('App\Article');
    }
}
