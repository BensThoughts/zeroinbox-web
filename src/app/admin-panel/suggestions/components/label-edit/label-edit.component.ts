import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-label-edit',
  templateUrl: './label-edit.component.html',
  styleUrls: ['./label-edit.component.scss']
})
export class LabelEditComponent {
  constructor(private ref: MatDialogRef<LabelEditComponent>) {}

  @Input() labelNames: string[];

  addLabel() {
    
  }

  save() {
    this.ref.close(true);
  }

  cancel() {
    this.ref.close(false);
  }

}