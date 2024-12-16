import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignupComponent } from './signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignupComponent],
      imports: [ReactiveFormsModule, RouterTestingModule]
    });
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a valid form when all fields are filled correctly', () => {
    component.signUpForm.controls['username'].setValue('testuser');
    component.signUpForm.controls['password'].setValue('testpassword');
    expect(component.signUpForm.valid).toBeTrue();
  });

  it('should have an invalid form when fields are empty', () => {
    component.signUpForm.controls['username'].setValue('');
    component.signUpForm.controls['password'].setValue('');
    expect(component.signUpForm.invalid).toBeTrue();
  });

  it('should navigate to /home on successful form submission', () => {
    spyOn(router, 'navigateByUrl');
    component.signUpForm.controls['username'].setValue('testuser');
    component.signUpForm.controls['password'].setValue('testpassword');
    component.onSubmit();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/home');
  });

  it('should set localStorage item on successful form submission', () => {
    spyOn(localStorage, 'setItem');
    component.signUpForm.controls['username'].setValue('testuser');
    component.signUpForm.controls['password'].setValue('testpassword');
    component.onSubmit();
    expect(localStorage.setItem).toHaveBeenCalledWith('loggedIn-user', 'true');
  });

  it('should log an error on invalid form submission', () => {
    spyOn(console, 'error');
    component.signUpForm.controls['username'].setValue('');
    component.signUpForm.controls['password'].setValue('');
    component.onSubmit();
    expect(console.error).toHaveBeenCalledWith('Form is invalid');
  });
});