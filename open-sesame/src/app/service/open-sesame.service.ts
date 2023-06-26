import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, updateDoc,deleteDoc } from '@angular/fire/firestore';

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

  updateSite(id: string, data: object) {
    const docInstance = doc(this.firestore, "sites", id);

    return updateDoc(docInstance, data);
  }

  deleteSite(id: string) {
    const docInstance = doc(this.firestore, "sites", id);

    return deleteDoc(docInstance);
    
  }

  //pasword queries

  addPassword(data: object, siteId: string) {
    const dbInstance = collection(this.firestore, `sites/${siteId}/password`);

    return addDoc(dbInstance, data);
  }

  loadPassword(siteId: string){
    const dbInstance = collection(this.firestore, `sites/${siteId}/password`);

    return collectionData(dbInstance, {idField : 'id'});
  }

  updatePassword(siteId: string, passwordId: string, data: object) {
    const docInstance = doc(this.firestore, `sites/${siteId}/password`, passwordId);

    return updateDoc(docInstance, data);
  }

  deletePassword(siteId: string, passwordId: string){
    const  docInstance = doc(this.firestore, `sites/${siteId}/password`, passwordId);

    return deleteDoc(docInstance);
  }
}
