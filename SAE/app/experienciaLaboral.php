<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class experienciaLaboral extends Model
{
    //
    protected $primaryKey = 'id_experiencia';

    public function postulante()
    {
        return $this->belongsTo('App\Postulante');
         
    }

       public function alcance()
    {
    	return $this->hasOne('App\Alcance');

         
    }

}
