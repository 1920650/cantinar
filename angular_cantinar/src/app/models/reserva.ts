export type Estado = 'pendiente' | 'confirmada' | 'cancelada';

export interface IReserva {
    id: number;
    user_id: number;
    fecha_hora: string;
    estado: Estado;
}
export class Reserva implements IReserva {
    id: number;
    user_id: number;
    fecha_hora: string;
    estado: Estado;
    
constructor(id: number, user_id: number, hora: string, fecha_hora: string, estado: Estado) {
    this.id = id;
    this.user_id = user_id;
    this.fecha_hora = fecha_hora;
    this.estado = estado;
    }
}
