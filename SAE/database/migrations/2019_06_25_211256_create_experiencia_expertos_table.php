<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateExperienciaExpertosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('experiencia_expertos', function (Blueprint $table) {
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
            $table->set('estado',['Aprobado', 'Pendiente','No aprobado'])->default('Pendiente');
        });

        Schema::table('experiencia_expertos', function($table) {
        $table->foreign('id_postulante')->references('id_postulante')->on('postulantes');
        });

        Schema::table('experiencia_expertos', function($table) {
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
