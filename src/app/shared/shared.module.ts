import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatSidenavModule,
  MatTabsModule,
  MatToolbarModule
} from '@angular/material';
import { NewListComponent } from './modals/new-list/new-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatTabsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule
  ],
  declarations: [NewListComponent],
  entryComponents: [NewListComponent],
  exports: [
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatTabsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule
  ]
})
export class SharedModule {}
