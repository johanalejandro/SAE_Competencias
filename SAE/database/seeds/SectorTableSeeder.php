<?php

use Illuminate\Database\Seeder;

class SectorTableSeeder extends Seeder
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

        DB::table('sectors')->insert(
            [
                'tipoSector' => 'Clínicos',
                'id_ambito' => '1',
            ]
        );
        DB::table('sectors')->insert(
            [
                'tipoSector' => 'Ensayos',
                'id_ambito' => '1',
            ]
        );
        DB::table('sectors')->insert(
            [
                'tipoSector' => 'Calibración',
                'id_ambito' => '1',
            ]
        );
        DB::table('sectors')->insert(
            [
                'tipoSector' => 'Servicios',
                'id_ambito' => '2',
            ]
        );
        DB::table('sectors')->insert(
            [
                'tipoSector' => 'Industrial',
                'id_ambito' => '2',
            ]
        );
        DB::table('sectors')->insert(
            [
                'tipoSector' => 'Personas',
                'id_ambito' => '3',
            ]
        );
        DB::table('sectors')->insert(
            [
                'tipoSector' => 'Productos',
                'id_ambito' => '3',
            ]
        );
        DB::table('sectors')->insert(
            [
                'tipoSector' => 'Servicios',
                'id_ambito' => '3',
            ]
        );
        DB::table('sectors')->insert(
            [
                'tipoSector' => 'Procesos',
                'id_ambito' => '3',
            ]
        );
    }
}