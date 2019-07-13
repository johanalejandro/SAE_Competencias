<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Sector extends Model
{
    //

    private $primaryKey = 'id_sector';
    public function ambito()
    {
        return $this->belongsTo('App\Ambito');
    }

     public function alcances()
    {
        return $this->hasMany('App\Alcance');
    }
}
