import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { Book } from '@tmo/shared/models';
import { BookSearchComponent } from './book-search.component';
import { BooksFeatureModule } from '../books-feature.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedTestingModule } from '@tmo/shared/testing';
import { addToReadingList } from '@tmo/books/data-access';
import { of } from 'rxjs';

describe('ProductsListComponent', () => {
  let component: BookSearchComponent;
  let fixture: ComponentFixture<BookSearchComponent>;

  let bookDetails: Book;
  const mockMatSnackBar = {
    open: () => {
      return {
        onAction: () => of({}),
      };
    },
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BooksFeatureModule, NoopAnimationsModule, SharedTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    bookDetails = {
      id: '9U5I_1234',
      title: 'Java',
      authors: ['Maurice Naftalin"'],
      description: 'Java',
    };
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should dispatch addToReadingList on addBookToReadingList call', () => {
    const spy = spyOn(component['store'], 'dispatch');
    component.addBookToReadingList(bookDetails);
    expect(spy).toHaveBeenCalledWith(
      addToReadingList({
        book: bookDetails,
      })
    );
  });
});
