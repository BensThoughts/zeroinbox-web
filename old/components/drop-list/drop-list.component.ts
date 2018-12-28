import {Component, Input} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem, copyArrayItem} from '@angular/cdk/drag-drop';
import {MatSnackBar} from '@angular/material';


import { GmailLabel } from '@app/core/services/label/models/gmail-label.model';
/**
 * @title Drag&Drop connected sorting
 */
@Component({
  selector: 'go-drop-list',
  templateUrl: 'drop-list.component.html',
  styleUrls: ['drop-list.component.scss'],
})
export class DropListComponent {

  @Input() done: GmailLabel[];
  @Input() todo: GmailLabel[];

  constructor(public snackBar: MatSnackBar) {}

  openSnackBar(message: string, action: string = '') {
    this.snackBar.open(message, action, {
      duration: 2000, panelClass: 'center-snackbar'
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else if (
      !this.alreadyExists(new GmailLabel(event.previousContainer.data[event.previousIndex]))
      ) {
          copyArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
      }
  }


  /**
   * Check if there is already a label with the same name
   * show matSnackBar if there already is and return false
   */
   alreadyExists(myLabel: GmailLabel): boolean {
     let exists = false;
     this.done.forEach(
       (label) => {
         if (label['name'] == myLabel['name']) {
           //console.log('true');
           exists = true;
           this.openSnackBar(`The ${label['name']} label already exists...`);
       }
      }
    );
    console.log(exists);
    return exists;
   }


  /**
   * Check if there is already a label with the same name
   * before pushing to the list of current labels.
   */
  add(myLabel: GmailLabel): void {
    if (!this.alreadyExists(myLabel)) {
      this.done.push(myLabel);
    }
  }


  /**
   * remove a label from the list of current labels
   */
  remove(myLabel: GmailLabel): void {
    const index = this.done.indexOf(myLabel);

    if (index >= 0) {
      this.done.splice(index, 1);
    }
  }
}
