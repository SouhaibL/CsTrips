import { Component, OnInit, Input } from '@angular/core';
import { FireBaseCsUsersService } from 'src/app/services/firebase-cs-users.service';
import { MatDialog } from '@angular/material/dialog';
import { CsDialogComponent } from './cs-dialog/cs-dialog.component';

@Component({
  selector: 'app-cs-users',
  templateUrl: './cs-users.component.html',
  styleUrls: ['./cs-users.component.scss']
})
export class CsUsersComponent implements OnInit {

  @Input() idtrip: String;
  
  csUsers: any[];
  constructor(public fireBaseCsUsersService : FireBaseCsUsersService,
    public dialog: MatDialog,) { 
  }

  ngOnInit(): void {
    this.fireBaseCsUsersService.getTest(this.idtrip).pipe().subscribe(res => {
      this.csUsers = res;
    });
  }

  delete(idCsUser, position) {
    this.fireBaseCsUsersService.deleteCsUser(this.idtrip, idCsUser) ; 
    this.csUsers.splice(position, 1);
  }


  openDialog() {
    const dialogRef = this.dialog.open(CsDialogComponent, {
      height: '400px',
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.fireBaseCsUsersService.addCsUserToTrip(this.idtrip, result.id);
        this.csUsers.push(result);
      }
    });
  }


  updateContact(position){
    this.fireBaseCsUsersService.updateContactCsUser(this.idtrip, this.csUsers[position]) ; 
  }

}
