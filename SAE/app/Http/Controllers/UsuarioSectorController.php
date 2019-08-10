<?php

namespace App\Http\Controllers;

use App\Usuario_Sector;
use Illuminate\Http\Request;

class UsuarioSectorController extends Controller
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

    public function obtenerUsuariosPorSector($id){
        $users = DB::table('usuario__sectors')
          ->join('users', 'users.id_usuario', '=', 'usuario__sectors.id_usuario')
          ->select('users.nombre','users.apellido','users.id_usuario')
            ->where('usuario__sectors.id_sector_requerimiento',$id)
            ->get();
        return response()->json($users);

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
     * @param  \App\Usuario_Sector  $usuario_Sector
     * @return \Illuminate\Http\Response
     */
    public function show(Usuario_Sector $usuario_Sector)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Usuario_Sector  $usuario_Sector
     * @return \Illuminate\Http\Response
     */
    public function edit(Usuario_Sector $usuario_Sector)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Usuario_Sector  $usuario_Sector
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Usuario_Sector $usuario_Sector)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Usuario_Sector  $usuario_Sector
     * @return \Illuminate\Http\Response
     */
    public function destroy(Usuario_Sector $usuario_Sector)
    {
        //
    }
}
