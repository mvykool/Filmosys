// src/app/core/services/firebase/firebase.service.ts
import { Injectable } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from '@angular/fire/auth';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(
    private auth: Auth,
    private firestore: Firestore,
  ) {}

  async signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider);
  }

  async signOut() {
    return signOut(this.auth);
  }

  getCollection(path: string) {
    return collection(this.firestore, path);
  }

  async addDocument(collectionPath: string, data: any) {
    const collectionRef = this.getCollection(collectionPath);
    return addDoc(collectionRef, data);
  }
}
