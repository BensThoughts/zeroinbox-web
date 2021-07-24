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
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';

import { DragDropModule } from '@angular/cdk/drag-drop';

// Fontawesome library
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faAddressBook,
  faAddressCard,
  faBars,
  faBook,
  faBookDead,
  faCog,
  faChartPie,
  faChevronCircleLeft,
  faDoorOpen,
  faDownload,
  faEdit,
  faEnvelope,
  faFilter,
  faHome,
  faLightbulb,
  faMinus,
  faMinusSquare,
  faNewspaper,
  faPaintBrush,
  faPlus,
  faSignOutAlt,
  faStream,
  faTag,
  faTasks,
  faTrash,
  faTrashAlt,
  faWindowMaximize,
} from '@fortawesome/free-solid-svg-icons';

import {
  faFacebook,
  faGithub,
  faMediumM,
  faTwitter,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import { FooterComponent } from './components/footer.component';
import { TranslateModule } from '@ngx-translate/core';

library.add(
  faAddressBook,
  faAddressCard,
  faBars,
  faBook,
  faBookDead,
  faCog,
  faChartPie,
  faChevronCircleLeft,
  faDoorOpen,
  faDownload,
  faEdit,
  faEnvelope,
  faFilter,
  faHome,
  faLightbulb,
  faMinus,
  faMinusSquare,
  faNewspaper,
  faPaintBrush,
  faPlus,
  faSignOutAlt,
  faStream,
  faTag,
  faTasks,
  faTrash,
  faTrashAlt,
  faWindowMaximize,

  faFacebook,
  faGithub,
  faInstagram,
  faMediumM,
  faTwitter,
);

@NgModule({
  /**imports: [
    CommonModule,

    FormsModule,
    ReactiveFormsModule,

    FontAwesomeModule,

    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,

    DragDropModule,

  ],**/
  declarations: [FooterComponent],
  exports: [
    CommonModule,

    FormsModule,
    ReactiveFormsModule,

    FontAwesomeModule,

    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,

    DragDropModule,

    TranslateModule
  ]
})
export class SharedModule {}
