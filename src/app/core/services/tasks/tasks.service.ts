import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';

import { API_URL } from '../apiurl';
import { ITask } from '../../state/tasks/tasks.model';

export interface TasksResponse {
    status: string,
    status_message: string,
}


@Injectable()
export class TasksService {

  constructor(private httpClient: HttpClient) {}

 /*  public postTasks(tasks: ITask[]): Observable<TasksResponse> {
    let labelByNameTasks = tasks.filter((task) => {
        if (task.labelByName) {
            return true;
        }
        return false;
    }).map((labelTask) => {
        return {
            senderId: labelTask.id,
            labelNames: labelTask.labelNames
        }
    });

    let deleteTasks = tasks.filter((task) => {
        if (task.delete) {
            return true;
        }
        return false;
    }).map((deleteTask) => {
        return deleteTask.id
    });

    let body = {
        label: labelTasks,
        delete: deleteTasks
    }
    
    return this.httpClient.post<TasksResponse>(API_URL + '/actions', body, {
      withCredentials: true
    });

  } */

}