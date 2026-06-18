<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    /** @use HasFactory<\Database\Factories\ProductoFactory> */
    use HasFactory;

    protected $fillable = [
        'nombre',
        'descripcion',
        'precio',
        'stock',
    ];

    public function reservas()
    {
        return $this->belongsToMany(Reserva::class, 'reserva_producto', 'producto_id', 'reserva_id')
                    ->withPivot('cantidad')
                    ->withTimestamps();
    }



}
