import { Component, OnInit } from '@angular/core';
import { GmailLabelService } from '@app/core/services/gmail-label.service';
import { UserService } from '@app/core/services/user.service';


@Component({
  selector: 'app-labels',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.scss']
})
export class LabelsComponent implements OnInit {
  public foundLabels: any;

  constructor(private gmailService: GmailLabelService,
              private userService: UserService) { }

  ngOnInit() {
  }

  public getLabels() {
    this.gmailService.getLabels(this.userService.getToken())
      .subscribe( (labels_resource) => {
        this.foundLabels = labels_resource;
        console.log('our data', labels_resource);
      });
  }

}
