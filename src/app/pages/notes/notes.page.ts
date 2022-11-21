import { Component, OnInit } from '@angular/core';
import { SortPipe } from '../../sort.pipe';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.page.html',
  styleUrls: ['./notes.page.scss'],
})
export class NotesPage implements OnInit {
  notes = [
    {name:'Note 4'},
    {name:'Note 2'},
    {name:'Note 3'},
    {name:'Note 1'}
  ];

  public results = [...this.notes];
  buttonClicked = false;
  isUp = true;
  iconName = 'arrow-up-outline';

  constructor(private sortPipe: SortPipe) { }

  ngOnInit() {
    this.results = this.sortPipe.transform(this.results, 'asc', 'name');
  }

  handleChange(event) {
    const query = event.target.value.toLowerCase();
    this.results = this.notes.filter(d => d.name.toLowerCase().indexOf(query) > -1);
  }

  sortNotesByName(notes){
    this.isUp = !this.isUp;
    this.iconName = this.isUp ? 'arrow-up-outline' : 'arrow-down-outline';
    this.results = this.sortPipe.transform(notes, this.isUp ? 'asc' : 'desc', 'name');
  }

}
