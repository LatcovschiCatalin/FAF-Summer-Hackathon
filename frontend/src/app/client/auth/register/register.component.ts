import {Component, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {phoneNumberRegex, validationMessages} from "../../constants";
import {AuthService} from "../auth.service";
import {MatTabChangeEvent} from "@angular/material/tabs";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent {

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
    phone: {
      type: 'pattern',
      args: phoneNumberRegex,
      message: validationMessages.invalidPhone
    },
  }

  formData = [
    {
      title: 'Name',
      key: 'name',
      type: 'text',
      default: '',
      validators: [this.validators.required]
    },
    {
      title: 'Surname',
      key: 'surname',
      type: 'text',
      default: '',
      validators: [this.validators.required]
    },
    {
      title: 'Email',
      key: 'email',
      type: 'text',
      default: '',
      validators: [this.validators.required, this.validators.email]
    },
    {
      title: 'Phone',
      key: 'phone',
      type: 'text',
      default: '',
      validators: [this.validators.required, this.validators.phone]
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
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(phoneNumberRegex)]],
      password: ['', Validators.required],
    });
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.tab = tabChangeEvent.tab.textLabel.toLowerCase();
  }

  register() {
    const user = this.customForm.value;
    if (this.customForm.invalid) {
      this.customForm.markAllAsTouched();
      return false;
    } else {
      this.authService.register({...user, "jobs": []}, this.tab);
    }
    return user;
  }

}
