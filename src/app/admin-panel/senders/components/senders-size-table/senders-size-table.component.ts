import { Component, OnInit, ViewChild, Input, ChangeDetectionStrategy, ElementRef } from '@angular/core';
import { MatPaginator, MatTable, MatSort } from '@angular/material';
import { Store, select } from '@ngrx/store';
import {
  AppState,
} from '@app/core';

import {
  selectSizeGroup,
} from '../../state/senders-view.selectors';

import { 
  SetSizeCutoffAction, 
  LabelSenderDialogAction, 
  DeleteSenderDialogAction,
  DeleteAllSendersDialogAction,
  LabelAllSendersDialogAction
} from '../../state/senders-view.actions';



import { Observable, of, Subscription, fromEvent } from 'rxjs';
import { tap, map, take, delay, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { rowAnimations } from '../../animations/rowAnimations';
import { ISender } from '../../../../core/state/senders/model/senders.model';

import { SimpleDataSource } from '@app/core/utils/datasource-utils';
import { selectSendersBySizeGroupFiltered } from '../../state/senders-view.selectors';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-senders-size-table',
  templateUrl: './senders-size-table.component.html',
  styleUrls: ['./senders-size-table.component.scss'],
  animations: [rowAnimations],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class SendersSizeTableComponent implements OnInit {


  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('searchInput') input: ElementRef;

  displayedColumns: string[] = ['totalSizeEstimate'];

  dataSource: SimpleDataSource<ISender>;

  pageSizeOptions: number[] = [5, 10, 25, 100];
  totalRows$: Observable<number>;

  sizeCutoff$: Observable<string>;
  sizeCutoffs;

  handler1: Subscription;
  handler2: Subscription;

  myRemoved = true;

   toggle() {
     this.myRemoved = !this.myRemoved;
   }

  constructor(
    private store: Store<AppState>,
    private translate: TranslateService
  ) {
    translate.get('app.admin-panel.senders.size-table.size-selector').subscribe((res) => {
      console.log(res);
      this.sizeCutoffs = [
        { value: 'ALL', label: res.all },
        { value: 'XS', label: res.xs },
        { value: 'SM', label: res.sm },
        { value: 'MD', label: res.md },
        { value: 'LG', label: res.lg },
        { value: 'XL', label: res.xl }
      ]
    })
  }

  ngOnInit() {
    this.sizeCutoff$ = this.store.pipe(select(selectSizeGroup));

    this.dataSource = new SimpleDataSource(
      this.store,
      selectSendersBySizeGroupFiltered,
      this.paginator,
      this.sort
    );

    this.totalRows$ = this.dataSource.getFilteredLength();
  }

  ngAfterViewInit() {

    this.loadSuggestionsPage();
    this.updatePaginatorLength();


    this.handler1 = fromEvent(this.input.nativeElement, 'keyup')
    .pipe(
      debounceTime(150),
      distinctUntilChanged(),
      tap(() => {
        this.paginator.pageIndex = 0;
        this.loadSuggestionsPage();
        this.updatePaginatorLength();
      })
    ).subscribe();
  
    this.handler2 = this.paginator.page.pipe(
      tap(() => this.loadSuggestionsPage())
    ).subscribe();

  }

  ngOnDestroy() {
    this.handler1.unsubscribe();
    this.handler2.unsubscribe();
  }


  onCutoffSelect({ value: cutoff }) {
    this.store.dispatch(new SetSizeCutoffAction({ sizeCutoff: cutoff }));

    this.updatePaginatorLength();
    this.paginator.firstPage();
  }


  loadSuggestionsPage() {
    this.dataSource.loadFilteredData(this.input.nativeElement.value.toLowerCase(), 'fromAddress');
  }

  updatePaginatorLength() {
    this.dataSource.setFilteredLength(this.input.nativeElement.value.toLowerCase(), 'fromAddress');
  }


  createActions() {
    this.toggle();
    this.store.pipe(
      select(selectSizeGroup),
      take(1),
      map((sizeGroup) => {
      })
    ).subscribe();


    of(true).pipe(
      take(1),
      delay(100),
      map(() => {
        if (!this.paginator.hasNextPage() && this.paginator.hasPreviousPage()) {
          if (this.dataSource.getLength() === 0) {
            this.paginator.previousPage();
          }
        }
        this.updatePaginatorLength();
        this.toggle();
      })
    ).subscribe();

  }

  labelSender(suggestion: ISender) {
    this.store.dispatch(new LabelSenderDialogAction({ sender: suggestion }));
  }

  deleteSender(suggestion: ISender) {
    this.store.dispatch(new DeleteSenderDialogAction({ sender: suggestion }));
  }

  deleteAll() {
    let senders = this.dataSource.getValues();
    this.store.dispatch(new DeleteAllSendersDialogAction({ senders: senders }))
  }

  labelAll() {
    let senders = this.dataSource.getValues();
    this.store.dispatch(new LabelAllSendersDialogAction({ senders: senders }))
  }

}
