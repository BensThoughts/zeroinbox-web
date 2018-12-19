import { Component, OnInit } from '@angular/core';


import { GmailLabelService } from '@app/core/services/label/gmail-label.service';
import { UserService } from '@app/core/services/auth-user/user.service';

import { filter, map } from 'rxjs/operators';

import { GmailLabel } from '@app/core/services/label/models/gmail-label.model';


@Component({
  selector: 'app-labels',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.scss']
})

export class LabelsComponent implements OnInit {
  gmail_labels: GmailLabel[]; // The list of labels currently in the gmail acc.
  suggested_labels: GmailLabel[];
  label_names: string[] = [];

  constructor(private gmailService: GmailLabelService,
              private userService: UserService) {
                this.suggested_labels = [
                  new GmailLabel({
                    name: "Josh",
                  }),
                  new GmailLabel({
                    name: "Best Buy",
                  }),
                  new GmailLabel({
                    name: "Mailing Lists",
                  }),
                  new GmailLabel({
                    name: "Tech Crunch",
                  })
                ];
                this.suggested_labels.forEach(
                  label => this.label_names.push(label.name));
              }

  ngOnInit() {
    this.getLabels();
  }

  public getLabels() {
    this.gmailService.getLabels(this.userService.getToken())
      .subscribe( (results: GmailLabel[]) => {
        this.gmail_labels = results.filter( label => label.type == 'user');

        // fill label_names with the names of all of our results
        //results.forEach((label) => {this.label_names.push(label.name);});
        //console.log(this.gmail_labels);
        ///console.log(results);
      });
    }

}
