<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Alcance extends Model
{
    //
    protected $table ='alcances';
    protected $primaryKey = 'id_alcance';

    public function sector()
    {
        return $this->belongsTo('App\Sector');
    }


    public function experienciaExpertos()
    {
        return $this->hasMany('App\experienciaExperto');
    }

    



    protected $fillable = [
        'id_sector', 
        'nombreAlcance', 
        'detalleAlcance',
        'normaRequerida',
        'anexoAlcance'
    ];

   
}
