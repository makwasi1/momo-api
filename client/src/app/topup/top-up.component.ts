import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
    animal: string;
    name: string;
  }


@Component({
    selector: 'top-up',
    templateUrl: './topup.component.html',
    styleUrls: ['./top-up.component.css']
})
export class TopUpComponent implements OnInit {
    constructor(
        public dialog: MatDialog,
        public dialogRef: MatDialogRef<TopUpComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }

    ngOnInit(): void { }

    onNoClick(): void {
        this.dialogRef.close();
      }

      close() {
        this.dialogRef.close("Thanks for using me!");
      }

}
