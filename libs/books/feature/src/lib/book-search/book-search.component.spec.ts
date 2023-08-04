import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { BookSearchComponent } from './book-search.component';
import { BooksFeatureModule } from '../books-feature.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedTestingModule } from '@tmo/shared/testing';

describe('ProductsListComponent', () => {
  let component: BookSearchComponent;
  let fixture: ComponentFixture<BookSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BooksFeatureModule, NoopAnimationsModule, SharedTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should call searchBooks when I am typing search text', () => {
    const el = fixture.nativeElement.querySelector('input');
    el.value = 'data';
    el.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.searchBooks).toHaveBeenCalled();
    });
  });

  it('should unsubscribe on ngOnDestroy', () => {
    const unsubscribeSpy = jest.spyOn(
      (component as any).subscription,
      'unsubscribe'
    );
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });
});
