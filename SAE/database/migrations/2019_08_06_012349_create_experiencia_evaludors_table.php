<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateExperienciaEvaludorsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('experiencia_evaludors', function (Blueprint $table) {
            $table->bigIncrements('id_experiencia');
            $table->timestamps();
            $table->unsignedBigInteger('id_postulante');
            $table->unsignedBigInteger('id_sector');
            $table->text('descripcion');
            $table->text('cargoEjercido');
            $table->text('nombreEmpresa');
            $table->date('fecha_inicio');
            $table->date('fecha_fin');
            $table->boolean('esTrabajoActual');
        });

        Schema::table('experiencia_evaludors', function($table) {
        $table->foreign('id_postulante')->references('id_postulante')->on('postulantes');
        });

        Schema::table('experiencia_evaludors', function($table) {
        $table->foreign('id_sector')->references('id_sector')->on('sectors');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('experiencia_evaludors');
    }
}
