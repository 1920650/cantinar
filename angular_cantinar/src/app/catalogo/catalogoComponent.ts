import { Component, inject, OnInit, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductosService } from '../services/productos-service';
import { IProducto } from '../models/producto';
import { CarritoService } from '../services/carrito-service';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './catalogoComponent.html',
  styleUrl: './catalogoComponent.css'
})
export class CatalogoComponent implements OnInit {
  private productosService = inject(ProductosService);
  private carritoService = inject(CarritoService);
  private platformId = inject(PLATFORM_ID);
  private cdr = inject(ChangeDetectorRef);

  productos: IProducto[] = [];
  cargando: boolean = true;
  error: string = '';

  cantidades: { [key: number]: number } = {};

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.cargarProductos();
    } else {
      // En el servidor no cargamos, marcamos como no-cargando para que no se quede el "Cargando..."
      this.cargando = false;
    }
  }

  cargarProductos() {
    this.productosService.getProductos().subscribe({
      next: (data: any) => {
        this.productos = data;
        this.productos.forEach(p => this.cantidades[p.id] = 1);
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar productos:', err);
        this.error = 'No se pudieron cargar los productos.';
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }

  aumentar(id: number) {
    this.cantidades[id]++;
  }

  disminuir(id: number) {
    if (this.cantidades[id] > 1) {
      this.cantidades[id]--;
    }
  }

  anadirAlCarrito(producto: IProducto) {
    const cantidad = this.cantidades[producto.id];
    this.carritoService.anadir(producto, cantidad);
    alert(`✅ Añadido: ${producto.nombre} x ${cantidad}`);
    this.cantidades[producto.id] = 1;
  }
}