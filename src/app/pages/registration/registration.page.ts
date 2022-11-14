import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { DbService } from '../../services/db.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  registrationForm: FormGroup;
  data: any[] = [];

  constructor(
    private db: DbService,
    public formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.db.dbState().subscribe((res) => {
      if(res){
        this.db.fetchUsers().subscribe(item => {
          this.data = item;
        });
      }
    });
    this.registrationForm = this.formBuilder.group({
      login: [''],
      password: ['']
    });
  }

  storeData() {
    this.db.addUser(
      this.registrationForm.value.login,
      this.registrationForm.value.password
    ).then((res) => {
      this.registrationForm.reset();
    });
  };

}
