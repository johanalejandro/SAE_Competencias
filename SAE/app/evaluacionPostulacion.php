<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class evaluacionPostulacion extends Model
{
    //
    protected $primaryKey = 'id_evaluacion';
    
    public function solicitudPostulacion()
    {
        return $this->belongsTo('App\solicitudPostulacion');
    }

     protected $fillable = [
        'detalleEvaluacion', 
        'tipoEvaluacion', 
        'resultadoEvaluacion',
        'archivoAnexo'
    ];
}
