<?php

namespace App\Http\Controllers;

use App\Postulante;
use App\experienciaLaboral;
use App\educacionFormal;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class PostulanteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $listadoPostulante = Postulante::all();
        return response()->json($listadoPostulante);
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
        
        $current_date_time = Carbon::now()->toDateTimeString();
        $campos = $request->all();
        $campos['nombres']=$request->nombres;
        $campos['apellidos']=$request->apellidos;
        $campos['ciudad']="Guayaquil";
        $campos['genero']=$request->genero;
        $campos['email']=$request->email;
        $campos['cedula']=$request->cedula;
        $campos['fechaNacimiento']=$current_date_time;
        $campos['telefono']=$request->telefono;
        $campos['provincia']=$request->provincia;
        $campos['estado']=Postulante::POSTULANTE_POR_ASIGNAR;
        $campos['disponibilidadViajar']=1;
        $campos['fechaHabilitacion']=$current_date_time;
        //$campos['tipoPostulacion']=$request->tipoPostulacion;
        
       
        $postulante= Postulante::create($campos);

        $keypostulante = DB::table('postulantes')->select('id_postulante')->where('cedula', $request->cedula)->get();

        $educacion = educacionFormal::create([
            'id_postulante' => $keypostulante,
            'nombreInstitucion' => $request->nombreInstitucion,
            'tituloObtenido' => $request->tituloObtenido,
            'tipoFormacion' => $request->tipoFormacion,
            'archivoAnexo' => $request->archivoAnexo,

            



        ]);
        
        return response()->json('Postulante creado');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Postulante  $postulante
     * @return \Illuminate\Http\Response
     */
    public function show(Postulante $id)
    {
        $postulante = Postulante::findOrFail($id);
        return response()->json($postulante);
    }

    public function mostrarPostulantePorHabilitar()
    {
        $postulantes = DB::table('postulantes')->where('estado', 'Por Habilitar')->get();
        return response()->json($postulantes);
    }
    public function mostrarPostulanteHabilitado()
    {
        $postulantes = DB::table('postulantes')->where('estado', 'Habilitado')->get();
        return response()->json($postulantes);
    }

    

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Postulante  $postulante
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Postulante $postulante)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Postulante  $postulante
     * @return \Illuminate\Http\Response
     */
    public function destroy(Postulante $postulante)
    {
        //
    }
}
