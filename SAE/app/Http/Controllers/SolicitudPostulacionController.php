<?php

namespace App\Http\Controllers;

use App\solicitudPostulacion;
use App\evaluacionPostulacion;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Auth;
use App\Postulante;
use App\Cursos_Evaluador;
use App\experienciaExperto;


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
             $postulante = Postulante::find($request->id_postulante);
             $postulante->estado = 'Por Evaluar';
             $evaluacion_postulacion = new evaluacionPostulacion;
             $evaluacion_postulacion->save();
             $solicitud = solicitudPostulacion::create([
                'id_postulante'     =>  $request->id_postulante,
                'id_usuario'        =>  $request->id_usuario,
                'id_evaluacion'     =>  $evaluacion_postulacion->id_evaluacion,
            
            ]);
            return response()->json('Solicitud creada');



    }


    public function verSolicitudesPorUsuarioEvaluador(){
          $userId = Auth::id();
          $solicitudes = DB::table('solicitud_postulacions')
          ->join('experiencia_evaludors', 'experiencia_evaludors.id_postulante', '=', 'solicitud_postulacions.id_postulante')
          ->join('cursos__evaluadors', 'cursos__evaluadors.id_postulante' ,'=', 'solicitud_postulacions.id_postulante')
          ->join('educacion_formals', 'educacion_formals.id_postulante', '=', 'solicitud_postulacions.id_postulante')
          ->join('postulantes', 'postulantes.id_postulante', '=', 'solicitud_postulacions.id_postulante')
            ->select('postulantes.*','solicitud_postulacions.*','experiencia_evaludors.*','educacion_formals.*','cursos__evaluadors.*')
            ->where([
                ['solicitud_postulacions.id_usuario',$userId],
                ['postulantes.tipoPostulacion', "Evaluador"],
                ['postulantes.estado','Por Evaluar'],
            ])
            ->get();
          
          return response()->json($solicitudes);



    }

    public function verSolicitudesPorUsuarioExperto(){
        $userId = Auth::id();
        $solicitudes = DB::table('solicitud_postulacions')
        ->join('experiencia_expertos', 'experiencia_expertos.id_postulante', '=', 'solicitud_postulacions.id_postulante')
        ->join('educacion_formals', 'educacion_formals.id_postulante', '=', 'solicitud_postulacions.id_postulante')
        ->join('postulantes', 'postulantes.id_postulante', '=', 'solicitud_postulacions.id_postulante')
          ->select('postulantes.*','solicitud_postulacions.*','experiencia_expertos.*','educacion_formals.*')
          ->where([
              ['solicitud_postulacions.id_usuario',$userId],
              ['postulantes.tipoPostulacion','Experto'],
              ['postulantes.estado','Por Evaluar'],
          ])
          ->get();
        
        return response()->json($solicitudes);
            

  }

    public function verSolicitudEvaluacion($id){
      $solicitud = DB::table('solicitud_postulacions')->where('id_solicitud',$id)->first();
      $evaluacion = DB::table('evaluacion_postulacions')->where('id_evaluacion',$solicitud->id_evaluacion)->first();
          return response()->json($evaluacion);

  }

/*
    public function finalizarEvaluacionPostulante(Request $request){
            //fecha actual
            $current_date_time = Carbon::now()->toDateTimeString();
            //obtengo id de la solicitud de evaluacion
            $solicitud =  DB::table('solicitud_postulacions')->where('id_solicitud',$request->id_solicitud)->first();
            //actulizo campos en postulante
            $postulante = Postulante::find($solicitud->id_postulante);
            $postulante->estado = 'Por Habilitar';
            $postulante->fechaHabilitacion = $current_date_time;
            $postulante->save();
            //actualizo campos en evaluacionpostulante
            $evaluacion = evaluacionPostulacion::find($solicitud->id_evaluacion);
            $evaluacion->detalleEvaluacion = $request->detalleEvaluacion;
            $evaluacion->tipoEvaluacion = $request->tipoEvaluacion;
            $evaluacion->resultadoEvaluacion = $request->resultadoEvaluacion;
            $evaluacion->save();

        return response()->json('Evaluacion Finalizada!');
}

*/
  /* Finalizar evaluacion Evaluador y Experto */
    public function finalizarEvaluacionEvaluador(Request $request){
            //fecha actual
            $current_date_time = Carbon::now()->toDateTimeString();
            //obtengo id de la solicitud de evaluacion
            $solicitud =  DB::table('solicitud_postulacions')->where('id_solicitud',$request->id_solicitud)->first();
            //actulizo campos en postulante
            $postulante = Postulante::find($solicitud->id_postulante);
            $postulante->estado = 'Por Habilitar';
            $postulante->fechaHabilitacion = $current_date_time;
            $postulante->save();
            
            //actualizo estados en cursos_evaluador

            foreach(json_decode($request->estados) as $estado){
                $curso = DB::table('cursos__evaluadors')->select('id_curso_evaluador')
                                                        ->where('id_postulante',$solicitud->id_postulante)
                                                        ->where('id_sector_requerimiento', $estado->id_sector_requerimiento)
                                                        ->first();
                $cursoActualizado = Cursos_Evaluador::find($curso->id_curso_evaluador);
                $cursoActualizado->save();
             
            }
            //actualizo campos en evaluacionpostulante
            $evaluacion = evaluacionPostulacion::find($solicitud->id_evaluacion);
            $evaluacion->detalleEvaluacion = $request->detalleEvaluacion;
            $evaluacion->tipoEvaluacion = $request->tipoEvaluacion;
            $evaluacion->resultadoEvaluacion = $request->resultadoEvaluacion;
            $evaluacion->save();

        return response()->json('Evaluacion Finalizada!');


    }



    public function finalizarEvaluacionExperto(Request $request){
            //fecha actual
            $current_date_time = Carbon::now()->toDateTimeString();
            //obtengo id de la solicitud de evaluacion
            $solicitud =  DB::table('solicitud_postulacions')->select('*')->where('id_solicitud',$request->id_solicitud)->first();
            //actulizo campos en postulante
            $postulante = Postulante::find($solicitud->id_postulante);
            $postulante->estado = 'Por Habilitar';
            $postulante->fechaHabilitacion = $current_date_time;
            $postulante->save();
            //actualizo estados en experiencia_experto

            foreach(json_decode($request->estados) as $estado){
                $experiencia = DB::table('experiencia_expertos')->select('id_experiencia')->where('id_postulante',$solicitud->id_postulante)
                                                                ->where('id_alcance', $estado->id_alcance)
                                                                ->first();
                $exp = experienciaExperto::find($experiencia->id_experiencia);                                              
                $exp ->estado = $estado->estado;
                $exp->save();
             
            }
            //actualizo campos en evaluacionpostulante
            $evaluacion = evaluacionPostulacion::find($solicitud->id_evaluacion);
            $evaluacion->detalleEvaluacion = $request->detalleEvaluacion;
            $evaluacion->tipoEvaluacion = $request->tipoEvaluacion;
            $evaluacion->resultadoEvaluacion = $request->resultadoEvaluacion;
            $evaluacion->save();

        return response()->json('Evaluacion Finalizada!');


    }

    /*
    public function guardarEvaluacionPostulante(Request $request){
            //fecha actual
            $current_date_time = Carbon::now()->toDateTimeString();
            //obtengo id de la solicitud de evaluacion
            $solicitud =  DB::table('solicitud_postulacions')->select('id_evaluacion')->where('id_solicitud',$request->id_solicitud)->first();
            //actualizo campos en evaluacionpostulante
            $evaluacion = evaluacionPostulacion::find($solicitud->id_evaluacion);
            $evaluacion->detalleEvaluacion = $request->detalleEvaluacion;
            $evaluacion->tipoEvaluacion = $request->tipoEvaluacion;
            $evaluacion->resultadoEvaluacion = $request->resultadoEvaluacion;
            $evaluacion->updated_at = $current_date_time;
            $evaluacion->save();

        return response()->json('Campos guardados!');


    }
    */


  /* Guardar evaluaciones de expertos y postulantes */
   public function guardarEvaluacionEvaluador(Request $request){
          //fecha actual
          $current_date_time = Carbon::now()->toDateTimeString();
          //obtengo id de la solicitud de evaluacion
         $solicitud =  DB::table('solicitud_postulacions')->select('*')->where('id_solicitud',$request->id_solicitud)->first();

         foreach(json_decode($request->estados) as $estado){
              $curso = DB::table('cursos__evaluadors')->select('id_curso_evaluador')
                                                      ->where('id_postulante',$solicitud->id_postulante)
                                                      ->where('id_sector_requerimiento', $estado->id_sector_requerimiento)
                                                      ->first();
              $cursoActualizado = Cursos_Evaluador::find($curso->id_curso_evaluador);
              $cursoActualizado ->updated_at = $current_date_time;
              $cursoActualizado->save();
           
          }
          //actualizo campos en evaluacionpostulante
          $evaluacion = evaluacionPostulacion::find($solicitud->id_evaluacion);
          $evaluacion->detalleEvaluacion = $request->detalleEvaluacion;
          $evaluacion->tipoEvaluacion = $request->tipoEvaluacion;
          $evaluacion->resultadoEvaluacion = $request->resultadoEvaluacion;
          $evaluacion->updated_at = $current_date_time;
          $evaluacion->save();

      return response()->json('Campos guardados!');


  }
    public function guardarEvaluacionExperto(Request $request){
            //fecha actual
            $current_date_time = Carbon::now()->toDateTimeString();
            //obtengo id de la solicitud de evaluacion
            $solicitud =  DB::table('solicitud_postulacions')->select('*')->where('id_solicitud',$request->id_solicitud)->first();

            foreach(json_decode($request->estados) as $estado){
                $experiencia = DB::table('experiencia_expertos')->select('id_experiencia')->where('id_postulante',$solicitud->id_postulante)
                                                                ->where('id_alcance', $estado->id_alcance)
                                                                ->first();
                $exp = experienciaExperto::find($experiencia->id_experiencia);                                              
                $exp ->estado = $estado->estado;
                $exp ->updated_at = $current_date_time;
                $exp->save();
             
            }
            //actualizo campos en evaluacionpostulante
            $evaluacion = evaluacionPostulacion::find($solicitud->id_evaluacion);
            $evaluacion->detalleEvaluacion = $request->detalleEvaluacion;
            $evaluacion->tipoEvaluacion = $request->tipoEvaluacion;
            $evaluacion->resultadoEvaluacion = $request->resultadoEvaluacion;
            $evaluacion->updated_at = $current_date_time;
            $evaluacion->save();

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
        $solicitud = solicitudPostulacion::findOrFail($id);
        return response()->json($solicitud);
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
