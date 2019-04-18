import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-label-edit-prompt',
  templateUrl: './label-edit-prompt.component.html',
  styleUrls: ['./label-edit-prompt.component.scss']
})
export class LabelEditComponent {
  constructor(private ref: MatDialogRef<LabelEditComponent>) {}

  @Input() labelName: string;

  save() {
    this.ref.close(true);
  }

  delete() {
    this.ref.close(false);
  }

}