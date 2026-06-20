import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IUser } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {

  http = inject(HttpClient);
  
  getusers() {
    return this.http.get('http://localhost:8000/users');
  }
  adduser(user : IUser) {
    return this.http.post('http://localhost:8000/users', user);
  }
  updateuser(user: IUser) {
    return this.http.put(`http://localhost:8000/users/${user.id}`, user);
  }
  deleteuser(id: number) {
    return this.http.delete(`http://localhost:8000/users/${id}`);
  }

}
