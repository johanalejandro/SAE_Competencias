<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Experiencia_evaludor extends Model
{
    protected $primaryKey = 'id_experiencia_evaluador';

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
        'id_sector', 
        'descripcion',
        'cargoEjercido',
        'nombreEmpresa',
        'fecha_inicio',
        'fecha_fin',
        'esTrabajoActual'
    ];
}
