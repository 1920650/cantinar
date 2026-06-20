import { Routes } from '@angular/router';
import { LoginComponent } from './login/loginComponent';
import { HomeComponent } from './home/homeComponent';
import { RegisterComponent } from './register/registerComponent';
import { CatalogoComponent } from './catalogo/catalogoComponent';
import { CarritoComponent } from './carrito/carritoComponent';
import { MisReservasComponent } from './mis-reservas/misReservasComponent';
import { AdminProductosComponent } from './admin/productos/adminProductosComponent';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  // Públicas
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'catalogo', component: CatalogoComponent },

  // Requieren login
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'carrito', component: CarritoComponent, canActivate: [authGuard] },
  { path: 'mis-reservas', component: MisReservasComponent, canActivate: [authGuard] },

  // Requieren ser admin
  { path: 'admin/productos', component: AdminProductosComponent, canActivate: [adminGuard] },
  // { path: 'admin/reservas', component: AdminReservasComponent, canActivate: [adminGuard] },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];