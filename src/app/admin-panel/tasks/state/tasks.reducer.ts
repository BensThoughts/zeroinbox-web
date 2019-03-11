import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { ITask } from './tasks.model';
import { TaskActions, TaskActionTypes } from './tasks.actions';
import { AppState } from '@app/core/state/core.state';

export interface State extends AppState {
  tasks: TasksState;
}

export interface TasksState extends EntityState<ITask> { }

export function selectSendersId(l: ITask) {
  return l.id;
}

export const adapter: EntityAdapter<ITask> =
  createEntityAdapter<ITask>({
    selectId: selectSendersId,
  });

const initialTasksState = adapter.getInitialState();

export function tasksReducer(
  state = initialTasksState,
  action: TaskActions): TasksState {

    switch (action.type) {

      case TaskActionTypes.UpsertTasks:
        return adapter.upsertMany(action.payload.tasks, state);

      case TaskActionTypes.ResetTasks:
        return initialTasksState;

      case TaskActionTypes.UpdateTasks:
        return action.payload;

      default:
        return state;

    }

  }

  export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal
  } = adapter.getSelectors();
