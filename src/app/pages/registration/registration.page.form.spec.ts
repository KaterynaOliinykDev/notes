import { FormBuilder, FormGroup } from '@angular/forms';
import { RegistrationPageForm } from './registration.page.form';

describe('RegistrationPageForm', () => {

  let registrationPageFrom: RegistrationPageForm;
  let form: FormGroup;

  beforeEach(() => {
    registrationPageFrom = new RegistrationPageForm(new FormBuilder());
    form = registrationPageFrom.createForm();
  });

 it('should create login form emply', () => {
  expect(form).not.toBeNull();
  expect(form.get('login')).not.toBeNull();
  expect(form.get('login').value).toEqual('');
  expect(form.get('login').valid).toBeFalsy();
  expect(form.get('password')).not.toBeNull();
  expect(form.get('password').value).toEqual('');
  expect(form.get('password').valid).toBeFalsy();
 });

 it('should have login invalid if login is not valid', () => {
    form.get('login').setValue('invalid login');
    expect(form.get('login').valid).toBeFalsy();
 });

 it('should have login invalid if login is valid', () => {
  expect(form.get('login').valid).toBeTruthy();
});

it('should have a valid form', () => {
  expect(form.valid).toBeTruthy();
});

});
