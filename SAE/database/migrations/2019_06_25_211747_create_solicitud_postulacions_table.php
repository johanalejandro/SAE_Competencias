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
            $table->string('nombres',100);
            $table->string('apellidos',100);
            $table->string('ciudad',50);
            $table->enum('genero',array('masculino', 'femenimo'));
            $table->string('email');
            $table->bigInteger('cedula');
            $table->date('fechaNacimiento');
            $table->bigInteger('telefono');
            $table->string('provincia');
            $table->enum('estado',array('Por Habilitar', 'Habilitado','Deshabilitado','Por Asignar','Por Evaluar'));
            $table->date('fechaHabilitacion');
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
