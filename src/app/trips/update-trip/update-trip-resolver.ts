import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, ActivatedRoute } from "@angular/router";
import { FireBaseTripsService } from 'src/app/services/firebase-trips.service';

@Injectable()
export class UpdateTripResolver implements Resolve<any> {

  constructor(public firebaseService: FireBaseTripsService) { }

  resolve(route: ActivatedRouteSnapshot) {

    return new Promise((resolve, reject) => {
      let tripId = route.paramMap.get('id');
      this.firebaseService.getTrip(tripId)
      .subscribe(
        data => {
          resolve(data);
        }
      );
    })
  }
}
