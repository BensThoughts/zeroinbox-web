import { Component, OnInit, ViewChild, Input, ChangeDetectionStrategy } from '@angular/core';
import { PageEvent, MatTableDataSource, MatPaginator, MatTable } from '@angular/material';
import { ISuggested } from '@app/core/state/gmail-api/models/suggested.model';
import { Store, select } from '@ngrx/store';
import { AppState, SuggestedToggleDeleteAction, selectSendersMore, SuggestedToggleLabelAction, selectPageOfSendersMore, PageQuery, selectTotal, selectUniqueSenders, selectSendersMoreCount } from '@app/core';
import { Update } from '@ngrx/entity';
import { Observable, from, of, BehaviorSubject } from 'rxjs';
import { DataSource } from '@angular/cdk/table';
import { tap } from 'rxjs/operators';
import { CollectionViewer } from '@angular/cdk/collections';

@Component({
  selector: 'go-suggestions-table',
  templateUrl: './suggestions-table.component.html',
  styleUrls: ['./suggestions-table.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class SuggestionsTableComponent implements OnInit {


  // @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @Input() suggestedData: ISuggested[];

  displayedColumns: string[] = ['label', 'delete', 'address', 'count'];
  dataSource: UserDataSource;
  length; //this.suggestedData.length;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  pageEvent: PageEvent;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    // this.dataSource = new MatTableDataSource(this.suggestedData);
    this.dataSource = new UserDataSource(this.store);
    // this.dataSource.paginator = this.paginator;
    // this.length = this.suggestedData.length;
    const initialPage: PageQuery = {
      pageIndex: 0,
      pageSize: 10
    };
    this.dataSource.loadSuggestions(initialPage);
    this.store.pipe(select(selectSendersMoreCount)).subscribe((unique_senders) => {
      this.length = unique_senders
    })
  }

  ngAfterViewInit() {

    this.paginator.page
      .pipe(
        tap(() => this.loadSuggestionsPage())
      )
      .subscribe();
  }

  loadSuggestionsPage() {

  const newPage: PageQuery = {
    pageIndex: this.paginator.pageIndex,
    pageSize: this.paginator.pageSize
    };
    //console.log(newPage);

  this.dataSource.loadSuggestions(newPage);

  }

  onSuggestionDeleteToggle(iSuggested: ISuggested) {
    let diff = !iSuggested.actionDelete;
    const changes = {
      actionDelete: diff,
      // actionLabel: !iSuggested.actionLabel
    }
    const newUpdate: Update<ISuggested> = {
      id: iSuggested.from,
      changes
    };
    this.store.dispatch(new SuggestedToggleDeleteAction({iSuggested: newUpdate}));
    // this.dataSource = new MatTableDataSource(this.suggestedData);
    // this.dataSource.paginator = this.paginator;
  }

  onSuggestionLabelToggle(iSuggested: ISuggested) {
    let diff = !iSuggested.actionLabel;
    const changes = {
      actionLabel: diff,
    }
    const newUpdate: Update<ISuggested> = {
      id: iSuggested.from,
      changes
    }
    this.store.dispatch(new SuggestedToggleLabelAction({iSuggested: newUpdate}))
  }


}

export class UserDataSource extends DataSource<any> {
  private suggestionsSubject = new BehaviorSubject<ISuggested[]>([]);
  constructor(private store: Store<AppState>) {// private suggestedSource: ISuggested[]) {
    super();
  }

  loadSuggestions(page: PageQuery) {
    console.log(page);
    this.store.pipe(
      select(selectPageOfSendersMore(page)),
      tap((suggestions) => {
        // console.log(suggestions);
        this.suggestionsSubject.next(suggestions)
      })
    ).subscribe();
  }
  connect(collectionViewer: CollectionViewer): Observable<ISuggested[]> {
    // return of(this.suggestedSource);
    return this.suggestionsSubject.asObservable();
  }
  disconnect(collectionViewer: CollectionViewer): void {
    this.suggestionsSubject.complete();
  }
}
