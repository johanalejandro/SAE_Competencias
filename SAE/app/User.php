<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;
    protected $primaryKey = 'id_usuario';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'nombre', 
        'email', 
        'password',
        'apellido'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];


    public function usuario_rol()
    {
        return $this->hasOne('App\Usuario_rol');
    
    }


    public function usuario_alcances()
    {
        return $this->hasMany('App\Usuario_Alcance');
    
    }

    public function usuario_sectos()
    {
        return $this->hasMany('App\Usuario_Sector');
    
    }
    public function getId()
    {
      return $this->$primaryKey;
    }

}
