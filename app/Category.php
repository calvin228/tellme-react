<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    public function articles(){
        return $this->hasMany('App\Article', 'category_id');
    }

    public function topics(){
        return $this->hasMany('App\Topic', 'category_id');
    }
}
