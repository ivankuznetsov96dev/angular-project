import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, pipe } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormInfoChangerDialogComponent } from './form-info-changer-dialog/form-info-changer-dialog.component';
import { CrudService } from '../../services/crud.service';
import { User } from '../../services/interfaces/user.model';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss'],
})
export class ProfileInfoComponent implements OnInit {
  public userInfo: User;

  constructor(
    private dialog: MatDialog,
    private crudService: CrudService,
    private firestoreService: AngularFirestore,
  ) {}

  public openDialog(): void {
    this.dialog.open(FormInfoChangerDialogComponent);
  }

  ngOnInit(): void {
    this.crudService
      .getObjectByRef('users', localStorage.getItem('userLoginID'))
      .subscribe((value) => {
        this.userInfo = value;
        console.log(this.userInfo);
      });

    // this.crudService.getObjectByRef('users', localStorage.getItem('userLoginID')).subscribe(value => console.log(value))
    // console.log(this.crudService.getObjectByRef('users', localStorage.getItem('userLoginID')).subscribe(value => console.log(value)) !== undefined)

    // this.crudService.getObjectByRef('users', 'nevi.kiv@gmail.com').subscribe(value => console.log(value))
  }
}
