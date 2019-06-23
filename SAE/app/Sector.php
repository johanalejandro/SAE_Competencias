<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Sector extends Model
{
    //
    public function ambito()
    {
        return $this->belongsTo(Ambito::class);
    }

     public function alcances()
    {
        return $this->hasMany(Alcance::class);
    }
}
