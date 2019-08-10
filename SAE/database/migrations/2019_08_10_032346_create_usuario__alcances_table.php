<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsuarioAlcancesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('usuario__alcances', function (Blueprint $table) {
            $table->bigIncrements('id_usuario_alcance');
            $table->unsignedBigInteger('id_usuario');
            $table->unsignedBigInteger('id_alcance');
            $table->timestamps();
        });

        Schema::table('usuario__alcances', function($table) {
            $table->foreign('id_usuario')->references('id_usuario')->on('users');
        });

         Schema::table('usuario__alcances', function($table) {
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
        Schema::dropIfExists('usuario__alcances');
    }
}
