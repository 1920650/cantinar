import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IReserva } from '../models/reserva';

@Injectable({
  providedIn: 'root',
})
export class ReservasService {

  http = inject(HttpClient);
  
  getreservas() {
    return this.http.get('http://localhost:8000/api/reservas');
  }
  addreserva(reserva: IReserva) {
    return this.http.post('http://localhost:8000/api/reservas', reserva);
  }
  updatereserva(reserva: IReserva) {
    return this.http.put(`http://localhost:8000/api/reservas/${reserva.id}`, reserva);
  }
  deletereserva(id: number) {
    return this.http.delete(`http://localhost:8000/api/reservas/${id}`);
  }
  
}
