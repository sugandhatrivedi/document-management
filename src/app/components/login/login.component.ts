import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedUtilsService } from 'src/app/services/shared-utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private sharedService: SharedUtilsService,public router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.sharedService.userLogin = true;
      localStorage.setItem('loggedIn-user', true.toString())
      this.router.navigateByUrl('/home');
    }
  }

  openSignup() {
    this.router.navigateByUrl('/signup')
  }
}

