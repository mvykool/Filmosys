// src/app/components/header/header.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Auth, authState } from '@angular/fire/auth';
import { FirebaseService } from '../../core/services/firebase/firebase.service';
import { SearchComponent } from './search/search.component';
import { strings, Strings } from '../../utils/constants';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, SearchComponent],
  templateUrl: 'header.component.html',
  styleUrl: 'header.component.scss',
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  customStrings: Strings = strings;

  userName: string | null = null;
  pic: string | null = null;

  dropdown: boolean = false;
  pokemons: any = [];

  constructor(
    private auth: Auth,
    private firebaseService: FirebaseService,
    private router: Router,
  ) {}

  ngOnInit() {
    authState(this.auth).subscribe((user) => {
      this.isLoggedIn = !!user;
      this.userName = user?.displayName ?? null;
      this.pic = user?.photoURL ?? null;
    });
  }

  async login() {
    await this.firebaseService.signInWithGoogle();
  }

  async logout() {
    await this.firebaseService.signOut();
    this.router.navigate(['/login']);
  }

  dropDown(): boolean {
    return (this.dropdown = !this.dropdown);
  }
}
