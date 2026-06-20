export type Role = 'admin' | 'cliente';

export interface IUser {
    id: number;
    name: string;
    email: string;
    telefono: string;
    role: Role;
}

export class User implements IUser {
    id: number;
    name: string;
    email: string;
    telefono: string;
    role: Role;

    constructor(id: number, name: string, email: string, telefono: string, role: Role) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.telefono = telefono;
        this.role = role;
    }
}