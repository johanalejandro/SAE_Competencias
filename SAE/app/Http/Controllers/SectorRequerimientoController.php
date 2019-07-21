<?php

namespace App\Http\Controllers;

use App\sectorRequerimiento;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SectorRequerimientoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\sectorRequerimiento  $sectorRequerimiento
     * @return \Illuminate\Http\Response
     */
    public function edit(sectorRequerimiento $sectorRequerimiento)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\sectorRequerimiento  $sectorRequerimiento
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //$requerimientos = sectorRequerimiento::belongsto($id)->orderBy('created_at')->get();
        $requerimiento = sectorRequerimiento::findOrFail($id);
        return response()->json($requerimiento);
    }



    public function verRequerimientosPorSector($id){
        $requerimientos = DB::table('sector_requerimientos')->where('id_sector',$id)->get();
        return response()->json($requerimientos);

    }
}
