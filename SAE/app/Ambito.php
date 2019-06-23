<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Ambito extends Model
{
    //
    public function sectors()
    {
        return $this->hasMany(Sector::class);
    }
}
