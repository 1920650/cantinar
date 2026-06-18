export class ReservaProducto {
    id: number;
    reserva_id: number;
    producto_id: number;
    cantidad: number;

    constructor(id: number, reserva_id: number, producto_id: number, cantidad: number) {
        this.id = id;
        this.reserva_id = reserva_id;
        this.producto_id = producto_id;
        this.cantidad = cantidad;
    }
}
