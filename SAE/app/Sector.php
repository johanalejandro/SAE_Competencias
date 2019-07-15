<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Sector extends Model
{
    //

    protected $primaryKey = 'id_sector';
    public function ambito()
    {
        return $this->belongsTo('App\Ambito');
    }

     public function alcances()
    {
        return $this->hasMany('App\Alcance');
    }

    public function sectorRequerimientos()
    {
        return $this->hasMany('App\sectorRequerimiento');

    }
}
