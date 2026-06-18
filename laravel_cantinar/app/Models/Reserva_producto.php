<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Reserva_producto extends Model
{
    use HasFactory;

    protected $table = 'reserva_producto';

    protected $fillable = [
        'reserva_id',
        'producto_id',
        'cantidad',
    ];
}
