import { Injectable } from '@angular/core';

@Injectable()
export class LogService {
  log(msg: any, printDate: boolean = true) {
    if (printDate) {
      console.log(new Date() + ': ' + JSON.stringify(msg));
    } else {
      console.log(JSON.stringify(msg));
    }
  }

  error(err: any, printDate: boolean = true) {
    if (printDate) {
      console.error(new Date() + ': ' + JSON.stringify(err));
    } else {
      console.error(JSON.stringify(err));
    }
  }
}
