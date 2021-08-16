import { Component } from '@angular/core';
import { techStack } from './tech';

@Component({
  selector: 'app-tech',
  templateUrl: './tech.component.html',
  styleUrls: ['./tech.component.scss']
})
export class TechComponent {
  public techStack;
  constructor() {
    this.techStack = techStack;
  }
}
