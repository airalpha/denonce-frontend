import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DenonciationService {

  host = 'http://localhost:8080';
  private jwtToken: string;
  constructor(private http: HttpClient) { }

  getDenonciation() {
    return this.http.get(this.host + '/denonciation');
  }

  getOneDenonciation(id){
    return this.http.get(this.host + '/denonciation/'+id);
  }

  addDenonciation(denonciation){
    return this.http.post(this.host + '/denonciation', denonciation);
  }

  updateDenonciation(id, denonciation){
    if (this.jwtToken == null) this.loadToken();
    return this.http.put(this.host + '/denonciation/'+id, denonciation, {headers: new HttpHeaders({'Authorization':this.jwtToken})});
  }

  getDenonciations(motcle, page, size) {
    return this.http.get(this.host + '/denonciation/chercher?nom='+motcle+'&page='+page+'&size='+size);
  }

  loadToken(){
    this.jwtToken = localStorage.getItem('token');
  }
}
