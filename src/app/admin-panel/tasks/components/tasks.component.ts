import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '@app/core';
import { selectLabelTasks, selectDeleteTasks } from '@app/admin-panel/tasks/state/tasks.selectors';
import { selectTasksEntities, selectAllTasks } from '../state/tasks.selectors';

@Component({
  selector: 'app-tasks-component',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  labelTasks$;
  deleteTasks$;
  tasks$;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.labelTasks$ = this.store.pipe(select(selectLabelTasks));
    this.deleteTasks$ = this.store.pipe(select(selectDeleteTasks));
    this.tasks$ = this.store.pipe(select(selectAllTasks));
  }

}
