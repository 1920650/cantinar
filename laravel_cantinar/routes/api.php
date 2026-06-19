<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\ProductoController;
use App\Http\Controllers\API\ReservaController;
use App\Http\Controllers\API\AuthController;

// Rutas públicas de autenticación
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Productos públicos (cualquiera puede ver el catálogo)
Route::apiResource('productos', ProductoController::class)->only(['index', 'show']);

// Rutas protegidas (necesitan token Sanctum)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    // Productos: solo logueados pueden crear/editar/borrar
    Route::apiResource('productos', ProductoController::class)->except(['index', 'show']);

    // Reservas: todas necesitan estar logueado
    Route::apiResource('reservas', ReservaController::class);

    // Datos del usuario actual
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});