<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Usuario_rol extends Model
{
	private $primaryKey = 'id_usuaario_rol';
    
    public function user()
    {
        return $this->belongsTo('App\User');
    }

}
