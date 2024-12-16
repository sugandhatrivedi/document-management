import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserManagementComponent } from './user-management.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedUtilsService } from '../../services/shared-utils.service';

describe('UserManagementComponent', () => {
  let component: UserManagementComponent;
  let fixture: ComponentFixture<UserManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserManagementComponent],
      imports: [ReactiveFormsModule],
      providers: [SharedUtilsService]
    });
    fixture = TestBed.createComponent(UserManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set isLogin based on localStorage', () => {
    localStorage.setItem('loggedIn-user', 'true');
    component.ngOnInit();
    expect(component.isLogin).toBeTrue();

    localStorage.setItem('loggedIn-user', 'false');
    component.ngOnInit();
    expect(component.isLogin).toBeFalse();
  });

  it('should have a valid form when all fields are filled correctly', () => {
    component.roleForm.controls['role'].setValue('Admin');
    component.roleForm.controls['user'].setValue('John Doe');
    expect(component.roleForm.valid).toBeTrue();
  });

  it('should have an invalid form when fields are empty', () => {
    component.roleForm.controls['role'].setValue('');
    component.roleForm.controls['user'].setValue('');
    expect(component.roleForm.invalid).toBeTrue();
  });

  it('should add a role to roles array on valid form submission', () => {
    component.roleForm.controls['role'].setValue('Admin');
    component.roleForm.controls['user'].setValue('John Doe');
    component.addRole();
    expect(component.roles.length).toBe(3);
    expect(component.roles[2]).toEqual({ role: 'Admin', userName: 'John Doe' });
  });

  it('should reset the form on valid form submission', () => {
    component.roleForm.controls['role'].setValue('Admin');
    component.roleForm.controls['user'].setValue('John Doe');
    component.addRole();
    expect(component.roleForm.value).toEqual({ role: '', user: '' });
  });
});