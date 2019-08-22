<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\experienciaExperto;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class experienciaExpertoController extends Controller
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
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //dd($request->cedula);
         $keypostulante = DB::table('postulantes')->select('*')->where('cedula', $request->cedula)->get();
        $current_date_time = Carbon::now()->toDateTimeString();
        $experiencia = experienciaExperto::create([
                'id_postulante'     =>  $keypostulante->id_postulante,
                'id_alcance' =>         $request->id_alcance,
                'descripcion'    =>     $request->descripcion,
                'nombreEmpresa'     =>  $request->nombreEmpresa,
                'cargoEjercido'      => $request->cargoEjercido,
                'fecha_inicio'    =>  \Carbon\Carbon::parse($request->fechaInicio),
                'fecha_fin'     =>  \Carbon\Carbon::parse($request->fechaFin),
                'esTrabajoActual'     =>  $request->esTrabajoActual,

        ]);
        
        return response()->json('Experiencia creada');
        
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
