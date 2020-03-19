import { Routes } from '@angular/router';
import { NewTripComponent } from './trips/new-trip/new-trip.component';
import { TripsComponent } from './trips/trips.component';
import { UpdateTripComponent } from './trips/update-trip/update-trip.component';
import { UpdateTripResolver } from './trips/update-trip/update-trip-resolver';

export const rootRouterConfig: Routes = [
  { path: '', component: TripsComponent },
  { path: 'trips', component: TripsComponent },
  { path: 'new-trip', component: NewTripComponent },
  { path: 'details-trip/:id', component: UpdateTripComponent, resolve:{data : UpdateTripResolver} } 
];
