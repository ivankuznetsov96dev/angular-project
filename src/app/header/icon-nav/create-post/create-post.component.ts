import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { combineLatest } from 'rxjs';
import { takeWhile, tap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { UploadService } from '../../../services/upload.service';
import { CrudService } from '../../../services/crud.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnInit {
  public createNewPostReactiveForm: FormGroup;

  public progress;

  public imageLink;

  public imageFlag: boolean;

  public user_postsCounter: string[];

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private uploadService: UploadService,
    private firestore: AngularFirestore,
    private crudService: CrudService,
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  public closeDialog(): void {
    if (this.imageLink) {
      this.uploadService.deleteFile(this.imageLink).subscribe();
    }
    this.dialog.closeAll();
  }

  onSubmit() {
    if (!this.imageLink) {
      this.imageFlag = false;
      return;
    }
    const { controls } = this.createNewPostReactiveForm;
    if (this.createNewPostReactiveForm.invalid) {
      Object.keys(controls).forEach((controlName) => controls[controlName].markAsTouched());
      return;
    }
    // console.log(this.createNewPostReactiveForm.value);
    this.crudService
      .getObjectByRef('users', localStorage.getItem('userLoginID'))
      .subscribe((value) => {
        this.user_postsCounter = value.user_posts;
        this.postCreater();
      });

    this.dialog.closeAll();
  }

  public postCreater(): void {
    this.crudService
      .createEntity('posts', {
        ...this.createNewPostReactiveForm.value,
        imageLink: this.imageLink,
        userPostCreater: localStorage.getItem('userLoginID'),
        likes: {},
      })
      .subscribe((value) => {
        this.user_postsCounter.push(value);
        this.crudService.updateObject('users', localStorage.getItem('userLoginID'), {
          user_posts: this.user_postsCounter,
        });
        this.user_postsCounter = null;
      });
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.createNewPostReactiveForm.controls[controlName];
    const result = control.invalid && control.touched;
    return result;
  }

  private initForm() {
    this.createNewPostReactiveForm = this.fb.group({
      peoplesID: ['', [Validators.pattern(/^[A-z @_.-]+$/)]],
      postTags: ['', [Validators.required, Validators.pattern(/^[A-z #_.-]+$/)]],
    });
  }

  public onFileSelected(event): void {
    this.progress = true;
    const file = event.target.files[0];
    combineLatest(this.uploadService.uploadFile('test', file))
      .pipe(
        tap(([percent, link]) => {
          this.progress = percent.toString();
          // console.log(link);
          this.imageLink = link;
          this.imageFlag = true;
        }),
        takeWhile(([percent, link]) => !link),
      )
      .subscribe();
  }
}
