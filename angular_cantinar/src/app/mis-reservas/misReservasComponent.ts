import { Component, inject, afterNextRender, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReservasService } from '../services/reservas-service';
import { IReserva } from '../models/reserva';
import { UsersService } from '../services/users-service';

@Component({
  selector: 'app-mis-reservas',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './misReservasComponent.html',
  styleUrl: './misReservasComponent.css'
})
export class MisReservasComponent {
  private reservasService = inject(ReservasService);
  private cdr = inject(ChangeDetectorRef);
  private userService = inject(UsersService); // Inyectar el servicio de usuario

  reservas: IReserva[] = [];
  cargando: boolean = true;
  error: string = '';
  Number = Number;
  userName: string = ''; 

  constructor() {
    afterNextRender(() => {
      this.cargarReservas();
    });
  }

  cargarReservas() {
    this.cargando = true;
    this.error = '';

    this.reservasService.getreservas().subscribe({
      next: (data: any) => {
        // Ordenar de más reciente a más antigua
        this.reservas = data.sort((a: IReserva, b: IReserva) =>
          new Date(b.fecha_hora).getTime() - new Date(a.fecha_hora).getTime()
        );
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar reservas:', err);
        this.error = 'No se pudieron cargar tus reservas.';
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }

  cancelar(reserva: IReserva) {
    if (!confirm(`¿Cancelar la reserva del ${this.formatearFecha(reserva.fecha_hora)}?`)) {
      return;
    }

    this.reservasService.deletereserva(reserva.id).subscribe({
      next: () => {
        this.reservas = this.reservas.filter(r => r.id !== reserva.id);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cancelar:', err);
        alert('No se pudo cancelar la reserva.');
      }
    });
  }

  // Calcular el total de una reserva
  calcularTotal(reserva: IReserva): number {
    if (!reserva.productos) return 0;
    return reserva.productos.reduce(
      (acc, p) => acc + Number(p.precio) * p.pivot.cantidad,
      0
    );
  }
  ngOnInit(){
    this.userService.getUsuarioActual().subscribe({
      next: (user) => {
        this.userName = user.name; // Asignar el nombre del usuario
        this.cdr.detectChanges();
      }
    });
  }
  // Formatear fecha para mostrar
  formatearFecha(fecha: string): string {
    const d = new Date(fecha);
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} a las ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }

  // Clase CSS según el estado
  claseEstado(estado: string): string {
    return `estado estado-${estado}`;
  }
}