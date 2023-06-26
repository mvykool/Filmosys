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

  //state of name's from

  formState: string = "Add New";


  //contructor, get service, and call queries

  constructor(private openSesame: OpenSesameService){
    this.loadSites();
  }

  //storing data

  onSubmit(values:object){
    

    if(this.formState === "Add New"){
      this.openSesame.addSite(values)
      .then(() => {
        console.log("data saved successfully");
      })
      .catch(err => {
        console.log(err)
      });
    }
    else if(this.formState === "Edit"){
      this.openSesame.updateSite(this.siteId, values)
      .then(() => {
        console.log("data updated successfully");
      })
      .catch(err => {
        console.log(err)
      });
    }
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

      this.formState = "Edit";
  }

  deleteSite(id :string){
    this.openSesame.deleteSite(id)
    .then(() => {
      console.log("data deleted successfully");
    })
    .catch(err => {
      console.log(err)
    });
  }

}
