import { Injectable } from '@angular/core';

import * as firebase from 'firebase';
import 'firebase/firestore';

import { AngularFirestore } from '@angular/fire/firestore';
import { Trip } from '../trips/models/trip.model';

@Injectable({
  providedIn: 'root'
})
export class FireBaseTripsService {

  constructor(public db: AngularFirestore) { }
  

  getTrip(tripKey) {
    return this.db.collection('trips').doc(tripKey).snapshotChanges();
  }

  updateTrip(tripKey, value) {
    return this.db.collection('trips').doc(tripKey).set(value);
  }

  deleteTrip(tripKey) {
    this.db.collection('trips_enrolments').doc(tripKey).delete()
    return this.db.collection('trips').doc(tripKey).delete();
  }

  getTrips() {
    return this.db.collection('trips').snapshotChanges();
  }

  searchTrips(searchValue) {
    return this.db.collection('trips', ref => ref.where('title', '>=', searchValue)
      .where('title', '<=', searchValue + '\uf8ff'))
      .snapshotChanges()
  }

  createTrip(value: Trip) {
    return this.db.collection('trips').add(value);
  }

  updateTripState(tripKey, value) {
    return this.db.collection('trips').doc(tripKey).set({ active: value }, { merge: true });
  }

}
