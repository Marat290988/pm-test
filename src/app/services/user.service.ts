import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from "src/enviroments/enviroment";
import { Router } from "@angular/router";

export interface User {
  user_id: number,
  username: string,
  token: string
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  host = environment.apiUrl;
  user: User | null = null;

  constructor(
    private http: HttpClient,
    private router: Router
  ){

  }

  login(loginData: {email: string, password: string}) {
    return this.http.post(`/api/auth/token/login/`, JSON.stringify(loginData), {observe: 'response'});
  }

  setUser(user: User) {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(this.user));
  }

  logout() {
    this.user = null;
    localStorage.removeItem('user');
    this.router.navigate(['/auth']);
  }

  setUserInStart() {
    if (localStorage.getItem('user')) {
      const localUser: string = localStorage.getItem('user') as string;
      this.user = JSON.parse(localUser);
    }
  }
}
