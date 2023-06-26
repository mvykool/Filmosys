import { Component } from '@angular/core';
import { OpenSesameService } from '../service/open-sesame.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-app-list',
  templateUrl: './app-list.component.html',
  styleUrls: ['./app-list.component.css']
})
export class AppListComponent {

  //global data
  allSites !: Observable<Array<any>>;

  //values
  siteName !: string;
  siteUrl !: string;
  imageUrl !: string;
  siteId!: string;


  //contructor, get service, and call queries

  constructor(private openSesame: OpenSesameService){
    this.loadSites();
  }

  //storing data

  onSubmit(values:object){
    console.log(values);

    this.openSesame.addSite(values)
    .then(() => {
      console.log("data saved successfully");
    })
    .catch(err => {
      console.log(err)
    });
  }

  //getting data

  loadSites(){
    this.allSites = this.openSesame.loadSites();
  }

  //edit sites

  editSite(siteName:string, siteUrl :string, imageUrl :string, id :string){
      this.siteName = siteName;
      this.siteUrl = siteUrl;
      this.imageUrl = imageUrl;
      this.siteId = id;
  }

}
