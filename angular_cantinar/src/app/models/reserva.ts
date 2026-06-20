import { IProducto } from './producto';
import { IUser } from './user';

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
    user?: IUser;  // ← añadido, viene cuando admin lista todas las reservas
}

export class Reserva implements IReserva {
    id: number;
    user_id: number;
    fecha_hora: string;
    estado: Estado;
    productos?: ProductoEnReserva[];
    user?: IUser;

    constructor(id: number, user_id: number, fecha_hora: string, estado: Estado, productos?: ProductoEnReserva[], user?: IUser) {
        this.id = id;
        this.user_id = user_id;
        this.fecha_hora = fecha_hora;
        this.estado = estado;
        this.productos = productos;
        this.user = user;
    }
}