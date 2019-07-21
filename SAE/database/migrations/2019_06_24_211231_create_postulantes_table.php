<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePostulantesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        Schema::create('postulantes', function (Blueprint $table) {
            $table->bigIncrements('id_postulante')->autoIncrement();
            $table->timestamps();
            $table->string('nombres',100);
            $table->string('apellidos',100);
            $table->string('ciudad',50);
            $table->set('genero',['Masculino', 'Femenimo']);
            $table->string('email');
            $table->bigInteger('cedula');
            $table->date('fechaNacimiento');
            $table->bigInteger('telefono');
            $table->string('provincia');
            $table->set('estado',['Por Habilitar', 'Habilitado','Deshabilitado','Por Asignar','Por Evaluar'])->default('Por Asignar');
            $table->date('fechaHabilitacion')->nullable();
            $table->boolean('disponibilidadViajar');
            $table->set('tipoPostulacion',['Evaluador', 'Experto']);



            


        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('postulantes');
    }
}
