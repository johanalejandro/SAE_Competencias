<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Postulante extends Model
{
    const POSTULANTE_POR_HABILITAR ='por habilitar';
    const POSTULANTE_HABILITADO ='habilitado';
    const POSTULANTE_DESHABILITADO ='deshabilitado';
    const POSTULANTE_POR_ASIGNAR ='por asignar';
    const POSTULANTE_POR_EVALUAR ='por evaluar';

    protected $primaryKey = 'id_postulante';
    public $timestamps = true;

    protected $fillable = [
        'nombres', 
        'apellidos', 
        'ciudad',
        'email',
        'cedula',
        'fechaNacimiento',
        'telefono',
        'provincia',
        'estado',
        'fechaHabilitacion',
        'disponibilidadViajar',
        'tipoPostulacion'
    ];

    /* Relaciones de Base de Datos */

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
