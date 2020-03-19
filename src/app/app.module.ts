import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';

import { AppComponent } from './app.component';
import { NewTripComponent } from './trips/new-trip/new-trip.component';


import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { FirebaseService } from './services/firebase.service';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from  '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule  } from '@angular/material/core';
import { CsUsersComponent } from './trips/new-trip/cs-users/cs-users.component';
import { TripsComponent } from './trips/trips.component';
import { TripDetailComponent } from './trips/trip-detail/trip-detail.component';
import { MatCardModule } from '@angular/material/card';
import { UpdateTripComponent } from './trips/update-trip/update-trip.component';
import { UpdateTripResolver } from './trips/update-trip/update-trip-resolver';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { CsDialogComponent } from './trips/new-trip/cs-users/cs-dialog/cs-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    NewTripComponent,
    CsUsersComponent,
    TripsComponent,
    TripDetailComponent,
    UpdateTripComponent,
    CsDialogComponent,
  ],
  entryComponents: [CsDialogComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: false }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatSliderModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    CKEditorModule
  ],
  providers: [FirebaseService, UpdateTripResolver],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
