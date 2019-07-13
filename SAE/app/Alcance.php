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
}
