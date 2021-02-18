import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class LinksService {

  constructor(private firestore: AngularFirestore ) {}

  createNewLink(data) {
    return new Promise<any>((resolve, reject) =>{
        this.firestore
            .collection("Links")
            .add(data)
            .then(res => {console.log("created with ID : " +res.id);
            }, err => reject(err));
    });
  }
}
