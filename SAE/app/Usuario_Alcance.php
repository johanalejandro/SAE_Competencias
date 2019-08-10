<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Usuario_Alcance extends Model
{
    protected $primaryKey = 'id_usuario_alcance';

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    protected $fillable = [
        'id_usuario', 
        'id_alcance'
    ];
}
