import { Injectable } from '@angular/core';

import * as firebase from 'firebase';
import 'firebase/firestore';

import { AngularFirestore } from '@angular/fire/firestore';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FireBaseCsUsersService {
  csUsersRef = this.db.firestore.collection("csUsers");
  constructor(public db: AngularFirestore) { }
 
  getTripEnrolments(tripKey) {
    const csUsersRef = this.db.firestore.collection("csUsers");
  
    var tripsEnrolmentsSnapshot = this.db.firestore.collection('trips_enrolments').doc(tripKey);

    var dbPromises = [];

    return tripsEnrolmentsSnapshot.get().then(function (doc) {
      if (doc.exists) {
        let data = doc.data();
        for (const key in data) {
          const value = data[key];
          dbPromises.push(csUsersRef.doc(key).get());
        }   
        return dbPromises;
        
      } else {
        console.log("No such document!");
      }
    });
   
    //this.db.firestore.collection('csUsers').doc(key).get()
  }

  async getCsUsers(tripKey){
    return await  this.getTripEnrolments(tripKey).then((dbPromises)=>{
      Promise.all(dbPromises).then((docs) => {
          let item = docs.map(doc => doc.data());
        });
    });
  }

  getTest(tripKey){
    let csUsers = [];
    var tripsEnrolmentsSnapshot2 = this.db.collection('trips_enrolments').doc(tripKey);
    tripsEnrolmentsSnapshot2.ref.get().then(res => {
      let data = res.data();
      for (const key in data) {
        this.db.collection('csUsers').doc(key).ref.get().then(csUser => {
          let user = csUser.data();
          user.contact = data[key];
          csUsers.push(user);;
        })
      }
      //return csUsers;
    });
    return of(csUsers);
  }

  deleteCsUser(idTrip, idCsUser) {
    return this.db.collection('trips_enrolments').doc(idTrip).update({
      [idCsUser]: firebase.firestore.FieldValue.delete()
  });
  }

  getAllCsUsers(){
    return this.db.collection('csUsers').snapshotChanges();
  }


  addCsUserToTrip(idTrip, idCsUser) {
    return this.db.collection('trips_enrolments').doc(idTrip).update({
      [idCsUser]: false
  });
  }

  updateContactCsUser(idtrip, idCsUser) {
    return this.db.collection('trips_enrolments').doc(idtrip).update({
      [idCsUser.id]: idCsUser.contact
  });
  }

}