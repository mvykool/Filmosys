// src/app/components/header/header.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Auth, authState } from '@angular/fire/auth';
import { FirebaseService } from '../../core/services/firebase/firebase.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header>
      <nav>
        <div>Hotel MK</div>
        <div>
          <ng-container *ngIf="isLoggedIn; else loginButton">
            <span>{{ userEmail }}</span>
            <button (click)="logout()">Logout</button>
          </ng-container>
          <ng-template #loginButton>
            <button (click)="login()">Login</button>
          </ng-template>
        </div>
      </nav>
    </header>
  `,
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  userEmail: string | null = null;

  constructor(
    private auth: Auth,
    private firebaseService: FirebaseService,
    private router: Router,
  ) {}

  ngOnInit() {
    // Subscribe to auth state changes
    authState(this.auth).subscribe((user) => {
      this.isLoggedIn = !!user;
      this.userEmail = user?.email ?? null;
    });
  }

  async login() {
    await this.firebaseService.signInWithGoogle();
  }

  async logout() {
    await this.firebaseService.signOut();
    this.router.navigate(['/login']);
  }
}
