import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // Rutas que requieren login: no se pueden resolver sin sesión real
  { path: 'home', renderMode: RenderMode.Client },
  { path: 'carrito', renderMode: RenderMode.Client },
  { path: 'mis-reservas', renderMode: RenderMode.Client },

  // Rutas que requieren admin: mismo motivo
  { path: 'admin/productos', renderMode: RenderMode.Client },
  { path: 'admin/reservas', renderMode: RenderMode.Client },

  // El resto (login, register, catalogo, etc.) sí se puede prerenderizar
  { path: '**', renderMode: RenderMode.Prerender }
];
