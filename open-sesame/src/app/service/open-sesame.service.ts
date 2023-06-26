import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class OpenSesameService {

  constructor(private firestore: Firestore) { }

  addSite(data: object) {
      const dbInstance = collection(this.firestore, "sites");

      return addDoc(dbInstance, data)
  }

  loadSites(){
    const dbInstance = collection(this.firestore, "sites");

    return collectionData(dbInstance, { idField: "id"});
  }
}
