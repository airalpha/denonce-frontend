import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CouvertureService {
  host = 'http://localhost:8080';
  jwtToken = null;
  constructor(private http:HttpClient) { }

  updateRole(nom, id){
    if (this.jwtToken == null) this.loadToken();
    return this.http.put(this.host + '/update-role/'+nom+'?id='+id, '', {headers: new HttpHeaders({'Authorization':this.jwtToken})});
  }

  hideAdminRole(user){
  return !(user.role.couverture.id != 0);
  }

  loadToken(){
    this.jwtToken = localStorage.getItem('token');
  }
}
