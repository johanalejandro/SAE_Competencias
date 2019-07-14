<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSolicitudPostulacionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('solicitud_postulacions', function (Blueprint $table) {
            $table->bigIncrements('id_solicitud');
            $table->timestamps();
            $table->unsignedBigInteger('id_usuario');
            $table->unsignedBigInteger('id_evaluacion');
            $table->unsignedBigInteger('id_postulante');
        });
        Schema::table('solicitud_postulacions', function($table) {
            $table->foreign('id_usuario')->references('id_usuario')->on('users');
            $table->foreign('id_evaluacion')->references('id_evaluacion')->on('evaluacion_postulacions');
            $table->foreign('id_postulante')->references('id_postulante')->on('postulantes');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('solicitud_postulacions');
    }
}
