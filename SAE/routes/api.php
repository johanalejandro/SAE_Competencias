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

Route::resource('ambito','AmbitoController');//localhost:[port]/api/ambito

Route::resource('sector','SectorController');

Route::resource('alcance','AlcanceController');

/* Api para tabla postulantes */

Route::get('/postulantes', 'PostulanteController@index');

Route::get('/postulantes/{id}', 'PostulanteController@show');

Route::post('/postulantes', 'PostulanteController@store');

/*Api para mostrar requerimientos segun sector (se pasa id de sector)*/

Route::get('/sector/{id}', 'SectorRequerimiento@show');
