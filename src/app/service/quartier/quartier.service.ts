import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuartierService {

  host = 'http://localhost:8080';
  private jwtToken: string;
  constructor(private http: HttpClient) { }

  getQuartier() {
    return this.http.get(this.host + '/quartier');
  }

  getOneQuartier(id){
    return this.http.get(this.host + '/quartier/'+id);
  }

  updateQuartier(id, quartier){
    if (this.jwtToken == null) this.loadToken();
    return this.http.put(this.host + '/quartier/'+id, quartier, {headers: new HttpHeaders({'Authorization':this.jwtToken})});
  }

  deleteQuartier(id){
    if (this.jwtToken == null) this.loadToken();
    return this.http.delete(this.host + '/quartier/'+id, {headers: new HttpHeaders({'Authorization':this.jwtToken})});
  }

  addQuartier(quartier){
    if (this.jwtToken == null) this.loadToken();
    console.log(quartier);
    return this.http.post(this.host + '/quartier', quartier, {headers: new HttpHeaders({'Authorization':this.jwtToken})});
  }

  getEtabQuartier(id){
    return this.http.get(this.host + '/etab-quartier/'+id);
  }

  getQuartiers(motcle, page, size){
    return this.http.get(this.host + '/quartier/chercher?nom='+motcle+'&page='+page+'&size='+size);
  }

  loadToken(){
    this.jwtToken = localStorage.getItem('token');
  }

}
