import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-project-dialog',
  templateUrl: './add-project-dialog.component.html',
  styles: []
})
export class AddProjectDialogComponent implements OnInit {
  error: string;
  constructor(public dialogRef: MatDialogRef<AddProjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() { }

  cancel() {
    this.dialogRef.close();
  }

  add() {
    if (this.data.name) {
      this.dialogRef.close(this.data.name);
    } else {
      this.error = 'Please enter a name for the project.';
    }
  }
}
