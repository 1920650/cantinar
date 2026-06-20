import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IUser } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {

  private http = inject(HttpClient);

  /**
   * GET /api/user
   * Devuelve los datos del usuario actualmente logueado
   */
  getUsuarioActual() {
    return this.http.get<IUser>('http://localhost:8000/api/user');
  }
}