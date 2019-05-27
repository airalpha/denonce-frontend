import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TypeDenonciationService {

  host = 'http://localhost:8080';
  constructor(private http: HttpClient) { }

  getTypeDenonciation(){
    return this.http.get(this.host + '/type-denonciation');
  }
}
