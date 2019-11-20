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
        factory(\App\Role::class, 1)->create([
            'name' => 'Super-Administrador',
            'description' => 'Super Administrador'
        ]);
        factory(\App\Role::class, 1)->create([
            'name' => 'Administrador',
            'description' => 'Administrador de las unidades'
        ]);
        factory(\App\Role::class, 1)->create([
            'name' => 'Administrativo',
            'description' => 'Trabajador de la unidad'
        ]);
        factory(\App\Role::class, 1)->create([
            'name' => 'Copropietario',
            'description' => 'Coproietarios'
        ]);
        factory(\App\User::class, 1)->create([
            'name' => 'admin',
            'surname' => 'admin',
            'role_id' => 1,
            'email' => 'cristiancartesa@gmail.com',
            'password' => hash("sha256", 'secret'),
            'tax_id' => '1-9'
        ]);
    }
}
