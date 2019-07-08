<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class solicitudPostulacion extends Model
{
     public function postulante()
    {
        return $this->belongsTo('App\Postulante');
    }
}
