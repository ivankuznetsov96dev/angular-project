import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-project';

  constructor(private firestore: AngularFirestore) {
  }

  ngOnInit(): void {
    this.firestore.collection('testbase').valueChanges().subscribe(value=> console.log(value))
  }
}
