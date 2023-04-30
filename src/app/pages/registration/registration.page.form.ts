import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class RegistrationPageForm{

  private formBuilder: FormBuilder;

  constructor(formBuilder: FormBuilder){
     this.formBuilder = formBuilder;
  }

  createForm(): FormGroup{
    return this.formBuilder.group({
       login: ['', [Validators.required]] ,
       password: ['',[Validators.required]]
    });
  }

}
