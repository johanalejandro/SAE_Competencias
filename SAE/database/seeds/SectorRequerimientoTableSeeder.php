<?php

use Illuminate\Database\Seeder;

class SectorRequerimientoTableSeeder extends Seeder
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

        

        DB::table('sector_requerimientos')->insert(
            [
                'requerimiento' => 'CURSO DE LA NORMA ISO/IEC 15189:  24 HORAS',
                'id_sector' => '1',
                'anexoEvaluar' => '',
            ]
        );
        DB::table('sector_requerimientos')->insert(
            [
                'requerimiento' => 'CURSO DE LA VALIDACIÓN DE MÉTODOS 24 H',
                'id_sector' => '1',
                'anexoEvaluar' => '',
            ]
        );
        DB::table('sector_requerimientos')->insert(
            [
                'requerimiento' => 'CURSO DE ESTIMACIÓN DE LA INCERTIDUMBRE 24 HORAS',
                'id_sector' => '1',
                'anexoEvaluar' => '',
            ]
        );
        DB::table('sector_requerimientos')->insert(
            [
                'requerimiento' => 'CURSO DE LA NORMA ISO/IEC 17025:  24 HORAS',
                'id_sector' => '2',
                'anexoEvaluar' => '',
            ]
        );
        DB::table('sector_requerimientos')->insert(
            [
                'requerimiento' => 'CURSO DE LA VALIDACIÓN DE MÉTODOS 24 H',
                'id_sector' => '2',
                'anexoEvaluar' => '',
            ]
        );
        DB::table('sector_requerimientos')->insert(
            [
                'requerimiento' => 'Curso de Auditoria de Sistemas de Gestión de Calidad u otro curso que evidencie la cobertura de la Norma ISO 19011  o  Auditores Líderes.  ',
                'id_sector' => '2',
                'anexoEvaluar' => '',
            ]
        );
        DB::table('sector_requerimientos')->insert(
            [
                'requerimiento' => 'CURSO DE LA NORMA ISO/IEC 17025:  24 HORAS',
                'id_sector' => '3',
                'anexoEvaluar' => '',
            ]
        );
        DB::table('sector_requerimientos')->insert(
            [
                'requerimiento' => 'CURSO DE LA VALIDACIÓN DE MÉTODOS 24 H',
                'id_sector' => '3',
                'anexoEvaluar' => '',
            ]
        );
        DB::table('sector_requerimientos')->insert(
            [
                'requerimiento' => 'Curso de Auditoria de Sistemas de Gestión de Calidad u otro curso que evidencie la cobertura de la Norma ISO 19011  o  Auditores Líderes.  ',
                'id_sector' => '3',
                'anexoEvaluar' => '',
            ]
        );
        DB::table('sector_requerimientos')->insert(
            [
                'requerimiento' => 'CURSO DE LA NORMA ISO/IEC 17020:  24 HORAS',
                'id_sector' => '5',
                'anexoEvaluar' => '',
            ]
        );
        DB::table('sector_requerimientos')->insert(
            [
                'requerimiento' => 'Curso de Auditoria de Sistemas de Gestión de Calidad u otro curso que evidencie la cobertura de la Norma ISO 19011  o  Auditores Líderes. ',
                'id_sector' => '5',
                'anexoEvaluar' => '',
            ]
        );
        DB::table('sector_requerimientos')->insert(
            [
                'requerimiento' => 'CURSO DE LA NORMA ISO/IEC 17020:  24 HORAS',
                'id_sector' => '6',
                'anexoEvaluar' => '',
            ]
        );
        DB::table('sector_requerimientos')->insert(
            [
                'requerimiento' => 'Curso de Auditoria de Sistemas de Gestión de Calidad u otro curso que evidencie la cobertura de la Norma ISO 19011  o  Auditores Líderes. ',
                'id_sector' => '6',
                'anexoEvaluar' => '',
            ]
        );
        DB::table('sector_requerimientos')->insert(
            [
                'requerimiento' => 'CURSO DE LA NORMA ISO/IEC 17065:  24 HORAS',
                'id_sector' => '7',
                'anexoEvaluar' => '',
            ]
        );
        DB::table('sector_requerimientos')->insert(
            [
                'requerimiento' => 'Curso de Auditoria de Sistemas de Gestión de Calidad u otro curso que evidencie la cobertura de la Norma ISO 19011  o  Auditores Líderes. ',
                'id_sector' => '7',
                'anexoEvaluar' => '',
            ]
        );
        DB::table('sector_requerimientos')->insert(
            [
                'requerimiento' => 'TIENE 2 AÑOS DE EXPERIENCIA EN AUDITORIAS DE SISTEMAS DE GESTION, O AUDITORIAS DE SG O EVALUACIÓN DE LA CONFORMIDAD',
                'id_sector' => '7',
                'anexoEvaluar' => '',
            ]
        );
    }
}