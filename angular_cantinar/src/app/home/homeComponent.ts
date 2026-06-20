import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { IUser } from '../models/user';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './homeComponent.html',
  styleUrl: './homeComponent.css'
})
export class HomeComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  usuario: IUser | null = null;

  constructor() {
    // Suscribirse al estado del usuario
    this.authService.usuarioActual.subscribe(user => {
      this.usuario = user;
    });
  }

  cerrarSesion() {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: () => {
        // Aunque falle el backend, el AuthService ya limpió localStorage
        this.router.navigate(['/login']);
      }
    });
  }
}