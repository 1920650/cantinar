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
  esAdmin: boolean = false;

  constructor() {
    this.authService.usuarioActual.subscribe(user => {
      this.usuario = user;
      if (user?.role === 'admin') {
        this.esAdmin = true;
      }
      
    });
  }

  cerrarSesion() {
    this.authService.logout().subscribe({
      next: () => this.router.navigate(['/login']),
      error: () => this.router.navigate(['/login'])
    });
  }
}