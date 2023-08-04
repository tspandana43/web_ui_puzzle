import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { BooksFeatureModule } from '@tmo/books/feature';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReadingListComponent } from './reading-list.component';
import { ReadingListItem } from '@tmo/shared/models';
import { SharedTestingModule } from '@tmo/shared/testing';
import { removeFromReadingList } from '@tmo/books/data-access';

describe('ReadingListComponent', () => {
  let component: ReadingListComponent;
  let fixture: ComponentFixture<ReadingListComponent>;
  let book: ReadingListItem;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BooksFeatureModule,
        SharedTestingModule,
        BrowserAnimationsModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    book = {
      bookId: '9U5I_1234',
      title: 'Javascript',
      authors: ['Marijn Haverbeke'],
      description: 'Javascript',
    };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispacth removeFromReadingList action when removeFromReadingList called', () => {
    const spy = spyOn(component['store'], 'dispatch');
    component.removeFromReadingList(book);
    expect(spy).toHaveBeenCalledWith(
      removeFromReadingList({
        item: book,
      })
    );
  });
});
