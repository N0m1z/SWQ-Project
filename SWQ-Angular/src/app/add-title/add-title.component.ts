import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DialogRole, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { SalutationService } from '../salutation.service';

@Component({
    selector: 'app-add-title',
    templateUrl: './add-title.component.html',
    styleUrls: ['./add-title.component.scss']
})
export class AddTitleComponent implements OnInit {
    newTitle = new FormControl('');

    constructor(public salutationService: SalutationService) { }

    ngOnInit(): void { }

    /**
     * Checks the error in salutation and returns it as a string
     *
     * @returns Error Message as string
     */
    getErrorMessage() {
        if (this.newTitle.hasError('required')) {
            return 'You have to enter a title';
        }
        return this.newTitle.hasError('title')
            ? 'Not a valid title'
            : '';
    }

    /**
     * adds the title to the recognize list
     */
    async addTitle() {
        try {
            await this.salutationService.addTitle(this.newTitle.value);
        } catch (err) {
            console.error(err);
        }
    }
}

