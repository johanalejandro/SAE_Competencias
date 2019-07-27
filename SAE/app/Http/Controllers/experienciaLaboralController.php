<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\experienciaLaboral;

class experienciaLaboralController extends Controller
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
        $keypostulante = DB::table('postulantes')->select('id_postulante')->where('cedula', $request->cedula)->first();
        $campos = $request->all();
        $campos['id_postulante']=$keypostulante;
        $campos['id_alcance']=$request->id_alcance;
        $campos['descripcion']=$request->descripcion;
        $campos['cargoEjercido']=$request->cargoEjercido;
        $campos['fecha_inicio']=$request->fecha_inicio;
        $campos['fecha_fin']=$request->fecha_fin;
        $campos['esTrabajoActual']=$request->esTrabajoActual;
        $experiencia= experienciaLaboral::create($campos);
        return response()->json('Experiencia creada');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        
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
