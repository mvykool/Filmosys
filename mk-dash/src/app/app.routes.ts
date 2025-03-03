import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { MainComponent } from './layout/main/main.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: MainComponent },
];
