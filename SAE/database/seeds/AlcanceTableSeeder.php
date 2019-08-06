<?php

use Illuminate\Database\Seeder;

class AlcanceTableSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UsersTableSeeder::class);

        /*DB::table('ambitos')->insert([
            'name' => Str::random(10),
            'email' => Str::random(10).'@gmail.com',
            'password' => bcrypt('secret'),
        ]);*/

        DB::table('alcances')->insert(
            [
                'nombreAlcance' => 'Sellos Hace bien y Hace Mejor',
                'id_sector' => '8',
                'detalleAlcance' => "",
                "normaRequerida" => "",
                "anexoAlcance" =>"",
            ]
        );
        DB::table('alcances')->insert(
            [
                'nombreAlcance' => 'Producción de flores',
                'id_sector' => '3',
                'detalleAlcance' => "",
                "normaRequerida" => "",
                "anexoAlcance" =>"",
            ]
        );
        DB::table('alcances')->insert(
            [
                'nombreAlcance' => 'Productos Orgánicos',
                'id_sector' => '3',
                'detalleAlcance' => "",
                "normaRequerida" => "",
                "anexoAlcance" =>"",
            ]
        );
        DB::table('alcances')->insert(
            [
                'nombreAlcance' => 'Inmunoquímica',
                'id_sector' => '1',
                'detalleAlcance' => "",
                "normaRequerida" => "",
                "anexoAlcance" =>"",
            ]
        );
        DB::table('alcances')->insert(
            [
                'nombreAlcance' => 'Química Clínica',
                'id_sector' => '1',
                'detalleAlcance' => "",
                "normaRequerida" => "",
                "anexoAlcance" =>"",
            ]
        );
        DB::table('alcances')->insert(
            [
                'nombreAlcance' => 'Hematología',
                'id_sector' => '1',
                'detalleAlcance' => "",
                "normaRequerida" => "",
                "anexoAlcance" =>"",
            ]
        );
        DB::table('alcances')->insert(
            [
                'nombreAlcance' => 'Primer Nivel de Atención',
                'id_sector' => '4',
                'detalleAlcance' => "Tipo A, Tipo B o Tipo C",
                "normaRequerida" => "",
                "anexoAlcance" =>"",
            ]
        );
        DB::table('alcances')->insert(
            [
                'nombreAlcance' => 'Etiquetado de calzados',
                'id_sector' => '5',
                'detalleAlcance' => "",
                "normaRequerida" => "",
                "anexoAlcance" =>"",
            ]
        );
        DB::table('alcances')->insert(
            [
                'nombreAlcance' => 'Joyas y bisutería',
                'id_sector' => '5',
                'detalleAlcance' => "",
                "normaRequerida" => "",
                "anexoAlcance" =>"",
            ]
        );
    }
}