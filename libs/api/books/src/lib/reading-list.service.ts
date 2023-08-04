import { Book, ReadingListItem } from '@tmo/shared/models';

import { Injectable } from '@nestjs/common';
import { StorageService } from '@tmo/shared/storage';

const KEY = '[okreads API] Reading List';

@Injectable()
export class ReadingListService {
  private readonly storage = new StorageService<ReadingListItem[]>(KEY, []);

  async getList(): Promise<ReadingListItem[]> {
    return this.storage.read();
  }

  async addBook(b: Book): Promise<void> {
    this.storage.update((list) => {
      const { id, ...rest } = b;
      list.push({
        bookId: id,
        ...rest,
      });
      return list;
    });
  }

  async removeBook(id: string): Promise<void> {
    this.storage.update((list) => {
      return list.filter((x) => x.bookId !== id);
    });
  }

  async markAsFinished(book: ReadingListItem): Promise<ReadingListItem> {
    const finishedBook: ReadingListItem = {
      ...book,
      finished: true,
      finishedDate: new Date().toISOString(),
    };
    this.storage.update((list) => {
      const index: number = list.findIndex(
        (x) => x.bookId === finishedBook.bookId
      );
      list[index] = finishedBook;
      return list;
    });
    return finishedBook;
  }
}
