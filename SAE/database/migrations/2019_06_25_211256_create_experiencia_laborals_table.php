<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateExperienciaLaboralsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('experiencia_laborals', function (Blueprint $table) {
            $table->bigIncrements('id_experiencia');
            $table->timestamps();
            $table->unsignedBigInteger('id_postulante');
            $table->unsignedBigInteger('id_alcance');
            $table->text('descripcion');
            $table->text('cargoEjercido');
            $table->text('nombreEmpresa');
            $table->date('fecha_inicio');
            $table->date('fecha_fin');
            $table->boolean('esTrabajoActual');
        });

        Schema::table('experiencia_laborals', function($table) {
        $table->foreign('id_postulante')->references('id_postulante')->on('postulantes');
        });

        Schema::table('experiencia_laborals', function($table) {
        $table->foreign('id_alcance')->references('id_alcance')->on('alcances');
        });
    }


    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('experiencia_laborals');
    }
}
