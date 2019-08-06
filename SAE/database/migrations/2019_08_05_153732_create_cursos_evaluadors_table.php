<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCursosEvaluadorsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cursos__
        evaluadors', function (Blueprint $table) {
            $table->bigIncrements('id_curso_evaluador');
            $table->unsignedBigInteger('id_postulante');
            $table->unsignedBigInteger('id_sector_requerimiento');
            $table->text('nombreInstitucion');
            $table->integer('numeroHoras');
            $table->string('archivoAnexo');
            $table->timestamps();
        });

         Schema::table('cursos__
        evaluadors', function($table) {
            $table->foreign('id_postulante')->references('id_postulante')->on('postulantes');
        });

          Schema::table('cursos__
        evaluadors', function($table) {
            $table->foreign('id_sector_requerimiento')->references('id_sector_requerimiento')->on('sector_requerimientos');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cursos__evaluadors');
    }
}
