<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsuarioRolsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('usuario_rols', function (Blueprint $table) {
            $table->bigIncrements('id_usuario_rol');
            $table->unsignedBigInteger('id_usuario');
            $table->set('tipoUsuario',['Visualizador', 'Evaluador','Calidad','Experto']);
            $table->timestamps();
            
        });
        Schema::table('usuario_rols', function($table) {
            $table->foreign('id_usuario')->references('id_usuario')->on('users');
            

        });
    }

    
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('usuario_rols');
    }
}
