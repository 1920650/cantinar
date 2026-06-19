<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\Pivot;

class ReservaProducto extends Pivot
{
    use HasFactory;

    protected $table = 'reserva_producto';

    protected $fillable = [
        'reserva_id',
        'producto_id',
        'cantidad',
    ];
}
