import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { FireBaseTripsService } from 'src/app/services/firebase-trips.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';  

@Component({
  selector: 'app-update-trip',
  templateUrl: './update-trip.component.html',
  styleUrls: ['./update-trip.component.scss']
})
export class UpdateTripComponent implements OnInit {

  public Editor = ClassicEditor;  
  editorConfig = {
    placeholder: 'Type here..',
  };



  exampleForm: FormGroup;
  item: any;


  validation_messages = {
   'title': [
     { type: 'required', message: 'title is required.' }
   ],
   'date': [
     { type: 'required', message: 'date is required.' }
  ]
 };


  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    public firebaseService: FireBaseTripsService
  ) { }

  ngOnInit() {
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.item = data.payload.data();
        this.item.id = data.payload.id; 
        this.createForm();
      }
    })
  }

  createForm() {
    this.exampleForm = this.fb.group({
      title: [this.item.title || '' , Validators.required ],
      date:  [this.item.date.toDate() || '', Validators.required ],
      description: [this.item.description ||''],
      active: [this.item.active || '']
    });
  }

  resetFields(){
    this.exampleForm = this.fb.group({
      title: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),

    });
  }

  onSubmit(value){
   
    this.firebaseService.updateTrip(this.item.id, value)
    .then(
      res => {
        this.resetFields();
        this.router.navigate(['/trips']);
      }
    )
  }

}

