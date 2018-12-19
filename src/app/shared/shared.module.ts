/*
 * All the “dumb” components and pipes should be implemented here. These
 * components don’t import and inject services from core or other features in
 * their constructors. They should receive all data though attributes in the
 * template of the component using them. This all sums up to the fact that
 * SharedModule doesn’t have any dependency to the rest of our application.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

// Material component modules
import { MatAutocompleteModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatNativeDateModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material/toolbar';

import { DragDropModule } from '@angular/cdk/drag-drop';


// Flex Layout Module for implementing @angular/flex-layout
import { FlexLayoutModule } from '@angular/flex-layout';

// Fontawesome library
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faBook,
  faCog,
  faChevronCircleLeft,
  faEdit,
  faFilter,
  faHome,
  faLightbulb,
  faPlus,
  faSignOutAlt,
  faStream,
  faTag,
  faTrash,
  faWindowMaximize,
} from '@fortawesome/free-solid-svg-icons';
import {
  faGithub,
  faMediumM,
  faTwitter,
  faInstagram,
  faYoutube
} from '@fortawesome/free-brands-svg-icons';

library.add(
  faBook,
  faCog,
  faChevronCircleLeft,
  faEdit,
  faFilter,
  faHome,
  faLightbulb,
  faPlus,
  faSignOutAlt,
  faStream,
  faTag,
  faTrash,
  faWindowMaximize,

  faGithub,
  faMediumM,
  faTwitter,
  faInstagram,
  faYoutube,
);

@NgModule({
  imports: [
    CommonModule,

    FormsModule,
    ReactiveFormsModule,

    FontAwesomeModule,


    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatNativeDateModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatToolbarModule,

    DragDropModule,

    FlexLayoutModule
  ],
  exports: [
    CommonModule,

    FormsModule,
    ReactiveFormsModule,

    FontAwesomeModule,

    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatNativeDateModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatToolbarModule,

    DragDropModule,

    FlexLayoutModule
  ]
})
export class SharedModule {}
