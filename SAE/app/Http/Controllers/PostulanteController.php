<?php

namespace App\Http\Controllers;

use App\Postulante;
use Illuminate\Http\Request;

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
        /*Valido los campos */
         $validatedData = $request->validate([
          'nombres' => 'required|max:100',
          'apellidos' => 'required|max:100',
          'genero' => 'required',
          'cedula' => 'required',
          'email' => 'required',
          'fechaNacimiento' => 'required',
          'telefono' => 'required',
          'provincia' => 'required',
          'disponibilidadViajar' => 'required',
        ]);
        $postulante = Postulante::create([
            'nombres'   =>  $validatedData->['nombre'],
            'apellidos' =>  $validatedData->['apellido'],
            'ciudad'    =>  $validatedData->['ciudad'],
            'genero'   =>   $validatedData->['genero'],
            'email'    =>   $validatedData->['email'],
            'cedula'  =>    $validatedData->['cedula'],
            'fechaNacimiento'=>$validatedData->['fechaNacimiento'],
            'telefono'=>       $validatedData->['telefono'],
            'provincia'=>     $validatedData->['provincia'],
            'estado'=>        $validatedData->['estado'],
            'fechaHabilitacion'=>$validatedData->['fechaHabilitacion']);
        
        return response()->json('Postulante creado');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Postulante  $postulante
     * @return \Illuminate\Http\Response
     */
    public function show(Postulante $postulante)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Postulante  $postulante
     * @return \Illuminate\Http\Response
     */
    public function edit(Postulante $postulante)
    {
        //
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
