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
  templateUrl: 'header.component.html',
  styleUrl: 'header.component.scss',
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  userName: string | null = null;
  navLinks: string[] = ['Home', 'Blog', 'About', 'more'];

  constructor(
    private auth: Auth,
    private firebaseService: FirebaseService,
    private router: Router,
  ) {}

  ngOnInit() {
    authState(this.auth).subscribe((user) => {
      this.isLoggedIn = !!user;
      this.userName = user?.displayName ?? null;
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
