<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
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

        $this->call([
            AmbitoTableSeeder::class,
            SectorTableSeeder::class,
            AlcanceTableSeeder::class,
            SectorRequerimientoTableSeeder::class,
            PostulantesTableSeeder::class,
        ]);
    }
}
