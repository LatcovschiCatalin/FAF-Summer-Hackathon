import {Component, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {validationMessages} from "../../constants";
import {MatTabChangeEvent} from "@angular/material/tabs";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent {
  customForm: FormGroup;
  tabs = ['Student', 'Recruiter'];
  tab = this.tabs[0].toLowerCase();
  validators = {
    required: {
      type: 'required',
      message: validationMessages.requiredField
    },
    email: {
      type: 'email',
      message: validationMessages.email
    },
  }

  formData = [
    {
      title: 'Email',
      key: 'email',
      type: 'text',
      default: '',
      validators: [this.validators.required, this.validators.email]
    },
    {
      title: 'Password',
      key: 'password',
      type: 'password',
      default: '',
      validators: [this.validators.required]
    },

  ]

  constructor(private fb: FormBuilder,
              private authService: AuthService) {

    this.customForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.tab = tabChangeEvent.tab.textLabel.toLowerCase();
  }

  login() {
    const user = this.customForm.value;

    if (this.customForm.invalid) {
      this.customForm.markAllAsTouched();
      return false;
    } else {
      this.authService.login({...user, "jobs": []}, this.tab);
    }
    return user;
  }
}

