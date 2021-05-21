import {Component, Inject, Input, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import { combineLatest } from 'rxjs';
import { takeWhile, tap } from 'rxjs/operators';
import { UploadService } from '../../../services/upload.service';
import { CrudService } from '../../../services/crud.service';

@Component({
  selector: 'app-form-info-changer-dialog',
  templateUrl: './form-info-changer-dialog.component.html',
  styleUrls: ['./form-info-changer-dialog.component.scss'],
})
export class FormInfoChangerDialogComponent implements OnInit {
  userInfoReactiveForm: FormGroup;

  public imageLink;

  public imageFlag: boolean;

  public progress;

  public user_info;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private uploadService: UploadService,
    private crudService: CrudService,
    @Inject(MAT_DIALOG_DATA) public data: any,
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
    const { controls } = this.userInfoReactiveForm;
    if (this.userInfoReactiveForm.invalid) {
      Object.keys(controls).forEach((controlName) => controls[controlName].markAsTouched());
      return;
    }
    console.log(this.userInfoReactiveForm.value);
    // this.crudService
    //   .getObjectByRef('users', localStorage.getItem('userLoginID'))
    //   .subscribe((value) => {
    //     this.user_info = value;
    //     // this.infoUpdate();
    //
    //   });
    if (this.imageLink) {
      this.crudService.updateObject('users', localStorage.getItem('userLoginID'), {
        user_name: this.userInfoReactiveForm.value.name,
        user_info: this.userInfoReactiveForm.value.userInfo,
        user_avatar: this.imageLink,
      });
    } else {
      this.crudService.updateObject('users', localStorage.getItem('userLoginID'), {
        user_name: this.userInfoReactiveForm.value.name,
        user_info: this.userInfoReactiveForm.value.userInfo,
      });
    }
    this.dialog.closeAll();
  }

  public infoUpdate(): void {
    this.crudService.updateObject('users', localStorage.getItem('userLoginID'), {
      user_posts: this.user_info,
    });
    // this.crudService
    //   .createEntity('posts', {
    //     ...this.createNewPostReactiveForm.value,
    //     imageLink: this.imageLink,
    //     userPostCreater: localStorage.getItem('userLoginID'),
    //     likes: {},
    //     comments: [],
    //   })
    //   .subscribe((value) => {
    //     this.user_postsCounter.push(value);
    //     this.crudService.updateObject('users', localStorage.getItem('userLoginID'), {
    //       user_posts: this.user_postsCounter,
    //     });
    //     this.user_postsCounter = null;
    //   });
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.userInfoReactiveForm.controls[controlName];
    const result = control.invalid && control.touched;
    return result;
  }

  private initForm() {
    this.userInfoReactiveForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/[А-яA-z]/)]],
      // userTag: ['', [Validators.required, Validators.pattern(/^[A-z _.-]+$/)]],
      userInfo: [
        '',
        [
          Validators.required,
          // Validators.pattern(/^[A-z _.-]+$/)
        ],
      ],
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
