<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Postulante extends Model
{
    //
    protected $primaryKey = 'id_postulante';

    public function experienciaLaborals()
    {
        return $this->hasMany('App\experienciaLaboral');

    }
    public function educacionFormals()
    {
        return $this->hasMany('App\educacionFormal');

    }

    public function solicitudPostulacion(){
        return $this->belongsTo('App\solicitudPostulacion');
    }




}
