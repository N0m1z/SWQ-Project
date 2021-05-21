import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SalutationService } from '../salutation.service';

@Component({
    selector: 'app-add-sal',
    templateUrl: './add-sal.component.html',
    styleUrls: ['./add-sal.component.scss'],
})
export class AddSalComponent implements OnInit {
    newSalutation: FormGroup;

    constructor(public salutationService: SalutationService,
        private fb: FormBuilder) { }

    ngOnInit(): void {
        this.buildForm();
    }


    /**
     * builds the Form to add a salutation
     */
    private buildForm() {
        this.newSalutation = this.fb.group({
            language: [''],
            salutation: [''],
            gender: ['2'],
            letterSalutation: [''],
        });
    }

    /**
     * Checks the error in salutation and returns it as a string
     *
     * @returns Error Message as string
     */
    getErrorMessage() {
        if (this.newSalutation.hasError('required')) {
            return 'You have to enter a salutation';
        }
        return this.newSalutation.hasError('salutation')
            ? 'Not a valid salutation'
            : '';
    }

    /**
     * adds a Salutation to the recognize list 
     */
    async addSalutation() {
        try {
            await this.salutationService.addSalutation(this.newSalutation.value);
        } catch (err) {
            console.error(err);
        }
    }
}
