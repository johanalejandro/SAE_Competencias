<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class experienciaLaboral extends Model
{
    //
    public $primaryKey = 'id_experiencia';

    public function postulante()
    {
        return $this->belongsTo('App\Postulante');
         
    }

}
