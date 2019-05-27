import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegionService {

  host = 'http://localhost:8080';
  constructor(private http: HttpClient) { }

  getRegion(){
    return this.http.get(this.host + '/region');
  }

  getVilleRegion(id){
    return this.http.get(this.host + '/ville-region/'+id);
  }

}
