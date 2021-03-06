<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEvaluacionPostulacionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('evaluacion_postulacions', function (Blueprint $table) {
            $table->bigIncrements('id_evaluacion');
            $table->timestamps();
            $table->text('detalleEvaluacion')->nullable();
            $table->set('tipoEvaluacion',['Entrevista', 'Prueba'])->nullable();
            $table->set('resultadoEvaluacion',['Aprueba', 'No Aprueba','Pendiente'])->default('Pendiente');
            $table->string('archivoAnexoEvaluacion')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('evaluacion_postulacions');
    }
}
