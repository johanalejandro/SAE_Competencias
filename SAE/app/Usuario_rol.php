<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Usuario_rol extends Model
{
	protected $primaryKey = 'id_usuario_rol';
    
    public function user()
    {
        return $this->belongsTo('App\User');
    }

    protected $fillable = [
        'id_usuario', 
        'tipoUsuario'
    ];

}
