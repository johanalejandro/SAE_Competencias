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
            $table->bigIncrements('id');
            $table->unsignedInteger('sector_id');
            $table->string('nombreAlcance');
            $table->timestamps();
            $table->string('detalleAlcance');
            $table->string('normaRequerida');
            
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
