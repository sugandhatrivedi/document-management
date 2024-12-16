import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, RouterTestingModule]
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a defined loginForm', () => {
    expect(component.loginForm).toBeDefined();
  });

  it('should have a valid form when all fields are filled correctly', () => {
    component.loginForm.controls['username'].setValue('testuser');
    component.loginForm.controls['password'].setValue('testpassword');
    expect(component.loginForm.valid).toBeTrue();
  });

  it('should have an invalid form when fields are empty', () => {
    component.loginForm.controls['username'].setValue('');
    component.loginForm.controls['password'].setValue('');
    expect(component.loginForm.invalid).toBeTrue();
  });

  it('should navigate to /home on successful form submission', () => {
    spyOn(router, 'navigateByUrl');
    component.loginForm.controls['username'].setValue('testuser');
    component.loginForm.controls['password'].setValue('testpassword');
    component.onSubmit();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/home');
  });

  it('should set localStorage item on successful form submission', () => {
    spyOn(localStorage, 'setItem');
    component.loginForm.controls['username'].setValue('testuser');
    component.loginForm.controls['password'].setValue('testpassword');
    component.onSubmit();
    expect(localStorage.setItem).toHaveBeenCalledWith('loggedIn-user', 'true');
  });

  it('should log an error on invalid form submission', () => {
    spyOn(console, 'error');
    component.loginForm.controls['username'].setValue('');
    component.loginForm.controls['password'].setValue('');
    component.onSubmit();
    expect(console.error).toHaveBeenCalledWith('Form is invalid');
  });
});
