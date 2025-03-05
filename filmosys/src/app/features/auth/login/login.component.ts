import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FirebaseService } from '../../../core/services/firebase/firebase.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="login-container">
      <button (click)="signInWithGoogle()">Sign in with Google</button>
    </div>
  `,
  styles: [
    `
      .login-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
      }
    `,
  ],
})
export class LoginComponent {
  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
  ) {}

  async signInWithGoogle() {
    try {
      const result = await this.firebaseService.signInWithGoogle();
      if (result.user) {
        this.router.navigate(['/home']);
      }
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  }
}
