<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Ambito extends Model
{
    //
    protected $primaryKey = 'id_ambito';
    public function sectors()
    {
        return $this->hasMany('App\Sector');
    }
}
