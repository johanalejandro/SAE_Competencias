<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class solicitudPostulacion extends Model
{
	protected $primaryKey = 'id_solicitud';
    public $timestamps = true;
    
    public function postulante()
    {
        return $this->hasOne('App\Postulante');
    }
    public function evaluacionPostulacion()
    {
        return $this->hasOne('App\evaluacionPostulacion');
    }
    public function usuario()
    {
        return $this->hasOne('App\User');
    }


    


}
