import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserSignup } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  userSignupForm: any = this.fb.group({
    userName: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]*$')]],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

  signup() {
    this.userSignupForm.markAllAsTouched();
    if (this.userSignupForm.valid) {
      const user: UserSignup = this.userSignupForm.value as UserSignup;
      this.userService.signup(user).subscribe(
        (data: any) => { this.router.navigateByUrl("/login") },
        (err: any) => { console.error(err); }
      )
    }
  }
}
