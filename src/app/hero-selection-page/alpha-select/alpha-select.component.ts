import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CHARCODE_OF_A, CHARCODE_OF_Z } from 'src/app/consts';

@Component({
  selector: 'app-alpha-select',
  templateUrl: './alpha-select.component.html',
  styleUrls: ['./alpha-select.component.scss']
})
export class AlphaSelectComponent implements OnInit {
  isHidden = true;
  searchLetter: string = 'A';
  alphabet: string[] = [];
  @Output() onSearchByLetter = new EventEmitter<string>();

  constructor() {
    for (let i = CHARCODE_OF_A; i <= CHARCODE_OF_Z; i++) {
      this.alphabet.push(String.fromCharCode(i));
    }
  }

  ngOnInit(): void {
  }

  toggleAlphaButtons() {
    this.isHidden = !this.isHidden;
  }

  searchByLetter(letter: string) {
    this.onSearchByLetter.emit(letter);
    this.searchLetter = letter;
    this.toggleAlphaButtons();
  }
}
