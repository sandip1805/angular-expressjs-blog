import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private api: ApiService
  ) {
  }

  login(body: any) {
    return this.api.get(`users?email=${body?.email}&password=${body?.password}`);
  }

  signup(body: any) {
    return this.api.post(`users`, body);
  }
}
