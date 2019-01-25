import * as fromTasksActions from "./tasks.actions";
import { ITask } from './tasks.model';

describe('UpsertTasksAction', () => {
  it('should create an action', () => {
    const payload: { tasks: ITask[] } = {
      tasks: [{ id: '123456789abc', fromAddress: 'test@gmail.com', delete: false, label: false, labelNames: ['test'] }]
    };
    const action = new fromTasksActions.UpsertTasksAction(payload);


    expect({...action}).toEqual({
      type: fromTasksActions.TaskActionTypes.UpsertTasks,
      payload
    });

  });
});


describe('ResetTasksStateAction', () => {
  it('should create an action', () => {
    const action = new fromTasksActions.ResetTasksStateAction();

    expect({...action}).toEqual({ type: fromTasksActions.TaskActionTypes.ResetTasks })
  });
});
