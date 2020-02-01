import { Component, OnInit, Inject } from '@angular/core';
import { UserProfile } from 'src/app/models/user-profile';
import { AccountService } from 'src/app/core/account.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProjectService } from 'src/app/core/project.service';
import { UserPermission } from 'src/app/models/user-permission';

@Component({
  selector: 'app-add-project-user-dialog',
  templateUrl: './add-project-user-dialog.component.html',
  styles: []
})
export class AddProjectUserDialogComponent implements OnInit {
  allUsers: UserProfile[];
  unassociatedUsers: UserProfile[] = [];
  selectedUser: any;
  permission = 'View';
  projectId: number;
  error: string;

  constructor(
    private accountService: AccountService,
    public dialogRef: MatDialogRef<AddProjectUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private projectService: ProjectService
  ) {
    this.projectId = data.projectId;
  }

  ngOnInit() {
    this.accountService.getAllUsers().subscribe(all => {
      this.allUsers = all;
      this.projectService.getProjectUsers(this.projectId).subscribe(pu => {
        this.allUsers.forEach(u => {
          const projectUser = pu.find(pu2 => pu2.id == u.id);
          if (!projectUser) {
            this.unassociatedUsers.push(u);
          }
        });
      });
    });
  }

  add() {
    if (!this.selectedUser) {
      this.error = 'You must select a user to add';
    } else {
      const perm = new UserPermission();
      perm.userProfileId = this.selectedUser.id;
      perm.value = this.permission;
      perm.projectId = this.projectId;
      this.projectService.addUserPermission(perm).subscribe(
        result => {
          this.dialogRef.close(true);
        });
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
