<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Feature extends Model
{
    public function room()
    {
        return $this->belongsTo('App\Room');
    }
}
