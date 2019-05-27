import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EtablissementService {

  host = 'http://localhost:8080';
  private jwtToken:string = null;
  constructor(private http: HttpClient) { }

  getEtablissement() {
    return this.http.get(this.host + '/etablissement');
  }

  getOneEtablissement(id){
    return this.http.get(this.host + '/etablissement/'+id);
  }

  updateEtablissement(id, etablissement){
    if (this.jwtToken == null) this.loadToken();
    return this.http.put(this.host + '/etablissement/'+id, etablissement, {headers: new HttpHeaders({'Authorization':this.jwtToken})});
  }

  deleteEtablissement(id){
    if (this.jwtToken == null) this.loadToken();
    return this.http.delete(this.host + '/etablissement/'+id, {headers: new HttpHeaders({'Authorization':this.jwtToken})});
  }

  addEtablissement(etablissement){
    if (this.jwtToken == null) this.loadToken();
    console.log(etablissement);
    return this.http.post(this.host + '/etablissement', etablissement, {headers: new HttpHeaders({'Authorization':this.jwtToken})});
  }

  getEtablissements(motcle, page, size){
    return this.http.get(this.host + '/etablissement/chercher?nom='+motcle+'&page='+page+'&size='+size);
  }

  getDenonEtab(id) {
      return this.http.get(this.host + '/denonce-etab/'+id);
  }

  loadToken(){
    this.jwtToken = localStorage.getItem('token');
  }

}
