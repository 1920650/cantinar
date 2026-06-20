<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Producto;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class ProductoController extends Controller
{
    use AuthorizesRequests;

    /**
     * GET /api/productos
     * Cualquiera puede listar
     */
    public function index()
    {
        return response()->json(Producto::all());
    }

    /**
     * POST /api/productos
     * Solo admin
     */
    public function store(Request $request)
    {
        $this->authorize('create', Producto::class);

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
     * Cualquiera puede ver
     */
    public function show(Producto $producto)
    {
        return response()->json($producto);
    }

    /**
     * PUT/PATCH /api/productos/{id}
     * Solo admin
     */
    public function update(Request $request, Producto $producto)
    {
        $this->authorize('update', $producto);

        $datos = $request->validate([
            'nombre' => 'sometimes|string|max:255',
            'descripcion' => 'sometimes|string',
            'precio' => 'sometimes|numeric|min:0',
            'disponible' => 'sometimes|boolean',
        ]);

        $producto->update($datos);

        return response()->json($producto);
    }

    /**
     * DELETE /api/productos/{id}
     * Solo admin
     */
    public function destroy(Producto $producto)
    {
        $this->authorize('delete', $producto);

        $producto->delete();

        return response()->json(['mensaje' => 'Producto eliminado']);
    }
}