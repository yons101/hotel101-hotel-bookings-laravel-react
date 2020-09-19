<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    public function hotel()
    {
        return $this->belongsTo('App\Hotel');
    }

    public function bookings()
    {
        return $this->hasMany('App\Booking');
    }

    public function features()
    {
        return $this->hasMany('App\Feature');
    }
}
