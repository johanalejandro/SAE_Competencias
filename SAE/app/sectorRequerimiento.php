<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class sectorRequerimiento extends Model
{
    protected $primaryKey = 'id_sector_requerimiento';
    public $timestamps = true;

    public function sector()
    {
        return $this->belongsTo('App\Sector');
    }

    public function curso_evaluador()
    {
        return $this->belongsTo('App\Cursos_Evaluador');
    }

}
