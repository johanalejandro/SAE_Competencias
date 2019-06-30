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
            $table->bigIncrements('id_alcance');
            $table->unsignedInteger('id_sector');
            $table->string('nombreAlcance');
            $table->timestamps();
            $table->text('detalleAlcance');
            $table->text('normaRequerida');
            
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
