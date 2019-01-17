import { Component, OnInit, ViewChild, Input, ChangeDetectionStrategy } from '@angular/core';
import { PageEvent, MatTableDataSource, MatPaginator, MatTable } from '@angular/material';
import { ISuggested } from '@app/core/state/gmail-api/models/suggested.model';
import { Store, select } from '@ngrx/store';
import { AppState, SuggestedToggleDeleteAction, selectSendersMore, SuggestedToggleLabelAction, selectPageOfSendersMore, PageQuery, selectTotal, selectUniqueSenders, selectSendersMoreCount, SuggestedToggleDeleteManyAction, SuggestedToggleLabelManyAction } from '@app/core';
import { Update } from '@ngrx/entity';
import { Observable, from, of, BehaviorSubject } from 'rxjs';
import { DataSource } from '@angular/cdk/table';
import { tap, map } from 'rxjs/operators';
import { CollectionViewer, SelectionModel } from '@angular/cdk/collections';
import { selectCountCutoff } from '@app/admin-panel/settings/state/settings.selectors';

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
  selectionDelete = new SelectionModel<string>(true, []);
  selectionLabel = new SelectionModel<string>(true, []);
  collectionViewer: CollectionViewer;
  mySub: Observable<ISuggested[]>;

  countCutoff: number;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    let storeHandler = this.store.pipe(select(selectCountCutoff)).subscribe((cutoff) => {
      this.countCutoff = cutoff
    });
    storeHandler.unsubscribe;
    // this.dataSource = new MatTableDataSource(this.suggestedData);
    this.dataSource = new UserDataSource(this.store);
    // this.dataSource.paginator = this.paginator;
    // this.length = this.suggestedData.length;
    const initialPage: PageQuery = {
      pageIndex: 0,
      pageSize: 10
    };
    this.dataSource.loadSuggestions(initialPage);
    let storeHandler2 = this.store.pipe(
      select(selectSendersMoreCount(this.countCutoff))
    ).subscribe((unique_senders) => {
      this.length = unique_senders
    });
    storeHandler2.unsubscribe;

    this.mySub = this.dataSource.connect(this.collectionViewer);


  }

  ngAfterViewInit() {

    this.paginator.page
      .pipe(
        tap(() => this.loadSuggestionsPage())
      )
      .subscribe();
  }

  loadSuggestionsPage() {
  this.selectionDelete.clear();
  this.selectionLabel.clear();
  const newPage: PageQuery = {
    pageIndex: this.paginator.pageIndex,
    pageSize: this.paginator.pageSize
    };
    //console.log(newPage);

  this.dataSource.loadSuggestions(newPage);

  }

  onSuggestionDeleteToggle(iSuggested: ISuggested) {
    let diff = !iSuggested.actionDelete;
    if (diff) {
      this.selectionDelete.select(iSuggested.from);
    } else {
      console.log('deselect');
      this.selectionDelete.deselect(iSuggested.from);
    }
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
    if (diff) {
      this.selectionLabel.select(iSuggested.from);
    } else {
      this.selectionLabel.deselect(iSuggested.from);
    }
    const changes = {
      actionLabel: diff,
    }
    const newUpdate: Update<ISuggested> = {
      id: iSuggested.from,
      changes
    }
    this.store.dispatch(new SuggestedToggleLabelAction({iSuggested: newUpdate}))
  }

  isAllDeleteSelected() {
    const numSelected = this.selectionDelete.selected.length;
    let numRows;
    let handler = this.mySub.subscribe((iSuggested) => {
      numRows = iSuggested.length
    });
    console.log('numRows: ' + numRows);
    console.log('numSelected: ' + numSelected);
    return numSelected == numRows;
  }

  masterToggleDelete() {
    // console.log(this.isAllDeleteSelected());
    let changeArray = [];
    if (this.isAllDeleteSelected()) {
      this.selectionDelete.clear()
      const changes = {
        actionDelete: false
      };
      let handler = this.mySub.subscribe((iSuggesteds) => {
        iSuggesteds.forEach((iSuggested) => {
          let newUpdate: Update<ISuggested> = {
            id: iSuggested.from,
            changes
          }
          changeArray = changeArray.concat(newUpdate);
        });
      });
      handler.unsubscribe();
    } else {
      this.selectionLabel.clear();
      const changes = {
        actionDelete: true,
        actionLabel: false
      };

      let handler = this.mySub.subscribe((isuggested) => {
        isuggested.forEach((isuggested) => {
          this.selectionDelete.select(isuggested.from);
        });
      });
      this.selectionDelete.selected.forEach((iSuggested) => {
        let newUpdate: Update<ISuggested> = {
          id: iSuggested,
          changes
        };
        changeArray = changeArray.concat(newUpdate);
      });
      handler.unsubscribe();
      // console.log(changeArray);

    }
    this.store.dispatch(new SuggestedToggleDeleteManyAction({ iSuggesteds: changeArray }));

  }

  isAllLabelSelected() {
    const numSelected = this.selectionLabel.selected.length;
    let numRows;
    let handler = this.mySub.subscribe((iSuggested) => {
      numRows = iSuggested.length
    });
    console.log('numRows: ' + numRows);
    console.log('numSelected: ' + numSelected);
    return numSelected == numRows;
  }

  masterToggleLabel() {
    // console.log(this.isAllDeleteSelected());
    let changeArray = [];
    if (this.isAllLabelSelected()) {
      this.selectionLabel.clear()
      const changes = {
        actionLabel: false
      };
      let handler = this.mySub.subscribe((iSuggesteds) => {
        iSuggesteds.forEach((iSuggested) => {
          let newUpdate: Update<ISuggested> = {
            id: iSuggested.from,
            changes
          }
          changeArray = changeArray.concat(newUpdate);
        });
      });
      handler.unsubscribe();
    } else {
      this.selectionDelete.clear();
      const changes = {
        actionLabel: true,
        actionDelete: false
      };

      let handler = this.mySub.subscribe((isuggested) => {
        isuggested.forEach((isuggested) => {
          this.selectionLabel.select(isuggested.from);
        });
      });
      this.selectionLabel.selected.forEach((iSuggested) => {
        let newUpdate: Update<ISuggested> = {
          id: iSuggested,
          changes
        };
        changeArray = changeArray.concat(newUpdate);
      });
      handler.unsubscribe();
      // console.log(changeArray);

    }
    this.store.dispatch(new SuggestedToggleLabelManyAction({ iSuggesteds: changeArray }));

  }
}

export class UserDataSource extends DataSource<any> {
  private suggestionsSubject = new BehaviorSubject<ISuggested[]>([]);
  private countCutoff: number;
  constructor(private store: Store<AppState>) {// private suggestedSource: ISuggested[]) {
    super();
    let storeHandler = this.store.pipe(select(selectCountCutoff)).subscribe((cutoff) => {
      this.countCutoff = cutoff
    });
    storeHandler.unsubscribe;
  }

  loadSuggestions(page: PageQuery) {
    console.log(page);
    this.store.pipe(
      select(selectPageOfSendersMore(this.countCutoff, page)),
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
