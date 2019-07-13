<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSectorsTable extends Migration
{
    /**
     * Run the migrations.
     * Funcion up usada para añadir tablas
     * @return void
     */
    public function up()
    {
        Schema::create('sectors', function (Blueprint $table) {
            $table->bigIncrements('id_sector')->autoIncrement();
            $table->unsignedBigInteger('id_ambito');
            $table->timestamps();
            $table->string('tipoSector');

        });
        Schema::table('sectors', function($table) {
        $table->foreign('id_ambito')->references('id_ambito')->on('ambitos');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sectors');
    }
}
