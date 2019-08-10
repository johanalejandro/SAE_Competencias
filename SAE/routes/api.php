<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('ambito','AmbitoController@index');//localhost:[port]/api/ambito

Route::get('sector','SectorController@index');

Route::get('alcance','AlcanceController@index');

Route::get('alcance','AlcanceController@index');







/*------------------------------------------------------------------------------------------------------*/

/* Api para tabla postulantes */

Route::get('/postulantes', 'PostulanteController@index');

Route::get('/postulantes/{id}', 'PostulanteController@show');

Route::post('/postulantes', 'PostulanteController@store');

Route::get('postulantePorHabilitar', 'PostulanteController@mostrarPostulantePorHabilitar'); // Muestra postulantes por habilitar

Route::get('postulanteHabilitado', 'PostulanteController@mostrarPostulanteHabilitado');

Route::get('postulanteAsignar', 'PostulanteController@mostarPostulantePorAsignar');


Route::get('estadoPostulante/{cedula}', 'PostulanteController@verEstadoPostulacion');

/*Muestra el detalle de los alcances del postulante con {{ id }} */
Route::get('detallesAlcances/{id}', 'PostulanteController@verDetallesAlcance'); 

Route::get('postulantePorAlcance/{id}','PostulanteController@verPostulantesPorAlcance');

/*Muestra evaluadores habilitados mas toda la infon necesaria de mostrar */

Route::get('mostrarEvaluadoresHabilitado','PostulanteController@mostrarEvaluadoresHabilitado');

/*Muestra expertos habilitados mas toda la info necesaria de mostrar */

Route::get('mostrarExpertosHabilitado','PostulanteController@mostrarExpertosHabilitado');


/*Muestra toda la info del porstulante a evaluador {{id}} esto lo usaras en ver detalle para evaluar o calidad */


Route::get('mostrarDetallesEvaluador/{id}','PostulanteController@mostrarDetallesEvaluador');

/*Muestra toda la info del postulante a experto {{id}} esto lo usaras en ver detalle para evaluar o calidad */

Route::get('mostrarDetallesExperto/{id}','PostulanteController@mostrarDetallesExperto');

/*Cambia el estado a habilitado {{ id }} */

Route::get('habilitarPostulante/{id}','PostulanteController@habilitarPostulante');





//Route::get('descargarCV/{id}','PostulanteController@descargarCV');



/*------------------------------------------------------------------------------------------------------*/

Route::post('/experiencias', 'experienciaExpertoController@store');

Route::post('/experienciasEvaluador', 'ExperienciaEvaludorController@store');



/*------------------------------------------------------------------------------------------------------*/
/*Api para mostrar requerimientos segun sector (se pasa id de sector)*/

Route::get('requerimientosSector/{id}', 'SectorRequerimientoController@verRequerimientosPorSector');

Route::get('/sector/{id}', 'SectorRequerimientoController@show');


/*------------------------------------------------------------------------------------------------------*/

/* Para guardar los cursos al que postulo el evaluador*/

Route::post('/cursosEvaluador', 'CursosEvaluadorController@store');

/*------------------------------------------------------------------------------------------------------*/

/* Para obtener listado de expertos que evaluaran a los postulantes pasas el id del alcance al que postulo */
 

Route::get('obtenerUsuariosPorAlcance/{id}', 'UsuarioAlcanceController@obtenerUsuariosPorAlcance');

/*------------------------------------------------------------------------------------------------------*/

/* Para obtener listado de evaluadores que evaluaran a los postulantes pasas el id del sector al que postulo */

Route::get('obtenerUsuariosPorSector/{id}','UsuarioSectorController@obtenerUsuariosPorSector');

/*------------------------------------------------------------------------------------------------------*/

/* Para crear la solicitud de postulacion una vez seleccionado el evaluador/experto que evaluara */

Route::post('/crearNuevaSolicitud', 'SolicitudPostulacionController@crearNuevaSolicitud');


