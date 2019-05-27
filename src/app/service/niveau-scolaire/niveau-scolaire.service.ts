import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NiveauScolaireService {

  host = 'http://localhost:8080';
  constructor(private http: HttpClient) { }

  getNiveauScolaire(){
    return this.http.get(this.host + '/niveau-scolaire');
  }

}
