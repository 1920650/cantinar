<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Producto;
use App\Models\Reserva;
use App\Models\Reserva_producto;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(10)->create();
        Producto::factory(10)->create();
        Reserva::factory(10)->create();
        Reserva_producto::factory(10)->create();

        

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'telefono' => '1234567890',
            'role' => 'admin',
        ]);
    }
}
