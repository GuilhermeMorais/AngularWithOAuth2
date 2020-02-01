import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatTableModule,
  MatToolbarModule,
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { ManageProjectsComponent } from './manage-projects.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ManagePermissionsComponent } from './manage-permissions/manage-permissions.component';
import { AddProjectDialogComponent } from './add-project-dialog/add-project-dialog.component';
import { AddProjectUserDialogComponent } from './add-project-user-dialog/add-project-user-dialog.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
    MatToolbarModule,
    MatTableModule,
    MatInputModule,
    MatSelectModule,
    AdminRoutingModule
  ],
  exports: [],
  declarations: [
    ManageProjectsComponent,
    ManagePermissionsComponent,
    AddProjectDialogComponent,
    AddProjectUserDialogComponent
  ],
  providers: [],
  entryComponents: [
    AddProjectDialogComponent,
    AddProjectUserDialogComponent
  ]
})
export class AdminModule { }
