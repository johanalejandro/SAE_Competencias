<?php

namespace App\Http\Controllers;

use App\Cursos_Evaluador;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class CursosEvaluadorController extends Controller
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
        $keypostulante = DB::table('postulantes')->select('*')->where('cedula', $request->cedula)->get(); 

        $current_date_time = Carbon::now()->toDateTimeString();
        $experiencia = Cursos_Evaluador::create([
                'id_postulante'     =>  $keypostulante->id_postulante,
                'id_sector_requerimiento' =>  $request->id_sector_requerimiento,
                'nombreInstitucion'    =>  $request->nombreInstitucion,
                'numeroHoras'     =>  $request->numeroHoras,
                'archivoAnexo'      => $request->file('archivoAnexo')->store("files"),

        ]);
         return response()->json('Curso creado');
    }


    public function getAnexo($id)
    {
         $keyarchivo = Cursos_Evaluador::find($id);
         $url = $keyarchivo->archivoAnexo;
         return Storage::download($url);

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Cursos_Evaluador  $cursos_Evaluador
     * @return \Illuminate\Http\Response
     */
    public function show(Cursos_Evaluador $cursos_Evaluador)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Cursos_Evaluador  $cursos_Evaluador
     * @return \Illuminate\Http\Response
     */
    public function edit(Cursos_Evaluador $cursos_Evaluador)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Cursos_Evaluador  $cursos_Evaluador
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Cursos_Evaluador $cursos_Evaluador)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Cursos_Evaluador  $cursos_Evaluador
     * @return \Illuminate\Http\Response
     */
    public function destroy(Cursos_Evaluador $cursos_Evaluador)
    {
        //
    }
}
