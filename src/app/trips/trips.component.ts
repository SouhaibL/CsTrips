import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Router, Params } from '@angular/router';
import { FireBaseTripsService } from '../services/firebase-trips.service';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.scss']
})


export class TripsComponent implements OnInit {

  searchValue: string = "";
  trips: Array<any>;
  age_filtered_trips: Array<any>;
  name_filtered_trips: Array<any>;

  constructor(
    public fireBaseTripsService: FireBaseTripsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.fireBaseTripsService.getTrips()
    .subscribe(result => {
      this.trips = result;
      this.age_filtered_trips = result;
      this.name_filtered_trips = result;
    })
  }


  capitalizeFirstLetter(value){
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  searchByTitle(){
    let value = this.searchValue;
    this.fireBaseTripsService.searchTrips(value)
    .subscribe(result => {
      this.name_filtered_trips = result;
      this.trips = this.combineLists(result, this.age_filtered_trips);
    })
  }


  combineLists(a, b){
    let result = [];

    a.filter(x => {
      return b.filter(x2 =>{
        if(x2.payload.doc.id == x.payload.doc.id){
          result.push(x2);
        }
      });
    });
    return result;
  }

}
