<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/postulacion', function () {
    return view('welcome');
});

Route::get('/sectores', function () {
    return view('pages/seleccionarSector');
});

Route::get('/postulacion-formulario', function () {
    return view('pages/formPostulacion');
});

Route::get('/solicitud-postulacion', function () {
    return view('pages/solicitud_postulacion_datos_personales');
});


Route::get('/ambitosSAE', function () {
    $ambitos = DB::table('ambitos')->get();
    return $ambitos;
});

Route::resource('ambitos','AmbitoController');

