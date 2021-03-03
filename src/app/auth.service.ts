import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isLoggedIn()
  {
    return (localStorage.getItem('loggedName') && localStorage.getItem('loggedName') != "" && localStorage.getItem('loggedName') != null)
  }

  loginUser(name)
  {
    localStorage.setItem('loggedName',name);
  }

}
