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
    // const  url = 'https://api.github.com/search/users?q=';
    this.firestore.collection('testbase').valueChanges().subscribe(value=> console.log(value))
  }
}
