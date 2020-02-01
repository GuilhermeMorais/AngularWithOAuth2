import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { Milestone } from '../models/Milestone';
import { MilestoneStatus } from '../models/milestone-status';
import { Project } from '../models/project';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../core/project.service';
import { AddEditMilestoneDialogComponent } from './add-edit-milestone-dialog/add-edit-milestone-dialog.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { Constants } from '../constants';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',

  styles: [
    `
    .add-button {
      position: fixed;
      bottom: 0;
      right: 0;
      margin-right: 10px;
      margin-bottom: 10px;
    }
    .error-text {
      color: red;
    }
    .space-button{
      margin-right: 8px;
    }
    `
  ]
})
export class ProjectComponent implements OnInit {

  protected displayedColumns = ['name', 'status', 'actions'];
  protected dataSource = new MatTableDataSource();
  protected milestones: Milestone[];
  protected milestoneStatuses: MilestoneStatus[];
  protected project: Project;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    var projectId = this.route.snapshot.params.projectId;
    this.projectService.getMilestoneStatuses().subscribe(ms => {
      this.milestoneStatuses = ms;
    });

    this.projectService.getProject(projectId).subscribe(p => {
      this.project = p;
      this.milestones = p.milestones;
      this.dataSource.data = this.milestones;
    });
  }

  getStatusName(id: Number) {
    if (!this.milestoneStatuses) {
      return '';
    }

    var status = this.milestoneStatuses.find(ms => ms.id == id);
    return status ? status.name : 'unknown';
  }

  addMilestone() {
    var newMs = new Milestone();
    newMs.projectId = this.project.id;
    const dialogRef = this.dialog.open(AddEditMilestoneDialogComponent, {
      width: Constants.SizePopup,
      data: {
        milestone: newMs,
        milestoneStatuses: this.milestoneStatuses,
        defaultStatus: this.milestoneStatuses[0],
        mode: 'Add'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.projectService.addMilestone(result).subscribe(() => {
          this.ngOnInit();
        })
      }
    });
  }

  editMilestone(milestone: Milestone) {
    var cloned = JSON.parse(JSON.stringify(milestone));
    const dialogRef = this.dialog.open(AddEditMilestoneDialogComponent, {
      width: Constants.SizePopup,
      data: {
        milestone: cloned,
        milestoneStatuses: this.milestoneStatuses,
        defaultStatus: this.milestoneStatuses.find(ms => ms.id == milestone.milestoneStatusId),
        mode: 'Edit'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.projectService.updateMilestone(result).subscribe(() => {
          this.ngOnInit();
        });
      }
    });
  }

  deleteMilestone(milestone: Milestone) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: Constants.SizePopup,
      data: { entityName: 'Milestone', message: `Are you sure you want to delete milestone?`, target: milestone.name }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.projectService.deleteMilestone(milestone.id).subscribe(() => {
          this.ngOnInit();
        });
      }
    });
  }

}
