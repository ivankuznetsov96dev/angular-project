import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../services/auth/auth.service";
import {AngularFirestore} from "@angular/fire/firestore";
import {CrudService} from "../services/crud.service";
import {FormBuilder} from "@angular/forms";
import {UploadService} from "../services/upload.service";
import {StorageService} from "../services/storage.service";

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})

// export interface postsFeed {
//   posts: postElement[];
// }
//
// export interface postElement {
//   id: string;
//   imageLink: string;
//   peoplesID: string;
//   postTags: string;
// }

export class FeedComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
    private firestore: AngularFirestore,
    private crudService: CrudService,
    private fb: FormBuilder,
    private uploadService: UploadService,
    private storageService: StorageService,
  ) { }

  // public counterObj: postsFeed;
  public counterObj;

  ngOnInit(): void {
    this.crudService.handleData('posts').subscribe(value => {
      this.counterObj = value;
      // console.log(value);
      console.log(this.counterObj);
    });
  }

  public trackFunction(index, item): string {
    return item.id;
  }

}
