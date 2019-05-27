import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  host = 'http://localhost:8080';
  jwtToken = null;
  constructor(private http:HttpClient) { }

  getUsers(){
    return this.http.get(this.host+"/users");
  }

  getOneUser(id){
    return this.http.get(this.host+"/user/"+id)
  }

  updateUser(id, user){
    if (this.jwtToken == null) this.loadToken();
    return this.http.put(this.host+"/users/"+id, user, {headers: new HttpHeaders({'Authorization':this.jwtToken})});
  }

  addUser(user){
    return this.http.post(this.host+"/register", user);
  }

  deleteUser(id){
    if (this.jwtToken == null) this.loadToken();
    return this.http.delete(this.host+"/users/"+id, {headers: new HttpHeaders({'Authorization':this.jwtToken})});
  }

  loadToken(){
    this.jwtToken = localStorage.getItem('token');
  }
}
