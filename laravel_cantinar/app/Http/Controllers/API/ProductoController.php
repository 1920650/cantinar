<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Producto;
use Illuminate\Http\Request;

class ProductoController extends Controller
{
    /**
     * GET /api/productos
     * Listar todos los productos disponibles
     */
    public function index()
    {
        return response()->json(Producto::all());
    }

    /**
     * POST /api/productos
     * Crear un producto nuevo (solo admin)
     */
    public function store(Request $request)
    {
        $datos = $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'required|string',
            'precio' => 'required|numeric|min:0',
            'disponible' => 'boolean',
        ]);

        $producto = Producto::create($datos);

        return response()->json($producto, 201);
    }

    /**
     * GET /api/productos/{id}
     * Ver un producto concreto
     */
    public function show(Producto $producto)
    {
        return response()->json($producto);
    }

    /**
     * PUT/PATCH /api/productos/{id}
     * Actualizar un producto (solo admin)
     */
    public function update(Request $request, Producto $producto)
    {
        $datos = $request->validate([
            'nombre' => 'sometimes|string|max:255',
            'descripcion' => 'sometimes|string',
            'precio' => 'sometimes|numeric|min:0',
            'disponible' => 'sometimes|boolean',
        ]);

        //no importa el warning, es el intelephense
        $producto->update($datos);

        return response()->json($producto);
    }

    /**
     * DELETE /api/productos/{id}
     * Borrar un producto (solo admin)
     */
    public function destroy(Producto $producto)
    {
        //no importa el error, es el intelephense
        $producto->delete();

        return response()->json(['mensaje' => 'Producto eliminado']);
    }
}