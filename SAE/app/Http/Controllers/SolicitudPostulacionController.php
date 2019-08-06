<?php

namespace App\Http\Controllers;

use App\solicitudPostulacion;
use Illuminate\Http\Request;
use Carbon\Carbon;


class SolicitudPostulacionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $listadoSolicitudes = solicitudPostulacion::all();
        return response()->json($listadoSectores);
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
     * @param  \App\solicitudPostulacion  $solicitudPostulacion
     * @return \Illuminate\Http\Response
     */
    public function show(solicitudPostulacion $solicitudPostulacion)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\solicitudPostulacion  $solicitudPostulacion
     * @return \Illuminate\Http\Response
     */
    public function edit(solicitudPostulacion $solicitudPostulacion)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\solicitudPostulacion  $solicitudPostulacion
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, solicitudPostulacion $solicitudPostulacion)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\solicitudPostulacion  $solicitudPostulacion
     * @return \Illuminate\Http\Response
     */
    public function destroy(solicitudPostulacion $solicitudPostulacion)
    {
        //
    }
}
