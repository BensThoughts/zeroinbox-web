import { DataSource } from '@angular/cdk/table';
import { Observable, BehaviorSubject } from 'rxjs';
import { CollectionViewer } from '@angular/cdk/collections';
import { MatPaginator, PageEvent, MatSort, Sort } from '@angular/material';
import { concat } from 'rxjs/observable/concat';
import { defer } from 'rxjs/observable/defer';
import { of } from 'rxjs/observable/of';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { Store, MemoizedSelector, select } from '@ngrx/store';
import { AppState } from '@app/core';
import { tap, map, withLatestFrom } from 'rxjs/operators';
import { ISender } from '../../../core/state/senders/model/senders.model';

export class SimpleDataSource<T> extends DataSource<T> {
    private dataSubject = new BehaviorSubject<T[]>([]);
    private dataLength = new BehaviorSubject<number>(0);
    private pageEvents$;
    private sortEvents$;

    constructor(
        private store: Store<AppState>, 
        private selector: MemoizedSelector<AppState, T[]>,
        private paginator: MatPaginator,
        private sort: MatSort
    ) { 
        super();
        this.pageEvents$ = fromMatPaginator(this.paginator);
        this.sortEvents$ = fromMatSort(this.sort);
    }

    getLength() {
        return this.dataSubject.value.length;
    }

    setFilteredLength(filter, filterProp) {
        this.store.pipe(
            select(this.selector),
            filterRows(filter, filterProp),
            tap((rows) => {
                let newLength = rows.length;
                this.dataLength.next(newLength);
            })
        ).subscribe();
    }

    getFilteredLength() {
        return this.dataLength.asObservable();
    }

    getValues() {
        return this.dataSubject.value;
    }

    loadData() {
        this.store.pipe(
            select(this.selector),
            sortRows(this.sortEvents$),
            paginateRows(this.pageEvents$),
            tap((array) => {
                this.dataSubject.next(array);
            })
        ).subscribe();
    }

    loadFilteredData(filter, filterProp) {
        this.store.pipe(
            select(this.selector),
            filterRows(filter, filterProp),
            sortRows(this.sortEvents$),
            paginateRows(this.pageEvents$),
            tap((array) => {
                this.dataSubject.next(array);
            })
        ).subscribe()
    }

    connect(collectionViewer: CollectionViewer): Observable<T[]> {
        return this.dataSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.dataSubject.complete();
        this.dataLength.complete();
    }
}

function defaultSort(a: any, b: any): number {
    //treat null === undefined for sorting
    a = a === undefined ? null : a;
    b = b === undefined ? null : b;
  
    if (a === b) { return 0; }
    if (a === null) { return -1; }
    if (b === null) { return 1; }
  
    //from this point on a & b can not be null or undefined.

    // compare only on letters, not on capitalization when strings
    if (typeof(a) === 'string') {
        a = a.toLowerCase();
    }

    if (typeof(b) === 'string') {
        b = b.toLowerCase();
    }
    
    if (a > b) {
      return 1;
    } else if (a < b) {
      return -1;
    } else {
      return 0;
    }
  }

type SortFn<U> = (a: U, b: U) => number;
interface PropertySortFns<U> {
  [prop: string]: SortFn<U>;
}

/** RxJS operator to map a material Sort object to a sort function */
function toSortFn<U>(sortFns: PropertySortFns<U> = {}, useDefault = true): (sort$: Observable<Sort>) => Observable<undefined | SortFn<U>> {
    return (sort$) => sort$.pipe(
      map(sort => {
        if (!sort.active || sort.direction === '') { return undefined; }
  
        let sortFn = sortFns[sort.active];
        if (!sortFn) {
          if (!useDefault) {
            throw new Error(`Unknown sort property [${sort.active}]`);
          }
  
          //By default assume sort.active is a property name, and sort using the default sort
          //  uses < and >.
          sortFn = (a: U, b: U) => defaultSort((<any>a)[sort.active], (<any>b)[sort.active]);
        }
  
        return sort.direction === 'asc' ? sortFn : (a: U, b: U) => sortFn(b, a);
      })
    );
  }

  /** Creates an Observable stream of Sort objects from a MatSort component */
export function fromMatSort(sort: MatSort): Observable<Sort> {
    return concat(
      defer(() => of({
        active: sort.active,
        direction: sort.direction
      })),
      sort.sortChange.asObservable()
    );
  }

  /** RxJs operator to sort an array based on an Observable of material Sort events **/
export function sortRows<U>(
    sort$: Observable<Sort>,
    sortFns: PropertySortFns<U> = {},
    useDefault = true
  ): (obs$: Observable<U[]>) => Observable<U[]> {
    return (rows$: Observable<U[]>) => combineLatest(
      rows$,
      sort$.pipe(toSortFn(sortFns, useDefault)),
      (rows, sortFn) => {
        if (!sortFn) { return rows; }
  
        const copy = rows.slice();
        return copy.sort(sortFn);
      }
    );
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

export function filterRows<U>(
    filter: string,
    filterProp: string,
    ): (obs$: Observable<U[]>) => Observable<U[]> {
    return (rows$: Observable<U[]>) => rows$.pipe(
        map((row) => {
            return row.filter((item) => {
                return item[filterProp].includes(filter);
            })
        })
    )
}
