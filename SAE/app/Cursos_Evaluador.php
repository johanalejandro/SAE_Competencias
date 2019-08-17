<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Cursos_Evaluador extends Model
{
    //
     protected $primaryKey = 'id_curso_evaluador';
     public $table = "cursos__evaluadors";


     public function sectorRequerimiento()
    {
    	return $this->hasOne('App\sectorRequerimiento');

         
    }

     protected $fillable = [
        'id_postulante', 
        'id_sector_requerimiento', 
        'nombreInstitucion',
        'numeroHoras',
        'archivoAnexo'
    ];
}
