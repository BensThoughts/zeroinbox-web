/*
 * All the “dumb” components and pipes should be implemented here. These
 * components don’t import and inject services from core or other features in
 * their constructors. They should receive all data though attributes in the
 * template of the component using them. This all sums up to the fact that
 * SharedModule doesn’t have any dependency to the rest of our application.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Material component modules
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';

// Fontawesome library
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCog,
  faFilter,
  faHome,
  faLightbulb,
  faTag
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faCog,
  faFilter,
  faHome,
  faLightbulb,
  faTag
);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    FontAwesomeModule,

    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatNativeDateModule,
    MatSidenavModule,
    MatToolbarModule
  ],
  exports: [
    CommonModule,
    FormsModule,

    FontAwesomeModule,

    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatNativeDateModule,
    MatSidenavModule,
    MatToolbarModule
  ]
})
export class SharedModule {}
