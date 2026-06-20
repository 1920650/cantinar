import { Routes } from '@angular/router';
import { LoginComponent } from './login/loginComponent';
import { HomeComponent } from './home/homeComponent';
import { RegisterComponent } from './register/registerComponent';
import { CatalogoComponent } from './catalogo/catalogoComponent';
import { CarritoComponent } from './carrito/carritoComponent';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'catalogo', component: CatalogoComponent },
  { path: 'carrito', component: CarritoComponent },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];