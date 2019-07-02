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

Route::get('/ambito', function () {
    return view('pages/seleccionarAmbito');
});

Route::resource('ambitos','AmbitoController');

