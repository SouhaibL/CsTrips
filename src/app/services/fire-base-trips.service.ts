import { Injectable } from '@angular/core';

import * as firebase from 'firebase';
import 'firebase/firestore';

import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FireBaseTripsService {

  constructor(public db: AngularFirestore) { }

  getTrip(tripKey) {
    return this.db.collection('trips').doc(tripKey).snapshotChanges();
  }

  updateTrip(tripKey, value) {
    value.nameToSearch = value.name.toLowerCase();
    return this.db.collection('trips').doc(tripKey).set(value);
  }

  deleteTrip(tripKey) {
    return this.db.collection('trips').doc(tripKey).delete();
  }

  getTrips() {
    //return this.db.collection('/avatar').valueChanges()
    return this.db.collection('trips').snapshotChanges();
  }

  searchTrips(searchValue) {
    return this.db.collection('Trips', ref => ref.where('nameToSearch', '>=', searchValue)
      .where('nameToSearch', '<=', searchValue + '\uf8ff'))
      .snapshotChanges()
  }

  searchTripsByAge(value) {
    return this.db.collection('Trips', ref => ref.orderBy('age').startAt(value)).snapshotChanges();
  }


  createTrip(value, avatar) {
    return this.db.collection('Trips').add({
      name: value.name,
      nameToSearch: value.name.toLowerCase(),
      surname: value.surname,
      age: parseInt(value.age),
      avatar: avatar
    });
  }
}
