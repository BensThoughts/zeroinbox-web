import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-label-edit-prompt',
  templateUrl: './label-edit-prompt.component.html',
  styleUrls: ['./label-edit-prompt.component.scss']
})
export class LogoutPromptComponent {
  constructor(private ref: MatDialogRef<LogoutPromptComponent>) {}

  save() {
    this.ref.close(false);
  }

  delete() {
    this.ref.close(true);
  }

}
