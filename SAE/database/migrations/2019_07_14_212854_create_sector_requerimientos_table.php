<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSectorRequerimientosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sector_requerimientos', function (Blueprint $table) {
            $table->bigIncrements('id_sector_requerimiento');
            $table->unsignedBigInteger('id_sector');
            $table->text('requerimiento');
            $table->string('anexoEvaluar');
            $table->timestamps();
        });
        Schema::table('sector_requerimientos', function($table) {
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
        Schema::dropIfExists('sector_requerimientos');
    }
}
