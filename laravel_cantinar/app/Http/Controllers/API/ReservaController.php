<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Reserva;
use Illuminate\Http\Request;

class ReservaController extends Controller
{
    /**
     * GET /api/reservas
     * Lista las reservas:
     * - Admin: ve todas
     * - Cliente: solo las suyas
     */
    public function index(Request $request)
    {
        $user = $request->user();

        if ($user->role === 'admin') {
            $reservas = Reserva::with('productos', 'user')->get();
        } else {
            $reservas = Reserva::with('productos')
                ->where('user_id', $user->id)
                ->get();
        }

        return response()->json($reservas);
    }

    /**
     * POST /api/reservas
     * Crear una reserva con sus productos
     */
    public function store(Request $request)
    {
        $datos = $request->validate([
            'fecha_hora' => 'required|date|after:now',
            'productos' => 'required|array|min:1',
            'productos.*.id' => 'required|exists:productos,id',
            'productos.*.cantidad' => 'required|integer|min:1',
        ]);

        // Crear la reserva
        $reserva = Reserva::create([
            'user_id' => $request->user()->id,
            'fecha_hora' => $datos['fecha_hora'],
            'estado' => 'pendiente',
        ]);

        // Asociar los productos con sus cantidades en la pivote
        foreach ($datos['productos'] as $producto) {
            $reserva->productos()->attach($producto['id'], [
                'cantidad' => $producto['cantidad'],
            ]);
        }

        return response()->json($reserva->load('productos'), 201);
    }

    /**
     * GET /api/reservas/{id}
     * Ver una reserva concreta
     */
    public function show(Request $request, Reserva $reserva)
    {
        $user = $request->user();

        // Solo el dueño o admin pueden verla
        if ($user->role !== 'admin' && $reserva->user_id !== $user->id) {
            return response()->json(['mensaje' => 'No autorizado'], 403);
        }

        return response()->json($reserva->load('productos', 'user'));
    }

    /**
     * PUT/PATCH /api/reservas/{id}
     * Actualizar estado o fecha de una reserva
     */
    public function update(Request $request, Reserva $reserva)
    {
        $user = $request->user();

        if ($user->role !== 'admin' && $reserva->user_id !== $user->id) {
            return response()->json(['mensaje' => 'No autorizado'], 403);
        }

        $datos = $request->validate([
            'estado' => 'sometimes|in:pendiente,confirmada,cancelada',
            'fecha_hora' => 'sometimes|date|after:now',
        ]);

        //no importa el warning, es el intelephense
        $reserva->update($datos);

        return response()->json($reserva->load('productos'));
    }

    /**
     * DELETE /api/reservas/{id}
     * Borrar una reserva
     */
    public function destroy(Request $request, Reserva $reserva)
    {
        $user = $request->user();

        if ($user->role !== 'admin' && $reserva->user_id !== $user->id) {
            return response()->json(['mensaje' => 'No autorizado'], 403);
        }

        //no importa el error, es el intelephense
        $reserva->delete();

        return response()->json(['mensaje' => 'Reserva eliminada']);
    }
}