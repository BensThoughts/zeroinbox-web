import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, ViewChild } from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete} from '@angular/material';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { AppState } from '@app/core';
import { GmailLabelsAdded } from '../../state/gmail-label.actions';
import { IGmailLabel } from '../../state/models/gmail-label.model';

// import {GmailLabel} from '@app/core/services/label/models/gmail-label.model';

/**
 * @title Chips Autocomplete
 */
@Component({
  selector: 'go-labels-input',
  templateUrl: 'labels-input.component.html',
  styleUrls: ['labels-input.component.scss'],
})
export class LabelsInputComponent {
  // @Input() allLabels: string[];

  // Suggested Labels Test
  allLabels: string[] = ['John Abrams', 'Josh Lennon', 'Lindsay Essary', 'Best Buy', 'Starbucks'];

  visible = true;
  selectable = false;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  labelCtrl = new FormControl();
  filteredLabels: Observable<string[]>;
  labels: string[] = [];

  private gmailLabels: IGmailLabel[] = [];

  @ViewChild('labelInput') labelInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(private store: Store<AppState>) {
    this.filteredLabels = this.labelCtrl.valueChanges.pipe(
        startWith(null),
        map((fruit: string | null) => fruit ? this._filter(fruit) : this.allLabels.slice()));
  }

  addLabelsToStore() {
    this.createLabels(this.labels);
    this.store.dispatch(new GmailLabelsAdded({ gmailLabels : this.gmailLabels }));
    this.resetLabels();
  }

  private createLabels(labels: string[]) {
    labels.forEach(label => this.gmailLabels.push({
      name: label,
      messageListVisibility: 'show',
      labelListVisibility: 'labelShow',
      type: 'user'
    }));
  }

  resetLabels() {
    this.gmailLabels = [];
  }

  add(event: MatChipInputEvent): void {
    // Add fruit only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our fruit
      if ((value || '').trim()) {
        this.labels.push(value.trim());
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.labelCtrl.setValue(null);
    }
  }

  remove(fruit: string): void {
    const index = this.labels.indexOf(fruit);

    if (index >= 0) {
      this.labels.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.labels.push(event.option.viewValue);
    this.labelInput.nativeElement.value = '';
    this.labelCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allLabels.filter(label => label.toLowerCase().indexOf(filterValue) === 0);
  }
}
