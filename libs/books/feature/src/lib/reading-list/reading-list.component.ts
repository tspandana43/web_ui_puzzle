import {
  addToReadingList,
  getReadingList,
  removeFromReadingList,
} from '@tmo/books/data-access';

import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss'],
})
export class ReadingListComponent {
  readingList$ = this.store.select(getReadingList);

  constructor(private readonly store: Store, private snackBar: MatSnackBar) {}

  removeFromReadingList(item) {
    this.store.dispatch(removeFromReadingList({ item }));
    const snack = this.snackBar.open(item.title + ' Removed ', 'Undo?', {
      duration: 4000,
      horizontalPosition: 'center',
    });
    snack.onAction().subscribe(() => {
      const bookData = { ...item, bookId: item.id };
      return this.store.dispatch(addToReadingList({ book: bookData }));
    });
  }
}