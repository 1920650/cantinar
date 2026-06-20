import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IReserva } from '../models/reserva';

@Injectable({
  providedIn: 'root',
})
export class ReservasService {
  private http = inject(HttpClient);

  getreservas() {
    return this.http.get<IReserva[]>('http://localhost:8000/api/reservas');
  }

  addreserva(reserva: any) {
    return this.http.post<IReserva>('http://localhost:8000/api/reservas', reserva);
  }

  cambiarEstado(id: number, estado: 'pendiente' | 'confirmada' | 'cancelada') {
    return this.http.put<IReserva>(`http://localhost:8000/api/reservas/${id}`, { estado });
  }

  deletereserva(id: number) {
    return this.http.delete<{ mensaje: string }>(`http://localhost:8000/api/reservas/${id}`);
  }
}