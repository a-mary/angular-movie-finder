import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService, User} from '../services/auth.service';
import {Router} from '@angular/router';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.scss']
})
export class AuthModalComponent implements OnInit {

  @Input() error: string | null;
  @Output() submitEM = new EventEmitter();



  submitted = false;
  form: FormGroup;
  // = new FormGroup({
  //   username: new FormControl(''),
  //   password: new FormControl(''),
  // });


  constructor(public auth: AuthService, private  router: Router,  private dialogRef: MatDialogRef<AuthModalComponent>) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      username: new FormControl(null, [
        Validators.required
      ]),
      password: new FormControl(null,
        [
          Validators.required,
          Validators.minLength(6)
        ])
    })
  }

  submit() {
    console.log(this.form)
    if (this.form.invalid)
      return

    this.submitted = true;

    const user: User = {
      email: this.form.value.username,
      password: this.form.value.password,
      // returnSecureToken: true

    }

    this.auth.signIn(user.email, user.password);
    // this.auth.loginUsingApi(user).subscribe(() => {
    //   console.log(user)
      // this.form.reset()
      // this.router.navigate(['genres', 'Action']);
      // this.submitted = false
    // })

    // this.auth.login(user.email, user.password).subscribe(() => {
    //   this.form.reset()
    //   this.router.navigate(['genres', 'Action']);
    //   this.submitted = false
    // })


    // if (this.form.valid) {
    //   this.submitEM.emit(this.form.value);
  }



  googleSignIn() {
    this.auth.googleSignIn();
    // if (this.auth.user$)

  }


  // getErrorMessage() {
  //   if (this.form)
  // }
}
