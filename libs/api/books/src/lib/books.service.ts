import { HttpService, Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Book } from '@tmo/shared/models';

@Injectable()
export class BooksService {
  constructor(private readonly http: HttpService) {}

  search(term: string): Observable<Book[]> {
    if (!term) {
      throw new Error('Missing serach term');
    }

    return this.http
      .get(`https://www.googleapis.com/books/v1/volumes?q=${term}`)
      .pipe(
        map((resp) => {
          return resp.data.items.map((item) => {
            return {
              id: item.id,
              title: item.volumeInfo?.title,
              authors: item.volumeInfo?.authors || [],
              description: item.searchInfo?.textSnippet,
              publisher: item.volumeInfo?.publisher,
              publishedDate: item.volumeInfo?.publishedDate
                ? new Date(item.volumeInfo?.publishedDate).toISOString()
                : undefined,
              coverUrl: item.volumeInfo?.imageLinks?.thumbnail,
            };
          });
        }),
        catchError((err) => of(`Something went wrong: ${err}`))
      );
  }
}
