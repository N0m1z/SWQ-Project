import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ISalutation } from '../model/ISalutation';
import { SalutationService } from '../salutation.service';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
    selector: 'app-output',
    templateUrl: './output.component.html',
    styleUrls: ['./output.component.scss'],
})
export class OutputComponent implements OnInit {
    private _letterSalutation: string;
    public salutationForm: FormGroup;
    private sub: Subscription;

    constructor(
        private fb: FormBuilder,
        public salutationService: SalutationService,
        private clipboard: Clipboard
    ) { }

    ngOnInit(): void {
        this.buildForm();
        this.salutationService.formatSalutation$.subscribe((fSalutation) => {
            this.fillForm(fSalutation);
        });
        this.salutationForm.valueChanges.subscribe(() => {
            this.generateFullLetterSalutation();
        })
    }

    public get letterSalutation(): string {
        return this._letterSalutation;
    }
    public set letterSalutation(salutation: string) {
        this._letterSalutation = salutation;
    }

    /**
     * builds the Form to edit the formatted salutation
     */
    private buildForm() {
        this.salutationForm = this.fb.group({
            firstname: [''],
            gender: [''],
            language: [''],
            lastname: [''],
            letterSalutation: [''],
            salutation: [''],
            salutationTitle: [''],
            title: ['']
        });
    }

    /**
     * Fill the formatted Salutation in the Form
     * @param fSalut Formatted Salutation
     */
    private fillForm(fSalut: ISalutation) {
        this.salutationForm.setValue({
            firstname: fSalut.firstname,
            gender: fSalut.gender,
            // language: fSalut.language,
            language: this.convertLanguage(fSalut.language),
            lastname: fSalut.lastname,
            letterSalutation: fSalut.letterSalutation,
            salutation: fSalut.salutation,
            salutationTitle: fSalut.salutationTitle,
            title: fSalut.title,
        });
    }

    /**
     * converts a language to the according number
     * @param lang language to convert into number
     * @returns number
     */
    convertLanguage(lang: string) {
        switch (lang) {
            case "German": {
                return 0;
                break;
            }
            case "French": {
                return 1;
                break;
            }
            case "English": {
                return 2;
                break;
            }
            case "Spain": {
                return 3;
                break;
            }
            case "Italian": {
                return 4;
                break;
            }
            default:
                return "";
                break;
        }
    }

    /**
     * checks if the Form Group Field if it is null or empty
     * @param field field of the FormGroup
     * @returns boolean - true if empty
     */
    private checkFieldIfEmpty(field: string): boolean {
        var empty = false;
        if (
            this.salutationForm.get(field).value == null ||
            this.salutationForm.get(field).value == ''
        ) {
            empty = true;
        }
        return empty;
    }

    /**
     * creates the letter salutation as string
     * first method ist for a static string - second is for editing 
     */
    private generateFullLetterSalutation() {
        var salutation = '';
        if (!this.checkFieldIfEmpty('letterSalutation')) {
            salutation = this.salutationForm.get('letterSalutation').value;
        }
        if (!this.checkFieldIfEmpty('firstname')) {
            salutation =
                salutation + ' ' + this.salutationForm.get('firstname').value;
        }
        if (!this.checkFieldIfEmpty('lastname')) {
            salutation = salutation + ' ' + this.salutationForm.get('lastname').value;
        }
        this.letterSalutation = salutation;
    }

    /**
     * copy the letter salutation into the clipboard
     */
    public copyLetterSal() {
        this.clipboard.copy(this.letterSalutation);
    }
}
