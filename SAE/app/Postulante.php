<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Postulante extends Model
{
    //
    protected $primaryKey = 'id_postulante';
    public $timestamps = true;

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


    protected $fillable = [
        'nombres', 'apellidos', 'ciudad','genero','email','cedula','fechaNacimiento','telefono','provincia','estado','fechaHabilitacion','disponibilidadViajar'
    ];





}
