<?php

namespace App\Policies;

use App\Models\Producto;
use App\Models\User;

class ProductoPolicy
{
    /**
     * Ver el listado de productos: cualquiera puede (incluso sin login).
     * Por eso devolvemos true siempre.
     */
    public function viewAny(?User $user): bool
    {
        return true;
    }

    /**
     * Ver un producto concreto: cualquiera puede.
     */
    public function view(?User $user, Producto $producto): bool
    {
        return true;
    }

    /**
     * Crear un producto: solo admin.
     */
    public function create(User $user): bool
    {
        return $user->role === 'admin';
    }

    /**
     * Actualizar un producto: solo admin.
     */
    public function update(User $user, Producto $producto): bool
    {
        return $user->role === 'admin';
    }

    /**
     * Borrar un producto: solo admin.
     */
    public function delete(User $user, Producto $producto): bool
    {
        return $user->role === 'admin';
    }
}