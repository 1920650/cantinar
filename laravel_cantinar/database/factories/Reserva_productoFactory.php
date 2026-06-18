<?php

namespace Database\Factories;


use App\Models\Reserva_producto;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Reserva_producto>
 */
class Reserva_productoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'reserva_id' => $this->faker->numberBetween(1, 10),
            'producto_id' => $this->faker->numberBetween(1, 10),
            'cantidad' => $this->faker->numberBetween(1, 5),
        ];
    }
}
