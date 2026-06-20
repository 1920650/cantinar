import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core/primitives/di";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { IUser } from "../models/user";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class AuthService {

    http = inject(HttpClient);
    ususarioActual = new BehaviorSubject<IUser | null>(null);

    login(email: string, password: string) {
        return this.http.post('http://localhost:8000/api/login', { email, password });
    }

    register(name: string, email: string, password: string) {
        return this.http.post('http://localhost:8000/api/register', { name, email, password });
    }
    logout(): void {
        localStorage.removeItem('token');
        this.ususarioActual.next(null);
    }
    isLogedIn(): boolean {
       return this.ususarioActual.value !== null;
    }
}
