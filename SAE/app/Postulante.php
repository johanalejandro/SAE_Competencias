<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Postulante extends Model
{
    //
    public $primaryKey = 'id_postulante';

    public function experienciaLaborals()
    {
        return $this->hasMany('App\experienciaLaboral');

    }
    public function educacionFormals()
    {
        return $this->hasMany('App\educacionFormal');

    }

    public function solicitudPostulacions(){
        return $this->hasMany('App\solicitudPostulacion');
    }
}
