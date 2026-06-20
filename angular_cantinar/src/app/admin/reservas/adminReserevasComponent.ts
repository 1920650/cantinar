import { Component, inject, afterNextRender, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReservasService } from '../../services/reservas-service';
import { IReserva } from '../../models/reserva';

type FiltroEstado = 'todas' | 'pendiente' | 'confirmada' | 'cancelada';

@Component({
  selector: 'app-admin-reservas',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './adminReservasComponent.html',
  styleUrl: './adminReservasComponent.css'
})
export class AdminReservasComponent {
  private reservasService = inject(ReservasService);
  private cdr = inject(ChangeDetectorRef);
  Number = Number;

  reservas: IReserva[] = [];
  cargando = true;
  error = '';

  filtroActivo: FiltroEstado = 'todas';

  constructor() {
    afterNextRender(() => this.cargarReservas());
  }

  cargarReservas() {
    this.cargando = true;
    this.error = '';

    this.reservasService.getreservas().subscribe({
      next: (data) => {
        // Ordenar primero por estado (pendientes arriba) y luego por fecha
        this.reservas = data.sort((a, b) => {
          const orden = { pendiente: 0, confirmada: 1, cancelada: 2 };
          if (a.estado !== b.estado) {
            return orden[a.estado] - orden[b.estado];
          }
          return new Date(b.fecha_hora).getTime() - new Date(a.fecha_hora).getTime();
        });
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'No se pudieron cargar las reservas.';
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }

  aceptar(reserva: IReserva) {
    this.reservasService.cambiarEstado(reserva.id, 'confirmada').subscribe({
      next: () => {
        reserva.estado = 'confirmada';
        this.cdr.detectChanges();
      },
      error: () => alert('Error al aceptar la reserva.')
    });
  }

  cancelar(reserva: IReserva) {
    if (!confirm(`¿Cancelar la reserva #${reserva.id}?`)) return;

    this.reservasService.cambiarEstado(reserva.id, 'cancelada').subscribe({
      next: () => {
        reserva.estado = 'cancelada';
        this.cdr.detectChanges();
      },
      error: () => alert('Error al cancelar la reserva.')
    });
  }

  cambiarFiltro(filtro: FiltroEstado) {
    this.filtroActivo = filtro;
  }

  get reservasFiltradas(): IReserva[] {
    if (this.filtroActivo === 'todas') return this.reservas;
    return this.reservas.filter(r => r.estado === this.filtroActivo);
  }

  contar(estado: FiltroEstado): number {
    if (estado === 'todas') return this.reservas.length;
    return this.reservas.filter(r => r.estado === estado).length;
  }

  calcularTotal(reserva: IReserva): number {
    if (!reserva.productos) return 0;
    return reserva.productos.reduce(
      (acc, p) => acc + Number(p.precio) * p.pivot.cantidad,
      0
    );
  }

  formatearFecha(fecha: string): string {
    const d = new Date(fecha);
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} a las ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }
}