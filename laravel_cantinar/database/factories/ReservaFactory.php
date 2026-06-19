<?php

namespace Database\Factories;

use App\Models\Reserva;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Reserva>
 */
class ReservaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'fecha_hora' => $this->faker->dateTime(),
            'estado' => $this->faker->randomElement(['pendiente', 'confirmada', 'cancelada']),
        ];
    }
}
