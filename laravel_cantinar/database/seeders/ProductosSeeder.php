<?php

namespace Database\Seeders;

use App\Models\Producto;
use Illuminate\Database\Seeder;

class ProductosSeeder extends Seeder
{
    public function run(): void
    {
        $productos = [
            // Bocadillos
            ['nombre' => 'Bocadillo de jamón', 'descripcion' => 'Pan crujiente con jamón serrano y un toque de aceite de oliva.', 'precio' => 3.50, 'disponible' => true],
            ['nombre' => 'Bocadillo de chorizo', 'descripcion' => 'Chorizo a la plancha en pan recién hecho.', 'precio' => 3.20, 'disponible' => true],
            ['nombre' => 'Bocadillo de tortilla', 'descripcion' => 'Tortilla de patata casera en pan tierno.', 'precio' => 3.00, 'disponible' => true],
            ['nombre' => 'Bocadillo de calamares', 'descripcion' => 'Calamares rebozados estilo madrileño.', 'precio' => 3.80, 'disponible' => true],
            ['nombre' => 'Bocadillo de pollo', 'descripcion' => 'Pechuga de pollo a la plancha con lechuga y mayonesa.', 'precio' => 3.50, 'disponible' => true],
            ['nombre' => 'Bocadillo vegetal', 'descripcion' => 'Lechuga, tomate, atún, huevo, espárragos y mayonesa.', 'precio' => 3.60, 'disponible' => true],

            // Otros salados
            ['nombre' => 'Patatas fritas', 'descripcion' => 'Bolsa de patatas fritas onduladas con sal.', 'precio' => 1.50, 'disponible' => true],
            ['nombre' => 'Empanadilla de atún', 'descripcion' => 'Empanadilla casera rellena de atún y tomate.', 'precio' => 2.00, 'disponible' => true],
            ['nombre' => 'Croissant mixto', 'descripcion' => 'Croissant con jamón cocido y queso fundido.', 'precio' => 2.80, 'disponible' => true],
            ['nombre' => 'Pizza individual', 'descripcion' => 'Porción de pizza margarita recién horneada.', 'precio' => 2.50, 'disponible' => true],

            // Dulces
            ['nombre' => 'Croissant', 'descripcion' => 'Croissant de mantequilla recién horneado.', 'precio' => 1.80, 'disponible' => true],
            ['nombre' => 'Donut de chocolate', 'descripcion' => 'Donut clásico bañado en chocolate.', 'precio' => 1.50, 'disponible' => true],
            ['nombre' => 'Magdalena', 'descripcion' => 'Magdalena casera tradicional.', 'precio' => 1.00, 'disponible' => true],
            ['nombre' => 'Galletas de avena', 'descripcion' => 'Pack de 3 galletas caseras de avena y pasas.', 'precio' => 1.80, 'disponible' => true],

            // Bebidas frías
            ['nombre' => 'Agua mineral', 'descripcion' => 'Botella de agua mineral de 500 ml.', 'precio' => 1.00, 'disponible' => true],
            ['nombre' => 'Refresco de cola', 'descripcion' => 'Lata de refresco de cola de 330 ml.', 'precio' => 1.50, 'disponible' => true],
            ['nombre' => 'Refresco de naranja', 'descripcion' => 'Lata de refresco de naranja de 330 ml.', 'precio' => 1.50, 'disponible' => true],
            ['nombre' => 'Zumo de naranja', 'descripcion' => 'Zumo natural exprimido del día.', 'precio' => 2.20, 'disponible' => true],

            // Bebidas calientes
            ['nombre' => 'Café con leche', 'descripcion' => 'Café espresso con leche caliente.', 'precio' => 1.30, 'disponible' => true],
            ['nombre' => 'Té', 'descripcion' => 'Infusión de té (rojo, verde o manzanilla).', 'precio' => 1.20, 'disponible' => false],
        ];

        foreach ($productos as $producto) {
            Producto::create($producto);
        }
    }
}