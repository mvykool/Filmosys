import { Component } from '@angular/core';
import { OpenSesameService } from '../service/open-sesame.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  isError : boolean = false;

  constructor(private openSesame: OpenSesameService, private router:Router){}

  onSubmit(value: any){
    this.openSesame.login(value.email, value.password)
    .then(() => {
      this.router.navigate(["/sites-list"])
    })
    .catch(err => {
      console.log(err)
      this.isError = true;
    })
  }

}
