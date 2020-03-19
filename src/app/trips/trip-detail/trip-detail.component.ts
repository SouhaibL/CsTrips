import { Component, OnInit, Input } from '@angular/core';
import { Trip } from 'src/app/trips/models/trip.model';
import { Router } from '@angular/router';
import { FireBaseTripsService } from 'src/app/services/firebase-trips.service';

@Component({
  selector: 'app-trip-detail',
  templateUrl: './trip-detail.component.html',
  styleUrls: ['./trip-detail.component.scss']
})
export class TripDetailComponent implements OnInit {

  @Input() trip;
  activeToggle:boolean;

  
  ngOnInit() {
    this.activeToggle = this.trip.payload.doc.data().active;
  }

  constructor(
    public fireBaseTripsService: FireBaseTripsService,
    private router: Router,
  ) {
    
   }

  modifyTrip(){
    this.router.navigate(['/details-trip/'+ this.trip.payload.doc.id]);
  }

  deleteTrip(){
    this.fireBaseTripsService.deleteTrip(this.trip.payload.doc.id);
  }

  updateState(){
    this.fireBaseTripsService.updateTripState(this.trip.payload.doc.id, this.activeToggle);
  }

}
