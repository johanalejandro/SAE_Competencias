<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEducacionFormalsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('educacion_formals', function (Blueprint $table) {
            $table->bigIncrements('id_educacion')->autoIncrement();
            $table->timestamps();
            $table->unsignedBigInteger('id_postulante');
            $table->string('archivoAnexo');
            $table->text('nombreInstitucion');
            $table->text('tituloObtenido');
            $table->set('tipoFormacion',['Tercer Nivel', 'Cuarto Nivel','Doctorado(PHD)']);
        });
        Schema::table('educacion_formals', function($table) {
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
        Schema::dropIfExists('educacion_formals');
    }
}
