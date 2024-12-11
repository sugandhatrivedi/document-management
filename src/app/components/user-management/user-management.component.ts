import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedUtilsService } from 'src/app/services/shared-utils.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent {
  isLogin: boolean = false;
  roleForm: FormGroup;
  roles: Array<{role: string, userName: string}> = [
    {role: 'Admin', userName: 'John Doe'},
    {role: 'User', userName: 'Jane Doe'},
  ]; 

  constructor(private fb: FormBuilder, private sharedService: SharedUtilsService) {
    this.roleForm = this.fb.group({
      role: ['', Validators.required],
      user: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.isLogin = localStorage.getItem('loggedIn-user') == 'true'? true: false;
  }

  addRole() {
    if (this.roleForm.valid) {
      this.roles.push({role: this.roleForm.value.role, userName: this.roleForm.value.user});
      this.roleForm.reset();
    }
  }

}
