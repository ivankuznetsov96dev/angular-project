import {Component, DoCheck, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../services/auth/auth.service";
import {AngularFirestore} from "@angular/fire/firestore";
import {CrudService} from "../services/crud.service";
import {FormBuilder} from "@angular/forms";
import {UploadService} from "../services/upload.service";
import {StorageService} from "../services/storage.service";
import {Post} from "../services/interfaces/post.model";

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

export class FeedComponent implements OnInit, DoCheck {

  constructor(
    private router: Router,
    private authService: AuthService,
    private firestore: AngularFirestore,
    private crudService: CrudService,
    private fb: FormBuilder,
    private uploadService: UploadService,
    private storageService: StorageService,
  ) { }

  public counterObj;
  public counterUserPosts;
  public filtredObj: Post[];

  ngOnInit(): void {
    // this.crudService.getObjectByRef('users', localStorage.getItem('userLoginID')).subscribe(value => {
    //   this.counterUserPosts = value['user_posts'];
    //   console.log(this.counterUserPosts);
    // });

    this.filtrPipe();

    this.crudService.handleData('posts').subscribe(value => {
      this.counterObj = value;
      console.log(value);
      console.log(this.counterObj);
      this.filtrPipe();
    });
  }

  ngDoCheck(): void {
    this.postsFilter();
  }

  public filtrPipe() {
    this.crudService.getObjectByRef('users', localStorage.getItem('userLoginID')).subscribe(value => {
      this.counterUserPosts = value['user_posts'];
      console.log(this.counterUserPosts);
    });
  }

  public postsFilter() {
    this.filtredObj = this.counterObj.filter(element => this.counterUserPosts.includes(element['id']))
    // console.log(this.filtredObj)
  }

  public trackFunction(index, item): string {
    return item.id;
  }

}
