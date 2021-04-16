import {Component, OnInit, DoCheck, ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth/auth.service";
import {AngularFirestore} from "@angular/fire/firestore";
import {CrudService} from "../../services/crud.service";
import {FormBuilder} from "@angular/forms";
import {UploadService} from "../../services/upload.service";
import {StorageService} from "../../services/storage.service";

@Component({
  selector: 'app-posts-pool',
  templateUrl: './posts-pool.component.html',
  styleUrls: ['./posts-pool.component.scss']
})
export class PostsPoolComponent implements OnInit, DoCheck {

  public counterObj;
  public counterUserPosts;
  public filtredObj;

  constructor(
    private router: Router,
    private authService: AuthService,
    private firestore: AngularFirestore,
    private crudService: CrudService,
    private fb: FormBuilder,
    private uploadService: UploadService,
    private storageService: StorageService,
  ) { }

  ngOnInit(): void {
    this.crudService.getObjectByRef('users', localStorage.getItem('userLoginID')).subscribe(value => {
      this.counterUserPosts = value['user_posts'];
      console.log(this.counterUserPosts);
    });

    this.crudService.handleData('posts').subscribe(value => {
      this.counterObj = value;
      console.log(value);
      console.log(this.counterObj);
    });
  }

  ngDoCheck(): void {
    this.postsFilter();
  }

  public postsFilter() {
    this.filtredObj = this.counterObj.filter(element => this.counterUserPosts.includes(element['id']))
    console.log(this.filtredObj)
  }

  public trackFunction(index, item): string {
    return item.id;
  }

}
