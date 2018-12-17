import { Component, OnInit } from '@angular/core';


import { GmailLabelService } from '@app/core/services/label/gmail-label.service';
import { UserService } from '@app/core/services/user.service';

import { filter } from 'rxjs/operators';

import { Label, LabelResult } from '../../models/label.model';

@Component({
  selector: 'app-labels',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.scss']
})
export class LabelsComponent implements OnInit {
  public foundLabels: any;
  public data: any;
  labels: Label[];
  labelResult: LabelResult[];

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
    this.getLabelsJson();
  }

  public getLabelsJson() {
    this.gmailService.getLabels(this.userService.getToken())
      .subscribe( (results: LabelResult[]) => {
        this.labelResult = results.filter( label => label.type == 'user');
        //console.log(this.labelResult);
        //console.log(results);

      //  this.foundLabels = labels_resource['labels'].filter( label => label.type == 'user');

      });
    }


    //  }
      /*
        this.foundLabels = labels_resource;
        console.log('our data', labels_resource);
        this.data = labels_resource['labels'];
        //for ( item in this.data ) {
        //  console.log(item);
        //}
      //  console.log(LABELS);
        console.log(this.data);
        this.data.forEach((arrayItem) => {
            if (arrayItem['type'] == 'user') {
              console.log(arrayItem);
            }
        });
      });

      */


}
