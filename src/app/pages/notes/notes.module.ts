import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { NotesPageRoutingModule } from './notes-routing.module';

import { NotesPage } from './notes.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    NotesPageRoutingModule
  ],
  declarations: [NotesPage]
})
export class NotesPageModule {}
