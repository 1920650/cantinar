import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CarritoService, ItemCarrito } from '../services/carrito-service';
import { ReservasService } from '../services/reservas-service';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './carritoComponent.html',
  styleUrl: './carritoComponent.css'
})
export class CarritoComponent implements OnInit {
  private carritoService = inject(CarritoService);
  private reservasService = inject(ReservasService);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private platformId = inject(PLATFORM_ID);

  items: ItemCarrito[] = [];
  total: number = 0;

  reservaForm: FormGroup;
  enviando: boolean = false;
  errorMessage: string = '';

  // Para el min del input datetime
  minFechaHora: string = '';

  constructor() {
    this.reservaForm = this.fb.group({
      fecha_hora: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    // Suscribirse al carrito
    this.carritoService.items.subscribe(items => {
      this.items = items;
      this.total = this.carritoService.total();
    });

    // Calcular el mínimo permitido (ahora + 5 minutos)
    if (isPlatformBrowser(this.platformId)) {
      const ahora = new Date();
      ahora.setMinutes(ahora.getMinutes() + 5);
      this.minFechaHora = this.aFormatoInput(ahora);
    }
  }

  aumentar(item: ItemCarrito) {
    this.carritoService.cambiarCantidad(item.producto.id, item.cantidad + 1);
  }

  disminuir(item: ItemCarrito) {
    this.carritoService.cambiarCantidad(item.producto.id, item.cantidad - 1);
  }

  eliminar(item: ItemCarrito) {
    this.carritoService.eliminar(item.producto.id);
  }

  vaciar() {
    if (confirm('¿Seguro que quieres vaciar el carrito?')) {
      this.carritoService.vaciar();
    }
  }

  confirmarReserva() {
    if (this.items.length === 0) {
      this.errorMessage = 'El carrito está vacío.';
      return;
    }

    if (this.reservaForm.invalid) {
      this.reservaForm.markAllAsTouched();
      return;
    }

    this.enviando = true;
    this.errorMessage = '';

    // Convertir fecha del input (YYYY-MM-DDTHH:mm) al formato que espera Laravel
    const fechaHora = this.reservaForm.value.fecha_hora.replace('T', ' ') + ':00';

    const datos = {
      fecha_hora: fechaHora,
      productos: this.items.map(i => ({
        id: i.producto.id,
        cantidad: i.cantidad
      }))
    };

    this.reservasService.addreserva(datos as any).subscribe({
      next: () => {
        this.enviando = false;
        this.carritoService.vaciar();
        alert('✅ Reserva creada correctamente');
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.enviando = false;
        console.error('Error al crear reserva:', err);
        if (err.status === 422) {
          this.errorMessage = 'Revisa los datos. La fecha debe ser futura.';
        } else if (err.status === 401) {
          this.errorMessage = 'Debes iniciar sesión para reservar.';
        } else {
          this.errorMessage = 'No se pudo crear la reserva. Inténtalo de nuevo.';
        }
      }
    });
  }

  // Helper: pasar Date a formato del input datetime-local (YYYY-MM-DDTHH:mm)
  private aFormatoInput(fecha: Date): string {
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${fecha.getFullYear()}-${pad(fecha.getMonth() + 1)}-${pad(fecha.getDate())}T${pad(fecha.getHours())}:${pad(fecha.getMinutes())}`;
  }
}