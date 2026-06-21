import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IReserva } from '../models/reserva';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReservasService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getreservas() {
    return this.http.get<IReserva[]>(`${this.apiUrl}/reservas`);
  }

  addreserva(reserva: any) {
    return this.http.post<IReserva>(`${this.apiUrl}/reservas`, reserva);
  }

  cambiarEstado(id: number, estado: 'pendiente' | 'confirmada' | 'cancelada') {
    return this.http.put<IReserva>(`${this.apiUrl}/reservas/${id}`, { estado });
  }

  deletereserva(id: number) {
    return this.http.delete<{ mensaje: string }>(`${this.apiUrl}/reservas/${id}`);
  }
}