export type Role = 'admin' | 'user';

export interface IUser {
    id: number;
    name: string;
    email: string;
    telefono: number;
    role: Role;
}

export class User implements IUser {
    id: number;
    name: string;
    email: string;
    telefono: number;
    role: Role;

    constructor(id: number, name: string, email: string, telefono: number, role: Role) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.telefono = telefono;
        this.role = role;
    }
}
