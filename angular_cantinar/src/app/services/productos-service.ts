import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IProducto } from '../models/producto';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  private http = inject(HttpClient);

  getProductos() {
    return this.http.get<IProducto[]>('http://localhost:8000/api/productos');
  }

  addProducto(producto: Omit<IProducto, 'id'>) {
    return this.http.post<IProducto>('http://localhost:8000/api/productos', producto);
  }

  updateProducto(producto: IProducto) {
    return this.http.put<IProducto>(`http://localhost:8000/api/productos/${producto.id}`, producto);
  }

  deleteProducto(id: number) {
    return this.http.delete<{ mensaje: string }>(`http://localhost:8000/api/productos/${id}`);
  }
}