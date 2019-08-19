<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class experienciaExperto extends Model
{
    //
    protected $primaryKey = 'id_experiencia_experto';
    public $timestamps = true;

    public function postulante()
    {
        return $this->belongsTo('App\Postulante');
         
    }

    public function alcance()
    {
    	return $this->hasOne('App\Alcance');

         
    }

    protected $fillable = [
        'id_postulante', 
        'id_alcance', 
        'descripcion',
        'cargoEjercido',
        'nombreEmpresa',
        'fecha_inicio',
        'fecha_fin',
        'estado',
        'esTrabajoActual'
    ];

}
