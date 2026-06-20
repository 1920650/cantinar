import { Component, inject, afterNextRender, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProductosService } from '../../services/productos-service';
import { IProducto } from '../../models/producto';

@Component({
  selector: 'app-admin-productos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './adminProductosComponent.html',
  styleUrl: './adminProductosComponent.css'
})
export class AdminProductosComponent {
  private productosService = inject(ProductosService);
  private fb = inject(FormBuilder);
  private cdr = inject(ChangeDetectorRef);

  productos: IProducto[] = [];
  cargando = true;
  error = '';

  // Formulario para crear/editar
  productoForm: FormGroup;
  modoEdicion = false;
  productoEditando: IProducto | null = null;
  mostrarFormulario = false;
  guardando = false;

  constructor() {
    this.productoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(255)]],
      descripcion: ['', [Validators.required]],
      precio: [0, [Validators.required, Validators.min(0)]],
      disponible: [true],
    });

    afterNextRender(() => this.cargarProductos());
  }

  cargarProductos() {
    this.cargando = true;
    this.productosService.getProductos().subscribe({
      next: (data) => {
        this.productos = data;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'No se pudieron cargar los productos.';
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }

  // ============ FORMULARIO ============

  abrirFormularioNuevo() {
    this.modoEdicion = false;
    this.productoEditando = null;
    this.productoForm.reset({ nombre: '', descripcion: '', precio: 0, disponible: true });
    this.mostrarFormulario = true;
  }

  abrirFormularioEditar(producto: IProducto) {
    this.modoEdicion = true;
    this.productoEditando = producto;
    this.productoForm.patchValue({
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      disponible: producto.disponible,
    });
    this.mostrarFormulario = true;
  }

  cancelarFormulario() {
    this.mostrarFormulario = false;
    this.productoEditando = null;
    this.productoForm.reset();
  }

  guardar() {
    if (this.productoForm.invalid) {
      this.productoForm.markAllAsTouched();
      return;
    }

    this.guardando = true;
    const datos = this.productoForm.value;

    if (this.modoEdicion && this.productoEditando) {
      // Update
      const actualizado: IProducto = { ...this.productoEditando, ...datos };
      this.productosService.updateProducto(actualizado).subscribe({
        next: (producto) => {
          const i = this.productos.findIndex(p => p.id === producto.id);
          if (i !== -1) this.productos[i] = producto;
          this.guardando = false;
          this.cancelarFormulario();
          this.cdr.detectChanges();
        },
        error: () => {
          alert('Error al actualizar el producto.');
          this.guardando = false;
        }
      });
    } else {
      // Create
      this.productosService.addProducto(datos).subscribe({
        next: (producto) => {
          this.productos.push(producto);
          this.guardando = false;
          this.cancelarFormulario();
          this.cdr.detectChanges();
        },
        error: () => {
          alert('Error al crear el producto.');
          this.guardando = false;
        }
      });
    }
  }

  // ============ ELIMINAR ============

  eliminar(producto: IProducto) {
    if (!confirm(`¿Borrar el producto "${producto.nombre}"?`)) return;

    this.productosService.deleteProducto(producto.id).subscribe({
      next: () => {
        this.productos = this.productos.filter(p => p.id !== producto.id);
        this.cdr.detectChanges();
      },
      error: () => alert('Error al borrar el producto.')
    });
  }

  // ============ GETTERS PARA EL TEMPLATE ============

  get nombre() { return this.productoForm.get('nombre'); }
  get descripcion() { return this.productoForm.get('descripcion'); }
  get precio() { return this.productoForm.get('precio'); }
}