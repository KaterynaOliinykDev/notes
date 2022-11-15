import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { DbService } from '../../services/db.service';
import { RegistrationPageForm } from './registration.page.form';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  form: FormGroup;
  data: any[] = [];

  constructor(
    private db: DbService,
    public formBuilder: FormBuilder,
  ) { }

  ngOnInit() {

    this.form = new RegistrationPageForm(this.formBuilder).createForm();

    this.db.dbState().subscribe((res) => {
      if(res){
        this.db.fetchUsers().subscribe(item => {
          this.data = item;
        });
      }
    });
  }

  storeData() {
    this.db.addUser(
      this.form.value.login,
      this.form.value.password
    ).then((res) => {
      this.form.reset();
    });
  };

}
