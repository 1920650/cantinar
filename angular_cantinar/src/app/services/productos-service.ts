import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IProducto } from '../models/producto';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {

  http = inject(HttpClient);
  
  getProductos() {
    return this.http.get('http://localhost:8000/productos');
  }
  addProducto(producto: IProducto) {
    return this.http.post('http://localhost:8000/productos', producto);
  }
  updateProducto(producto: IProducto) {
    return this.http.put(`http://localhost:8000/productos/${producto.id}`, producto);
  }
  deleteProducto(id: number) {
    return this.http.delete(`http://localhost:8000/productos/${id}`);
  }
  
}
