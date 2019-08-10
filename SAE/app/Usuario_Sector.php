<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Usuario_Sector extends Model
{
    protected $primaryKey = 'id_usuario_sector';

    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
