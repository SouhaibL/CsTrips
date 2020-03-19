import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FireBaseTripsService } from 'src/app/services/firebase-trips.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';  
import { CsDialogComponent } from './cs-users/cs-dialog/cs-dialog.component';

@Component({
  selector: 'app-new-trip',
  templateUrl: './new-trip.component.html',
  styleUrls: ['./new-trip.component.scss']
})
export class NewTripComponent implements OnInit {
  public Editor = ClassicEditor;  
  editorConfig = {
    placeholder: 'Type here..',
  };

  exampleForm: FormGroup;

  validation_messages = {
   'title': [
     { type: 'required', message: 'title is required.' }
   ],
   'date': [
     { type: 'required', message: 'date is required.' }
  ]
 };

 activeToggle:boolean = true;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    public firebaseService: FireBaseTripsService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.exampleForm = this.fb.group({
      title: ['', Validators.required ],
      date:  ['', Validators.required ],
      description: [''],
      active: ['']
    });
  }

  resetFields(){
    this.exampleForm = this.fb.group({
      title: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),

    });
  }

  onSubmit(value){  
    this.firebaseService.createTrip(value)
    .then(
      res => {
        this.resetFields();
        this.router.navigate(['/trips']);
      }
    )
  }

  openDialog() {
    const dialogRef = this.dialog.open(CsDialogComponent, {
      height: '400px',
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
       console.log("msg from dialog "+ result);
      }
    });
  }

}

