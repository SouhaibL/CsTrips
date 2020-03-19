import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FireBaseCsUsersService } from 'src/app/services/firebase-cs-users.service';

@Component({
  selector: 'app-cs-dialog',
  templateUrl: './cs-dialog.component.html',
  styleUrls: ['./cs-dialog.component.scss']
})
export class CsDialogComponent implements OnInit {

  users: Array<any> = new Array<any>();

  constructor(
    public dialogRef: MatDialogRef<CsDialogComponent>,
    public fireBaseCsUsersService: FireBaseCsUsersService
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.fireBaseCsUsersService.getAllCsUsers()
    .subscribe(result => this.users = result);
  }

  close(user){
    this.dialogRef.close(user);
  }

}
