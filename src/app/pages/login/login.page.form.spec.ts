import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginPageForm } from './login.page.form';

describe('LoginPageForm', () => {

  let loginPageFrom: LoginPageForm;
  let form: FormGroup;

  beforeEach(() => {
    loginPageFrom = new LoginPageForm(new FormBuilder());
    form = loginPageFrom.createForm();
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
