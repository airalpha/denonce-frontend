import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from '../authentication.service';
import {Router} from '@angular/router';
import {AlertService} from '../alert/alert.service';

@Injectable({
  providedIn: 'root'
})
export class VilleService {
  host = 'http://localhost:8080';
  jwtToken = null;
  private expiration: string;
  constructor(private http: HttpClient, private auth:AuthenticationService,
              private router:Router,
              private alertService:AlertService) { }

  getVille() {
    return this.http.get(this.host + '/ville');
  }

  getOneVille(id){
    return this.http.get(this.host + '/ville/'+id);
  }

  updateVille(id, ville){
    if (this.jwtToken == null) this.loadToken();
    return this.http.put(this.host + '/ville/'+id, ville, {headers: new HttpHeaders({'Authorization':this.jwtToken})});
  }

  deleteVille(id){
    if (this.jwtToken == null) this.loadToken();
    return this.http.delete(this.host + '/ville/'+id, {headers: new HttpHeaders({'Authorization':this.jwtToken})});
  }

  addVille(ville){
    if (this.jwtToken == null) this.loadToken();
    return this.http.post(this.host + '/ville', ville, {headers: new HttpHeaders({'Authorization':this.jwtToken})});
  }

  getQuartierVille(id){
    return this.http.get(this.host + '/quartier-ville/'+id);
  }

  getVilles(motcle, page, size){
    return this.http.get(this.host + '/ville/chercher?nom='+motcle+'&page='+page+'&size='+size);
  }

  /*loadToken(){
    this.expiration = localStorage.getItem("expired");
    if(new Date().getTime()/1000 > Number(localStorage.getItem("expired"))){
      console.log("A",new Date().getTime()/1000, localStorage.getItem("expired"));
      this.auth.logout();
      this.router.navigateByUrl("/login");
      this.alertService.alert("Delai de connexion depassé", "info");
    }else{
      console.log("B",new Date().getTime()/1000, localStorage.getItem("expired"));
      this.jwtToken = localStorage.getItem('token');
    }
  }*/

  loadToken(){
    console.log(new Date().getTime()/1000, localStorage.getItem("expired"));
    this.jwtToken = localStorage.getItem('token');
  }


}
