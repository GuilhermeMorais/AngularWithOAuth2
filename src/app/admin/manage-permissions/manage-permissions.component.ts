import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/core/project.service';
import { Project } from 'src/app/models/project';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from 'src/app/core/account.service';
import { UserProfile } from 'src/app/models/user-profile';
import { Constants } from 'src/app/constants';
import { AddProjectUserDialogComponent } from '../add-project-user-dialog/add-project-user-dialog.component';
import { DeleteDialogComponent } from 'src/app/projects/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-manage-permissions',
  templateUrl: './manage-permissions.component.html',
  styles: [`
    .add-button {
      position: fixed;
      bottom: 0;
      right: 0;
      margin-right: 10px;
      margin-bottom: 10px;
    }
  `]
})
export class ManagePermissionsComponent implements OnInit {

  projectId: number;
  project: Project;
  users: any | UserProfile[] = [];
  displayedColumns = ['username', 'email', 'permission', 'actions'];
  dataSource = new MatTableDataSource();

  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService,
    private projectService: ProjectService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.projectId = parseInt(this.route.snapshot.params.projectId);
    this.projectService.getProject(this.projectId).subscribe(p => {
      this.project = p;
      this.accountService.getAllUsers().subscribe(users => {
        this.projectService.getProjectUsers(this.projectId).subscribe(users2 => {
          this.users = users2;
          this.users.forEach(u => {
            if (u.userPermissions) {
              u.permission = u.userPermissions.find(up => up.projectId == this.projectId);
            }
          });
          this.dataSource.data = users2;
        });
      });
    });
  }

  addUser() {
    const dialogRef = this.dialog.open(AddProjectUserDialogComponent, {
      width: Constants.SizePopup,
      data: { projectId: this.projectId }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.ngOnInit();
      }
    });
  }

  removeUser(user: UserProfile) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: Constants.SizePopup,
      data: {
        entityName: 'User',
        message: `Are you sure you want to remove user ${user.firstName} ${user.lastName} from this project?`
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.projectService
          .removeUserPermission(user.id, this.projectId)
          .subscribe(() => {
            this.users.splice(this.users.indexOf(u => u.id === user.id), 1);
            this.dataSource.data = this.users;
          });
      }
    });
  }

  onPermissionChanged(user: any) {
    this.projectService.updateUserPermission(user.permission).subscribe(() => {
    });
  }

}
