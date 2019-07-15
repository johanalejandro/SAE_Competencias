<?php

namespace App\Http\Controllers;

use App\sectorRequerimiento;
use Illuminate\Http\Request;

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
     * Display the specified resource.
     *
     * @param  \App\sectorRequerimiento  $sectorRequerimiento
     * @return \Illuminate\Http\Response
     */
    /*
    public function show($id)
    {
        $requerimiento = DB::table('sector_requerimientos')
                ->where('id_sector', $id);
         return response()->json($requerimiento);
    }
    */

    public function show($id)
    {
        //$requerimientos = sectorRequerimiento::belongsto($id)->orderBy('created_at')->get();
        $requerimiento = sectorRequerimiento::findOrFail($id);
        return response()->json($requerimiento);
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
    public function update(Request $request, sectorRequerimiento $sectorRequerimiento)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\sectorRequerimiento  $sectorRequerimiento
     * @return \Illuminate\Http\Response
     */
    public function destroy(sectorRequerimiento $sectorRequerimiento)
    {
        //
    }
}
