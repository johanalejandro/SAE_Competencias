<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAlcancesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('alcances', function (Blueprint $table) {
            $table->bigIncrements('id_alcance')->autoIncrement();
            $table->unsignedBigInteger('id_sector');
            $table->string('nombreAlcance');
            $table->timestamps();
            $table->text('detalleAlcance');
            $table->text('normaRequerida');
            $table->string('anexoAlcance');
            
        });
        Schema::table('alcances', function($table) {
            $table->foreign('id_sector')->references('id_sector')->on('sectors');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('alcances');
    }
}
