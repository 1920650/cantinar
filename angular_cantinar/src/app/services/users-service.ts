import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IUser } from '../models/user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {

  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;
  /**
   * GET /api/user
   * Devuelve los datos del usuario actualmente logueado
   */
  getUsuarioActual() {
    return this.http.get<IUser>(`${this.apiUrl}/user`);
  }
}