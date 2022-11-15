import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { DbService } from '../../services/db.service';
import { LoginPageForm } from './login.page.form';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form: FormGroup;
  data: any[] = [];

  constructor(
    private db: DbService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {

    this.form = new LoginPageForm(this.formBuilder).createForm();

    this.db.dbState().subscribe((res) => {
      if(res){
        this.db.fetchUsers().subscribe(item => {
          this.data = item;
        });
      }
    });
  }

  storeData() {
    console.log(this.form.value.login, this.form.value.password);
  };
}
