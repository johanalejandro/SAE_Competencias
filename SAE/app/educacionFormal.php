<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class educacionFormal extends Model
{
    //
    public $primaryKey = 'id_formacion';

     public function postulante()
    {
        return $this->belongsTo('App\Postulante');
         
    }
    
}
