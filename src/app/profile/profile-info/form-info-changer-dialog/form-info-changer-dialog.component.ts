import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-form-info-changer-dialog',
  templateUrl: './form-info-changer-dialog.component.html',
  styleUrls: ['./form-info-changer-dialog.component.scss'],
})
export class FormInfoChangerDialogComponent implements OnInit {
  myFirstReactiveForm: FormGroup;

  constructor(private fb: FormBuilder, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.initForm();
  }

  public closeDialog(): void {
    this.dialog.closeAll();
  }

  onSubmit() {
    const { controls } = this.myFirstReactiveForm;
    if (this.myFirstReactiveForm.invalid) {
      Object.keys(controls).forEach((controlName) => controls[controlName].markAsTouched());
      return;
    }
    console.log(this.myFirstReactiveForm.value);
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.myFirstReactiveForm.controls[controlName];
    const result = control.invalid && control.touched;
    return result;
  }

  private initForm() {
    this.myFirstReactiveForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/[А-яA-z]/)]],
      userTag: ['', [Validators.required, Validators.pattern(/^[A-z _.-]+$/)]],
      userInfo: [
        '',
        [
          // Validators.pattern(/^[A-z _.-]+$/)
        ],
      ],
    });
  }
}
