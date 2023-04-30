import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { $ } from 'protractor';
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
  isError = false;

  constructor(
    private db: DbService,
    private formBuilder: FormBuilder,
    private router: Router,
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
    this.db.getUser(
      this.form.value.login,
      this.form.value.password
    ).then((res) => {
      if(res){
        this.loadProfile(res);
      } else{
        this.form.reset();
      }
    });
  };

  loadProfile(id){
    this.router.navigate(['notes']);
  }
}
