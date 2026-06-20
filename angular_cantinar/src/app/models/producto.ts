export interface IProducto {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    disponible: boolean;
}

export class Producto implements IProducto {

id : number;
nombre : string;
descripcion : string;
precio : number;
disponible : boolean;

constructor(id: number, nombre: string, descripcion: string, precio: number, disponible: boolean) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = precio;
    this.disponible = disponible;
    }
}