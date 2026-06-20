import { IProducto } from './producto';

export type Estado = 'pendiente' | 'confirmada' | 'cancelada';

export interface ProductoEnReserva extends IProducto {
    pivot: {
        reserva_id: number;
        producto_id: number;
        cantidad: number;
    };
}

export interface IReserva {
    id: number;
    user_id: number;
    fecha_hora: string;
    estado: Estado;
    productos?: ProductoEnReserva[];
}

export class Reserva implements IReserva {
    id: number;
    user_id: number;
    fecha_hora: string;
    estado: Estado;
    productos?: ProductoEnReserva[];

    constructor(id: number, user_id: number, fecha_hora: string, estado: Estado, productos?: ProductoEnReserva[]) {
        this.id = id;
        this.user_id = user_id;
        this.fecha_hora = fecha_hora;
        this.estado = estado;
        this.productos = productos;
    }
}