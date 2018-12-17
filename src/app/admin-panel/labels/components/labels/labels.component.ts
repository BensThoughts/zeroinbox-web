import { Component, OnInit } from '@angular/core';


import { GmailLabelService } from '@app/core/services/label/gmail-label.service';
import { UserService } from '@app/core/services/user.service';

import { filter } from 'rxjs/operators';

import { GmailLabel, Label } from '../../models/gmail-label.model';

@Component({
  selector: 'app-labels',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.scss']
})
export class LabelsComponent implements OnInit {
  public foundLabels: any;
  public data: any;
  gmail_labels: GmailLabel[];
  labels: Label[];

  constructor(private gmailService: GmailLabelService,
              private userService: UserService) {
                this.labels = [
                  new Label(
                    'Label_4',        // id
                    'Josh Lennon',    // name
                    'user'            // type
                  ),
                  new Label(
                    'Label_54',
                    'Best Buy',
                    'user'
                  ),
                  new Label(
                    'Label_22',
                    'News Lists',
                    'user'
                  )
                ];
              }

  ngOnInit() {
    this.getLabels();
  }

  public getLabels() {
    this.gmailService.getLabels(this.userService.getToken())
      .subscribe( (results: GmailLabel[]) => {
        this.gmail_labels = results.filter( label => label.type == 'user');
        console.log(this.gmail_labels);
        //console.log(results);
      });
    }

}
