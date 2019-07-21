<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class educacionFormal extends Model
{
    //
    protected $primaryKey = 'id_educacion';
    public $timestamps = true;

     public function postulante()
    {
        return $this->belongsTo('App\Postulante');
         
    }

    protected $fillable = [
        'id_postulante', 
        'nombreInstitucion', 
        'tituloObtenido',
        'tipoFormacion',
        'archivoAnexo'
    ];
    
}
