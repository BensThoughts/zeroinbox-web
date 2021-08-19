import { Injectable } from '@angular/core';
import { NotificationService } from '../notifications/notification.service';

export type ErrorType = 'connection' | 'default';
@Injectable()
export class LogService {
  constructor(private notificationService: NotificationService) {}

  log(msg: any, printDate: boolean = true) {
    if (printDate) {
      console.log(new Date(), msg);
    } else {
      console.log(msg);
    }
  }

  error(err: any, errType: ErrorType = 'default', printDate: boolean = true) {
    if (printDate) {
      console.error(new Date(), err);
    } else {
      console.error(err);
    }
    switch (errType) {
      case 'connection':
        this.notificationService.error('Connection Error!');
      default:
        this.notificationService.error('Error');
    }
  }
}
