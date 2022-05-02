import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  set setUserStatus(data: boolean) {
    this.userSatus.next(data);
  }

  get getUserStatus(): Observable<boolean> {
    return this.userSatus.asObservable();
  }

}
