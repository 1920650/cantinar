<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Producto;
use App\Models\Reserva;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        // Usuarios random
        User::factory(10)->create();

        // Productos reales (en vez de la factoría con palabras random)
        $this->call(ProductosSeeder::class);

        // Reservas con productos aleatorios del catálogo real
        Reserva::factory(10)->create()->each(function ($reserva) {
            $productos = Producto::inRandomOrder('')->take(rand(1, 4))->get();

            foreach ($productos as $producto) {
                $reserva->productos()->attach($producto->id, [
                    'cantidad' => rand(1, 3),
                ]);
            }
        });

        // Usuario admin de prueba
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'telefono' => '123456789',
            'role' => 'admin',
        ]);
    }
}