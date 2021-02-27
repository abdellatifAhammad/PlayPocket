import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from "@angular/fire/storage";
import { map, finalize } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LinksService {
  
  constructor(private firestore: AngularFirestore, private storage: AngularFireStorage ) {}

  createNewLink(data) {
    return this.firestore
            .collection("Links")
            .add(data)
  }

  getLikns(user){
    return this.firestore.collection("Links").ref.where('userEmail','==',user).get()
  }

}
