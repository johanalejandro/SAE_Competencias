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


    /**
     * Scope a query to only include the sector sent.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeBelongsto($query,$id)
    {
        return $query->where('id_sector', $id);
    }

}
