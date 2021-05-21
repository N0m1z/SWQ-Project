import { Component, Inject, OnInit } from '@angular/core';
import { inject } from '@angular/core/testing';
import {
    MatDialog,
    MatDialogConfig,
    MatDialogRef,
    MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
    private _message: string = '';

    constructor(
        private dialogRef: MatDialogRef<DialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data
    ) {
        this.message = data.message;
    }

    public get message(): string {
        return this._message;
    }
    public set message(mes: string) {
        this._message = mes;
    }

    ngOnInit(): void { }

    close() {
        this.dialogRef.close();
    }
}
