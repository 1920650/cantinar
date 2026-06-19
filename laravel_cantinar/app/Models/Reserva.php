<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reserva extends Model
{
    /** @use HasFactory<\Database\Factories\ReservaFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'fecha_hora',
        'estado',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function productos()
{
    return $this->belongsToMany(Producto::class, 'reserva_producto', 'reserva_id', 'producto_id')
                ->using(ReservaProducto::class)
                ->withPivot('cantidad')
                ->withTimestamps();
}
}
