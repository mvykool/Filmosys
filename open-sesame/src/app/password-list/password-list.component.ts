import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OpenSesameService } from '../service/open-sesame.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-password-list',
  templateUrl: './password-list.component.html',
  styleUrls: ['./password-list.component.css']
})
export class PasswordListComponent {

  //global variables
  siteId !: string;
  siteName !: string;
  siteUrl !: string;
  imageUrl !: string;


  passwordList !: Observable<Array<any>>;


  //global variables to show in the form
  email !: string;
  username !: string;
  password !: string;
  passwordId !: string;

  //form state

  formState: string = "Add new";

  //popup
  isSuccess = false;
  succesMessage !: string;

  showAlert(message: string){
    this.isSuccess = true;
    this.succesMessage = message;
  }

  constructor(private route: ActivatedRoute, private openSesame: OpenSesameService){

    this.route.queryParams.subscribe((value: any) => {

      this.siteId = value.id;
      this.siteName = value.siteName;
      this.siteUrl = value.url;
      this.imageUrl = value.img;
    });

    this.loadPassword();
  }

  resetForm(){
    this.email = "";
    this.username = "";
    this.password = "";
    this.formState = "Add new";
    this.passwordId = "";
  }

  onSubmit(value: object){
    
    if(this.formState == 'Add new'){
      this.openSesame.addPassword(value, this.siteId)
    .then(() => {
      this.showAlert("Data Saved!");
      this.resetForm();
    })
    .catch(err => {
      console.log(err)
    })
    }
    else if(this.formState == "Edit"){
      this.openSesame.updatePassword(this.siteId, this.password, value)
      .then(() => {
        this.showAlert("Data edited!");
        this.resetForm();
      })
      .catch(err => {
        console.log(err)
      })
    }
  }

  loadPassword(){
    this.passwordList = this.openSesame.loadPassword(this.siteId)
  }


  editPassword(email: string, password: string, id: string, username: string){
    this.passwordId = id;
    this.password = password;
    this.email = email;
    this.username = username;

    this.formState = "Edit";
  }

  deletePassword(passwordId: string){
    this.openSesame.deletePassword(this.siteId, passwordId)
    .then(() => {
      this.showAlert("Data deleted!");
      this.resetForm();
    })
    .catch(err => {
      console.log(err)
    })
  }
}
