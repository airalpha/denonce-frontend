import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {EtablissementService} from '../service/etablissement/etablissement.service';
import {QuartierService} from '../service/quartier/quartier.service';
import {RegionService} from '../service/region/region.service';
import {VilleService} from '../service/ville/ville.service';
import {DenonciationService} from '../service/denonciation/denonciation.service';
import {AuthenticationService} from '../service/authentication.service';
import {AdminService} from '../service/admin/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  quartiers: Object = [];
  etablissements: Object = [];
  denonciations: Object = [];
  villes: Object = [] ;
  regions: Object = [];
  admins:Object = [];
  s:number = 0;
  ns:number = 0;
  ids:any;
  dtype:any;
  id_ville:any;
  showQuartier = false;

  dataAd:any;

  constructor(private router: Router,
              private etablissementService: EtablissementService,
              private quartierService:QuartierService,
              private regionService:RegionService,
              private villeService:VilleService,
              private denonciationService:DenonciationService,
              private auth:AuthenticationService,
              private adminService:AdminService) { }

  ngOnInit() {
    this.ids = localStorage.getItem('ids');
    this.dtype = localStorage.getItem('dtype');
    this.getData();
    if (this.dtype=="ADMIN"){
      this.getUsers();
      this.getRegion();
      this.getVille();
      this.getQuartier();
      this.getEtablissement();
      this.getDenonciation();
    }
  }

  getData(){
    if (Number(this.ids)){
      this.auth.getCouvertures(this.ids).subscribe(
        data =>{
          this.dataAd = new Array(data);
          console.log(data)
        }
      )
    }

  }

  getEtablissement(){
    this.etablissementService.getEtablissement().subscribe(data => {
      this.etablissements = data;
    });
  }

  getUsers(){
    this.adminService.getUsers().subscribe(
      data => {
        console.log(data);
        this.admins = data;
      }
    )
  }

  /*getEtablissement(id){
    this.etablissementService.getDenonEtab(id).subscribe(data => {
      this.denonciations = data;
    });
  }*/

  getQuartier(){
    this.quartierService.getQuartier().subscribe(
      data => {
        this.quartiers = data;
      }
    )
  }

  /*getQuartier(id:number){
    this.quartierService.getEtabQuartier(id).subscribe(
      data => {
        this.etablissements = data;
      }
    )
  }*/

  getDenonciation(){
    this.denonciationService.getDenonciation().subscribe(
      data => {
        for (let i in data){
          if(data[i]['statut'] == true){
            this.s++;
          }else {
            this.ns++;
          }
        }
        this.denonciations = data;
      }
    )
  }

  getVille(){
    this.villeService.getVille().subscribe(
      data =>{
        this.villes = data;
      }
    )
  }

  /*getVille(id:number){
      this.villeService.getQuartierVille(id).subscribe(
        data => {
          console.log(data);
          this.quartiers = data;
          this.showQuartier = true;
        }
      )
  }*/

  getRegion(){
    this.regionService.getRegion().subscribe(
      data =>{
        this.regions = data;
      }
    )
  }

  setQuartier(id){
    this.villeService.getQuartierVille(id).subscribe(
      data => {
        console.log(data);
        this.quartiers = data;
      }
    )
    this.etablissements = [];
    this.denonciations = [];
  }

  setEtab(id){
    this.quartierService.getEtabQuartier(id).subscribe(
      data => {
        console.log(data);
        this.etablissements = data;
      }
    )
    this.denonciations = [];
  }

  setDenon(id){
      this.etablissementService.getDenonEtab(id).subscribe(
        data => {
          console.log(data);
          this.denonciations = data;
        }
      )
  }

  setVille(id){
    this.regionService.getVilleRegion(id).subscribe(
      data => {
        console.log(data);
        this.villes = data;
      }
    )
    this.quartiers = [];
    this.etablissements = [];
    this.denonciations = [];
  }

}
