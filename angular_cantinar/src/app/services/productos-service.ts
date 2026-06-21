import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IProducto } from '../models/producto';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getProductos() {
    return this.http.get<IProducto[]>(`${this.apiUrl}/productos`);
  }

  addProducto(producto: Omit<IProducto, 'id'>) {
    return this.http.post<IProducto>(`${this.apiUrl}/productos`, producto);
  }

  updateProducto(producto: IProducto) {
    return this.http.put<IProducto>(`${this.apiUrl}/productos/${producto.id}`, producto);
  }

  deleteProducto(id: number) {
    return this.http.delete<{ mensaje: string }>(`${this.apiUrl}/productos/${id}`);
  }
}