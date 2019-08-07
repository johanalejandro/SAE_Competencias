<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class PostulantesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
         
    	 $current_date_time = Carbon::now()->toDateTimeString();
         DB::table('postulantes')->insert(
            [
                'nombres' => 'Michelle',
                'apellidos' => 'Mena',
                'ciudad' => "Guayaquil",
                "email" => "correo@coreo.com",
                'cedula' => "091123939",
                'fechaNacimiento' => $current_date_time,
                "telefono" => 2184203,
                "provincia" =>"Guayas",
                "estado" =>"Por Habilitar",
                "disponibilidadViajar" =>0,
                "tipoPostulacion" =>"Evaluador",


            ]
        );

         DB::table('postulantes')->insert(
            [
                'nombres' => 'Carlos',
                'apellidos' => 'Mena',
                'ciudad' => "Guayaquil",
                "email" => "correo@coreo.com",
                'cedula' => "091123939",
                'fechaNacimiento' => $current_date_time,
                "telefono" => 2184203,
                "provincia" =>"Guayas",
                "estado" =>"Por Habilitar",
                "disponibilidadViajar" =>0,
                "tipoPostulacion" =>"Evaluador",


            ]
        );
         DB::table('postulantes')->insert(
            [
                'nombres' => 'Gustavo',
                'apellidos' => 'Loor',
                'ciudad' => "Guayaquil",
                "email" => "correo@coreo.com",
                'cedula' => "091123939",
                'fechaNacimiento' => $current_date_time,
                "telefono" => 2184203,
                "provincia" =>"Guayas",
                "estado" =>"Por Habilitar",
                "disponibilidadViajar" =>0,
                "tipoPostulacion" =>"Evaluador",


            ]
        );
         DB::table('postulantes')->insert(
            [
                'nombres' => 'Andrea',
                'apellidos' => 'Lopez',
                'ciudad' => "Guayaquil",
                "email" => "correo@coreo.com",
                'cedula' => "091123939",
                'fechaNacimiento' => $current_date_time,
                "telefono" => 2184203,
                "provincia" =>"Guayas",
                "estado" =>"Por Habilitar",
                "disponibilidadViajar" =>1,
                "tipoPostulacion" =>"Experto",


            ]
        );
          DB::table('postulantes')->insert(
            [
                'nombres' => 'Michelle',
                'apellidos' => 'Mena',
                'ciudad' => "Guayaquil",
                "email" => "correo@coreo.com",
                'cedula' => "091123939",
                'fechaNacimiento' => $current_date_time,
                "telefono" => 2184203,
                "provincia" =>"Guayas",
                "estado" =>"Por Habilitar",
                "disponibilidadViajar" =>1,
                "tipoPostulacion" =>"Experto",


            ]
        );

         DB::table('postulantes')->insert(
            [
                'nombres' => 'Carlos',
                'apellidos' => 'Mena',
                'ciudad' => "Guayaquil",
                "email" => "correo@coreo.com",
                'cedula' => "091123939",
                'fechaNacimiento' => $current_date_time,
                "telefono" => 2184203,
                "provincia" =>"Guayas",
                "estado" =>"Por Habilitar",
                "disponibilidadViajar" =>1,
                "tipoPostulacion" =>"Experto",


            ]
        );
         DB::table('postulantes')->insert(
            [
                'nombres' => 'Andres',
                'apellidos' => 'Jo',
                'ciudad' => "Guayaquil",
                "email" => "correo@coreo.com",
                'cedula' => "091123939",
                'fechaNacimiento' => $current_date_time,
                "telefono" => 2184203,
                "provincia" =>"Guayas",
                "estado" =>"Habilitado",
                "disponibilidadViajar" =>1,
                "tipoPostulacion" =>"Experto",


            ]
        );
          DB::table('postulantes')->insert(
            [
                'nombres' => 'Maria',
                'apellidos' => 'Caceres',
                'ciudad' => "Guayaquil",
                "email" => "correo@coreo.com",
                'cedula' => "091123939",
                'fechaNacimiento' => $current_date_time,
                "telefono" => 2184203,
                "provincia" =>"Guayas",
                "estado" =>"Habilitado",
                "disponibilidadViajar" =>1,
                "tipoPostulacion" =>"Experto",


            ]
        );
           DB::table('postulantes')->insert(
            [
                'nombres' => 'Karen',
                'apellidos' => 'Ante',
                'ciudad' => "Guayaquil",
                "email" => "correo@coreo.com",
                'cedula' => "091123939",
                'fechaNacimiento' => $current_date_time,
                "telefono" => 2184203,
                "provincia" =>"Guayas",
                "estado" =>"Habilitado",
                "disponibilidadViajar" =>1,
                "tipoPostulacion" =>"Experto",


            ]
        );
         DB::table('postulantes')->insert(
            [
                'nombres' => 'Andrea',
                'apellidos' => 'Portilla',
                'ciudad' => "Guayaquil",
                "email" => "correo@coreo.com",
                'cedula' => "091123939",
                'fechaNacimiento' => $current_date_time,
                "telefono" => 2184203,
                "provincia" =>"Guayas",
                "estado" =>"Habilitado",
                "disponibilidadViajar" =>1,
                "tipoPostulacion" =>"Experto",


            ]
        );
          DB::table('postulantes')->insert(
            [
                'nombres' => 'Juan',
                'apellidos' => 'Rodriguez',
                'ciudad' => "",
                "email" => "correo@coreo.com",
                'cedula' => "091123939",
                'fechaNacimiento' => $current_date_time,
                "telefono" => 2184203,
                "provincia" =>"Guayas",
                "estado" =>"Habilitado",
                "disponibilidadViajar" =>1,
                "tipoPostulacion" =>"Evaluador",


            ]
        );
          DB::table('postulantes')->insert(
            [
                'nombres' => 'Jose',
                'apellidos' => 'Chavez',
                'ciudad' => "",
                "email" => "correo@coreo.com",
                'cedula' => "091123939",
                'fechaNacimiento' => $current_date_time,
                "telefono" => 2184203,
                "provincia" =>"Guayas",
                "estado" =>"Por Asignar",
                "disponibilidadViajar" =>1,
                "tipoPostulacion" =>"Evaluador",


            ]
        );
         DB::table('postulantes')->insert(
            [
                'nombres' => 'Juan',
                'apellidos' => 'Venegas',
                'ciudad' => "Guayaquil",
                "email" => "correo@coreo.com",
                'cedula' => "091123939",
                'fechaNacimiento' => $current_date_time,
                "telefono" => 2184203,
                "provincia" =>"Guayas",
                "estado" =>"Por Asignar",
                "disponibilidadViajar" =>1,
                "tipoPostulacion" =>"Evaluador",


            ]
        );
          DB::table('postulantes')->insert(
            [
                'nombres' => 'Francisco',
                'apellidos' => 'Loza',
                'ciudad' => "Guayaquil",
                "email" => "correo@coreo.com",
                'cedula' => "091123939",
                'fechaNacimiento' => $current_date_time,
                "telefono" => 2184203,
                "provincia" =>"Guayas",
                "estado" =>"Por Asignar",
                "disponibilidadViajar" =>1,
                "tipoPostulacion" =>"Experto",


            ]
        );
           DB::table('postulantes')->insert(
            [
                'nombres' => 'Nicole',
                'apellidos' => 'Reyes',
                'ciudad' => "Quito",
                "email" => "correo@coreo.com",
                'cedula' => "091123939",
                'fechaNacimiento' => $current_date_time,
                "telefono" => 2184203,
                "provincia" =>"Guayas",
                "estado" =>"Habilitado",
                "disponibilidadViajar" =>1,
                "tipoPostulacion" =>"Experto",


            ]
        );
         DB::table('postulantes')->insert(
            [
                'nombres' => 'Andrea',
                'apellidos' => 'Cedeño',
                'ciudad' => "Quito",
                "email" => "correo@coreo.com",
                'cedula' => "091123939",
                'fechaNacimiento' => $current_date_time,
                "telefono" => 2184203,
                "provincia" =>"Guayas",
                "estado" =>"Por Asignar",
                "disponibilidadViajar" =>1,
                "tipoPostulacion" =>"Experto",


            ]
        );
          DB::table('postulantes')->insert(
    		[
                'nombres' => 'Juana',
                'apellidos' => 'Boada',
                'ciudad' => "Quito",
                "email" => "correo@coreo.com",
                'cedula' => "091123939",
                'fechaNacimiento' => $current_date_time,
                "telefono" => 2184203,
                "provincia" =>"Guayas",
                "estado" =>"Por Asignar",
                "disponibilidadViajar" =>1,
                "tipoPostulacion" =>"Experto",


            ]
        );
    }
}
