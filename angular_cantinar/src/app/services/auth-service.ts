import { HttpClient } from "@angular/common/http";
import { inject, Injectable, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { BehaviorSubject, tap } from "rxjs";
import { IUser } from "../models/user";
import { environment } from "../../environments/environment";

interface AuthResponse {
  user: IUser;
  token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  usuarioActual = new BehaviorSubject<IUser | null>(this.getUsuarioDeStorage());

  login(email: string, password: string) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap(response => {
          this.guardarSesion(response.user, response.token);
        })
      );
  }

  register(name: string, email: string, password: string, password_confirmation: string, telefono: string) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, {
      name,
      email,
      password,
      password_confirmation,
      telefono,
    }).pipe(
      tap(response => {
        this.guardarSesion(response.user, response.token);
      })
    );
  }

  logout() {
    return this.http.post(`${this.apiUrl}/logout`, {})
      .pipe(
        tap(() => {
          this.limpiarSesion();
        })
      );
  }

  isLogedIn(): boolean {
    return this.usuarioActual.value !== null;
  }

  isAdmin(): boolean {
    return this.usuarioActual.value?.role === 'admin';
  }

  // ============== Métodos privados ==============

  private guardarSesion(user: IUser, token: string) {
    if (this.isBrowser) {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    }
    this.usuarioActual.next(user);
  }

  private limpiarSesion() {
    if (this.isBrowser) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    this.usuarioActual.next(null);
  }

  private getUsuarioDeStorage(): IUser | null {
    if (!this.isBrowser) {
      return null;
    }
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }
}