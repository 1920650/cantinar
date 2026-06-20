import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { IProducto } from '../models/producto';

export interface ItemCarrito {
  producto: IProducto;
  cantidad: number;
}

@Injectable({ providedIn: 'root' })
export class CarritoService {

  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  // Estado del carrito (observable, los componentes se suscriben)
  items = new BehaviorSubject<ItemCarrito[]>(this.cargarDeStorage());

  /**
   * Añadir producto al carrito (si ya está, suma cantidad)
   */
  anadir(producto: IProducto, cantidad: number = 1) {
    const actuales = this.items.value;
    const existente = actuales.find(i => i.producto.id === producto.id);

    if (existente) {
      existente.cantidad += cantidad;
    } else {
      actuales.push({ producto, cantidad });
    }

    this.items.next([...actuales]);
    this.guardarEnStorage();
  }

  /**
   * Cambiar cantidad de un producto del carrito
   */
  cambiarCantidad(productoId: number, cantidad: number) {
    if (cantidad < 1) {
      this.eliminar(productoId);
      return;
    }

    const actuales = this.items.value;
    const item = actuales.find(i => i.producto.id === productoId);
    if (item) {
      item.cantidad = cantidad;
      this.items.next([...actuales]);
      this.guardarEnStorage();
    }
  }

  /**
   * Eliminar un producto del carrito
   */
  eliminar(productoId: number) {
    const actuales = this.items.value.filter(i => i.producto.id !== productoId);
    this.items.next(actuales);
    this.guardarEnStorage();
  }

  /**
   * Vaciar el carrito (tras confirmar reserva)
   */
  vaciar() {
    this.items.next([]);
    this.guardarEnStorage();
  }

  /**
   * Total del carrito en €
   */
  total(): number {
    return this.items.value.reduce(
      (acc, item) => acc + item.producto.precio * item.cantidad,
      0
    );
  }

  /**
   * Cantidad total de items (para el badge en el header)
   */
  contarItems(): number {
    return this.items.value.reduce((acc, item) => acc + item.cantidad, 0);
  }

  // ============== Persistencia en localStorage ==============

  private guardarEnStorage() {
    if (this.isBrowser) {
      localStorage.setItem('carrito', JSON.stringify(this.items.value));
    }
  }

  private cargarDeStorage(): ItemCarrito[] {
    if (!this.isBrowser) return [];
    const data = localStorage.getItem('carrito');
    return data ? JSON.parse(data) : [];
  }
}