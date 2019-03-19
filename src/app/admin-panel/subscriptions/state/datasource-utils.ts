import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs';
import { CollectionViewer } from '@angular/cdk/collections';
import { MatPaginator, PageEvent } from '@angular/material';
import { concat } from 'rxjs/observable/concat';
import { defer } from 'rxjs/observable/defer';
import { of } from 'rxjs/observable/of';
import { combineLatest } from 'rxjs/observable/combineLatest';

export class SimpleDataSource<T> extends DataSource<T> {
    constructor(private rows$: Observable<T[]>) { super(); }
    connect(collectionViewer: CollectionViewer): Observable<T[]> {
        return this.rows$;
    }
    disconnect(collectionViewer: CollectionViewer): void {}
}

/** Creates an Observable stream of PageEvent objects from a MatPaginator component */
export function fromMatPaginator(pager: MatPaginator): Observable<PageEvent> {
    return concat(
      defer(() => of({
        pageIndex: pager.pageIndex,
        pageSize: pager.pageSize,
        length: pager.length,
      })),
      pager.page.asObservable()
    );
}


/** RxJs operator to paginate an array based on an Observable of PageEvent objects **/
export function paginateRows<U>(page$: Observable<PageEvent>): (obs$: Observable<U[]>) => Observable<U[]> {
    return (rows$: Observable<U[]>) => combineLatest(
      rows$,
      page$,
      (rows, page) => {
        const startIndex = page.pageIndex * page.pageSize;
        const copy = rows.slice();
        return copy.splice(startIndex, page.pageSize);
      }
    );
}