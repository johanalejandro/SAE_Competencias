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

/* Api para tabla postulantes */

Route::get('/postulantes', 'PostulanteController@index');

Route::get('/postulantes/{id}', 'PostulanteController@show');

Route::post('/postulantes', 'PostulanteController@store');

Route::get('postulantePorHabilitar', 'PostulanteController@mostrarPostulantePorHabilitar'); // Muestra postulantes por habilitar

Route::get('postulanteHabilitado', 'PostulanteController@mostrarPostulanteHabilitado');

/*Api para mostrar requerimientos segun sector (se pasa id de sector)*/

Route::get('requerimientosSector/{id}', 'SectorRequerimientoController@verRequerimientosPorSector');
