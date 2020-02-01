import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Project } from '../models/project';
import { ProjectService } from '../core/project.service';
import { ErrorHandlerService } from '../core/errorHandler.service';
import { error } from 'util';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styles: []
})
export class ProjectListComponent implements OnInit {

  displayedColumns = ['name'];
  dataSource = new MatTableDataSource();
  projects: Project[];

  constructor(private projectService: ProjectService, protected errorHandler: ErrorHandlerService) { }

  ngOnInit() {
    this.projectService.getProjects().subscribe(p => {
      this.projects = p;
      this.dataSource.data = p;
    });
  }
}
