import { Injectable } from '@angular/core';

import { Platform } from '@ionic/angular';
import { Users } from './users';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})

export class DbService{
  usersList = new BehaviorSubject([]);
  private storage: SQLiteObject;
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private platform: Platform,
    private sqlite: SQLite,
    private httpClient: HttpClient,
    private sqlPorter: SQLitePorter,
  ) {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'notes.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
          this.storage = db;
          this.getFakeData();
      });
    });
  }

  dbState() {
    return this.isDbReady.asObservable();
  }

  fetchUsers(): Observable<Users[]> {
    return this.usersList.asObservable();
  }

  getFakeData() {
    this.httpClient.get(
      'assets/notes.sql',
      {responseType: 'text'}
    ).subscribe(data => {
      this.sqlPorter.importSqlToDb(this.storage, data)
        .then(_ => {
          this.getUsers();
          this.isDbReady.next(true);
        })
        .catch(error => console.error(error));
    });
  }

   getUsers(){
    return this.storage.executeSql('SELECT * FROM users', []).then(res => {
      const items: Users[] = [];
      if (res.rows.length > 0) {
        for (let i = 0; i < res.rows.length; i++) {
          items.push({
            id: res.rows.item(i).id,
            login: res.rows.item(i).login,
            password: res.rows.item(i).password
           });
        }
      }
      this.usersList.next(items);
    });
  }

    addUser(login, password) {
      const data = [login, password];
      return this.storage.executeSql('INSERT INTO users (login, password) VALUES (?, ?)', data)
      .then(res => {
        this.getUsers();
      });
    }

    getUser(login, password) {
      const data = [login, password];
      return this.storage.executeSql('SELECT id from users where login = ? and password = ? ', data).
      then(res => {
        const id = res.rows.item(0);
        return id;
      });
    }

    updateUser(id, user: Users){
      const data = [user.login, user.password];
      return this.storage.executeSql(`UPDATE users SET login = ?, passsword = ? WHERE id = ${id}`, data)
      .then(res => {
        this.getUsers();
      });
    }

    deleteUser(id) {
      return this.storage.executeSql('DELETE FROM users WHERE id = ?', [id])
      .then(_ => {
        this.getUsers();
      });
    }
 }

