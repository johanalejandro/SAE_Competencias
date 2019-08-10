<?php

namespace App\Http\Controllers;

use App\Experiencia_evaludor;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;


class ExperienciaEvaludorController extends Controller
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
        $keypostulante = DB::table('postulantes')->select('id_postulante')->where('cedula', $request->cedula)->first();

        $current_date_time = Carbon::now()->toDateTimeString();
        $experiencia = Experiencia_evaludor::create([
                'id_postulante'     =>  $keypostulante->id_postulante,
                'id_sector_requerimiento' =>  $request->id_sector_requerimiento,
                'descripcion'    =>  $request->descripcion,
                'nombreEmpresa'     =>  $request->nombreEmpresa,
                'cargoEjercido'      =>  $request->cargoEjercido,
                'fecha_inicio'    =>  \Carbon\Carbon::parse($request->fechaInicio),
                'fecha_fin'     =>  \Carbon\Carbon::parse($request->fechaFin),
                'esTrabajoActual'     =>  $request->esTrabajoActual,

        ]);
         return response()->json('Experiencia creada');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Experiencia_evaludor  $experiencia_evaludor
     * @return \Illuminate\Http\Response
     */
    public function show(Experiencia_evaludor $experiencia_evaludor)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Experiencia_evaludor  $experiencia_evaludor
     * @return \Illuminate\Http\Response
     */
    public function edit(Experiencia_evaludor $experiencia_evaludor)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Experiencia_evaludor  $experiencia_evaludor
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Experiencia_evaludor $experiencia_evaludor)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Experiencia_evaludor  $experiencia_evaludor
     * @return \Illuminate\Http\Response
     */
    public function destroy(Experiencia_evaludor $experiencia_evaludor)
    {
        //
    }
}
