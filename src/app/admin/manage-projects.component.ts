import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { Project } from '../models/project';
import { ProjectService } from '../core/project.service';
import { AddProjectDialogComponent } from './add-project-dialog/add-project-dialog.component';
import { Constants } from '../constants';
import { DeleteDialogComponent } from '../projects/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-manage-projects',
  templateUrl: './manage-projects.component.html',
  styles: [`
    .add-button {
      position: fixed;
      bottom: 0;
      right: 0;
      margin-right: 10px;
      margin-bottom: 10px;
    }
    .space-button{
      margin-right: 8px;
    }
  `
  ]
})
export class ManageProjectsComponent implements OnInit {

  displayedColumns = ['name', 'actions'];
  dataSource = new MatTableDataSource();
  projects: Project[];

  constructor(private projectService: ProjectService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.projectService.getProjects().subscribe(ps => {
      this.projects = ps;
      this.dataSource.data = ps;
    });
  }

  applyFiler(filterValue: string) {
    filterValue = filterValue.trim().toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }

  addProject() {
    const dialogRef = this.dialog.open(AddProjectDialogComponent, {
      width: Constants.SizePopup,
      data: { name: '' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        const newProj = new Project();
        newProj.name = result;
        this.projectService.addProject(newProj).subscribe(p => {
          this.projects.push(p);
          this.dataSource.data = this.projects;
        });
      }
    });
  }

  deleteProject(project: Project) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: Constants.SizePopup,
      data: { entityName: 'Project', message: 'Are you sure you want to delete project?', target: project.name }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.projectService.deleteProject(project).subscribe(() => {
          this.ngOnInit();
        });
      }
    });
  }
}
