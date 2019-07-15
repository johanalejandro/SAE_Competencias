<?php

use Illuminate\Database\Seeder;

class AmbitoTableSeeder extends Seeder
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

        DB::table('ambitos')->insert(
            [
                'nombreAmbito' => 'Laboratorios',
            ]
        );
        DB::table('ambitos')->insert(
            [
                'nombreAmbito' => 'Inspección',
            ]
        );
        DB::table('ambitos')->insert(
            [
                'nombreAmbito' => 'Certificación',
            ]
        );
    }
}