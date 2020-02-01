import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatToolbarModule,
  MatDialogModule,
  MatTableModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatIcon
} from '@angular/material'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ContactUsComponent } from './home/contact-us.component';
import { ProjectComponent } from './projects/project.component';
import { AddEditMilestoneDialogComponent } from './projects/add-edit-milestone-dialog/add-edit-milestone-dialog.component';
import { ProjectListComponent } from './projects/project-list.component';
import { CoreModule } from './core/core.module';
import { DeleteDialogComponent } from './projects/delete-dialog/delete-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactUsComponent,
    ProjectComponent,
    AddEditMilestoneDialogComponent,
    ProjectListComponent,
    DeleteDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    CoreModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AddEditMilestoneDialogComponent, DeleteDialogComponent]
})
export class AppModule { }
