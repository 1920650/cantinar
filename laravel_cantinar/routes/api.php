<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/reservas', [App\Http\Controllers\ReservaController::class, 'index']);
    Route::post('/reservas', [App\Http\Controllers\ReservaController::class, 'store']);
    Route::get('/reservas/{reserva}', [App\Http\Controllers\ReservaController::class, 'show']);
    Route::put('/reservas/{reserva}', [App\Http\Controllers\ReservaController::class, 'update']);
    Route::delete('/reservas/{reserva}', [App\Http\Controllers\ReservaController::class, 'destroy']);
});
