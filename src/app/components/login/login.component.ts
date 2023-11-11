import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLogin } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  userLoginForm: any = this.fb.group({
    userName: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]*$')]],
    password: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

  login() {
    this.userLoginForm.markAllAsTouched();
    if (this.userLoginForm.valid) {
      const user: UserLogin = this.userLoginForm.value as UserLogin;
      this.userService.login(user).subscribe(
        (data: any) => { localStorage.setItem("token", data.jwt); localStorage.setItem("userName", data.userName); this.router.navigateByUrl("/upload") },
        (err: any) => { console.error(err); }
      )
    }
  }
}
