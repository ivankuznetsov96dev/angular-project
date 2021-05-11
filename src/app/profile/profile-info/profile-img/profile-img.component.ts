import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../../dialog/dialog.component';

@Component({
  selector: 'app-profile-img',
  templateUrl: './profile-img.component.html',
  styleUrls: ['./profile-img.component.scss'],
})
export class ProfileImgComponent implements OnInit {
  @Input() userImg: string;

  constructor() {}

  ngOnInit(): void {
    console.log(this.userImg);
  }
}
