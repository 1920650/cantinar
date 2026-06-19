<?php

namespace Database\Factories;


use App\Models\ReservaProducto;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ReservaProducto>
 */
class ReservaProductoFactory extends Factory
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
