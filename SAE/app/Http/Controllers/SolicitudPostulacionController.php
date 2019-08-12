<?php

namespace App\Http\Controllers;

use App\solicitudPostulacion;
use App\evaluacionPostulacion;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Postulante;


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

    public function crearNuevaSolicitud(Request $request){
            //actualizo estado de Postulante
             $postulante = App\Postulante::find($request->id_postulante);
             $postulantes->estado = 'Por Evaluar';
             $evaluacion_postulacion = new evaluacionPostulacion;
             $evaluacion_postulacion->save();
             $solicitud = solicitudPostulacion::create([
                'id_postulante'     =>  $request->id_postulante,
                'id_usuario'        =>  $request->id_usuario,
                'id_evaluacion'     =>  $evaluacion_postulacion->id_evaluacion,
            
            ]);
            return response()->json('Solicitud creada');



    }


    public function verSolicitudesPorUsuario(){
          $userId = Auth::id();
          $solicitudes = DB::table('solicitud_postulacions')
          ->join('postulantes', 'postulantes.id_postulante', '=', 'solicitud_postulacions.id_postulante')
            ->select('postulantes.*','solicitud_postulacions.*')
            ->where('postulantes.id_postulante',$userId)
            ->get();
          
          return response()->json($solicitudes);



    }

    public function finalizarEvaluacionPostulante(Request $request){
            //fecha actual
            $current_date_time = Carbon::now()->toDateTimeString();
            //obtengo id de la solicitud de evaluacion
            $solicitud =  DB::table('solicitud_postulacions')->where('id_solicitud','=',$request->id_solicitud);
            //actulizo campos en postulante
            $postulante = App\Postulante::find($solicitud->id_postulante);
            $postulante->estado = 'Por Habilitar';
            $postulante->fechaHabilitacion = $current_date_time;
            //actualizo campos en evaluacionpostulante
            $evaluacion = App\evaluacionPostulacion::find($solicitud->id_evaluacion);
            $evaluacion->detalleEvaluacion = $request->detalleEvaluacion;
            $evaluacion->tipoEvaluacion = $request->tipoEvaluacion;
            $evaluacion->resultadoEvaluacion = $request->resultadoEvaluacion;

        return response()->json('Evaluacion Finalizada!');


    }

    public function guardarEvaluacionPostulante(Request $request){
            //fecha actual
            $current_date_time = Carbon::now()->toDateTimeString();
            //obtengo id de la solicitud de evaluacion
            $solicitud =  DB::table('solicitud_postulacions')->where('id_solicitud','=',$request->id_solicitud);
            //actualizo campos en evaluacionpostulante
            $evaluacion = App\evaluacionPostulacion::find($solicitud->id_evaluacion);
            $evaluacion->detalleEvaluacion = $request->detalleEvaluacion;
            $evaluacion->tipoEvaluacion = $request->tipoEvaluacion;
            $evaluacion->resultadoEvaluacion = $request->resultadoEvaluacion;

        return response()->json('Campos guardados!');


    }
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
