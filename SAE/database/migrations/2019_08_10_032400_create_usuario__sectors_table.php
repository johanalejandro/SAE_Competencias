<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsuarioSectorsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('usuario__sectors', function (Blueprint $table) {
            $table->bigIncrements('id_usuario_sector');
             $table->unsignedBigInteger('id_usuario');
            $table->unsignedBigInteger('id_sector_requerimiento');
            $table->timestamps();
        });

        Schema::table('usuario__sectors', function($table) {
            $table->foreign('id_usuario')->references('id_usuario')->on('users');
        });

         Schema::table('usuario__sectors', function($table) {
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
        Schema::dropIfExists('usuario__sectors');
    }
}
