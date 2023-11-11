import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserLogin, UserSignup } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API_URL = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }

  login(user: UserLogin) {
    return this.http.post(this.API_URL + "login", user);
  }

  signup(user: UserSignup) {
    return this.http.post(this.API_URL + "signup", user);
  }

  uploadFiles(files: FormData, token: string) {
    return this.http.post(this.API_URL + 'upload', files, {headers: {'Authorization': "Bearer " + token}});
  }

  getAllFiles(userName: string) {
    return this.http.get(this.API_URL + "all?userName=" + userName);
  }

}
