<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class solicitudPostulacion extends Model
{
	protected $primaryKey = 'id_solicitud';
    public $timestamps = true;


    protected $fillable = [
        'id_postulante', 
        'id_usuario', 
        'id_evaluacion'
        
    ];
    
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
