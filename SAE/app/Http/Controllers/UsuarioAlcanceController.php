<?php

namespace App\Http\Controllers;

use App\Usuario_Alcance;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UsuarioAlcanceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response

     */

     /**
     * Muestra todos los usuarios relacionados al alcance del {{ id }}
     *
     * @return \Illuminate\Http\Response

     */



    public function obtenerUsuariosPorAlcance($id){
        $users = DB::table('usuario__alcances')
          ->join('users', 'users.id_usuario', '=', 'usuario__alcances.id_usuario')
          ->select('users.nombre','users.apellido','users.id_usuario','usuario__alcances.id_alcance')
            ->where('usuario__alcances.id_alcance',$id)
            ->get();
        return response()->json($users);

    }
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
     * @param  \App\Usuario_Alcance  $usuario_Alcance
     * @return \Illuminate\Http\Response
     */
    public function show(Usuario_Alcance $usuario_Alcance)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Usuario_Alcance  $usuario_Alcance
     * @return \Illuminate\Http\Response
     */
    public function edit(Usuario_Alcance $usuario_Alcance)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Usuario_Alcance  $usuario_Alcance
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Usuario_Alcance $usuario_Alcance)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Usuario_Alcance  $usuario_Alcance
     * @return \Illuminate\Http\Response
     */
    public function destroy(Usuario_Alcance $usuario_Alcance)
    {
        //
    }
}
