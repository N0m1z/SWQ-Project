import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable, ReplaySubject, throwError } from 'rxjs';
import { DialogComponent } from './dialog/dialog.component';
import { INewSalutation } from './model/INewSalutation';
import { ISalutation } from './model/ISalutation';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class SalutationService {
    private _salutIsForm: boolean = false;
    private _formatSalutation = new ReplaySubject<ISalutation>(1);
    private _url: string = 'https://swq.kr31sw1chs.de/ContactSplitter';
    private _urlAddTitle: string = 'https://swq.kr31sw1chs.de/ContactSplitter/title';
    private _urlAddSal: string = 'https://swq.kr31sw1chs.de/ContactSplitter/salutation';
    private dialogRef: MatDialogRef<DialogComponent>;

    constructor(private http: HttpClient, private dialog: MatDialog) { }

    public get salutIsForm(): boolean {
        return this._salutIsForm;
    }
    public set salutIsForm(isForm: boolean) {
        this._salutIsForm = isForm;
    }
    public get formatSalutation$() {
        return this._formatSalutation.asObservable();
    }
    public set formatSalutation(sal: ISalutation) {
        this._formatSalutation.next(sal);
    }
    public get url(): string {
        return this._url;
    }
    public set url(value: string) {
        this._url = value;
    }
    public get urlAddTitle(): string {
        return this._urlAddTitle;
    }
    public set urlAddTitle(value: string) {
        this._urlAddTitle = value;
    }
    public get urlAddSal(): string {
        return this._urlAddSal;
    }
    public set urlAddSal(value: string) {
        this._urlAddSal = value;
    }

    /**
     * fills in the a new formatted salutation
     * @param sal formatted salutation
     */
    fillSalutation(sal: ISalutation) {
        this.formatSalutation = sal;
        this.salutIsForm = true;
    }

    /**
     * fetches the formatted salutation from the backend
     * @param sal salutation to be formatted
     * @returns formatted salutation as ISalutation
     */
    fetchFormSalut(sal: string): Observable<any> {
        var params = new HttpParams().set('CompleteContact', sal);
        return this.http.get(this.url, { params }).pipe(
            retry(3),
            catchError((err) => {
                this.handleError(err);
                return throwError(err);
            }));
    }

    /**
     * Formats a string to a formatted salutation
     * @param sal salutation to be formatted
     */
    goFormatSalut(sal: string) {
        this.fetchFormSalut(sal).subscribe((data) => {
            console.log(data);
            this.fillSalutation(data);
        });
    }

    /**
     * opens a dialog and shows the message
     * @param message message
     */
    openDialog(message: string) {
        this.dialogRef = this.dialog.open(DialogComponent, {
            data: { message: message },
        });
    }

    /**
     * call the API to add a new Salutation to the Backend
     * @param newSal Salutation to add
     */
    async addSalutation(newSal: INewSalutation) {
        try {
            await this.http.post(this.urlAddSal, newSal).toPromise().then(() => {
                this.openDialog('Successfully added "' + newSal.salutation + '"');
            })
        } catch (err) {
            this.openDialog('failed to add "' + newSal.salutation + '". Salutation already exists or is invalid.')
            throw err;
        }
    }

    /**
     * 
     * call the API to add a new title to the Backend
     * @param newTitle title to add
     */
    async addTitle(newTitle: string) {
        try {
            var params = new HttpParams().set('title', newTitle);
            await this.http.post(this.urlAddTitle + '?title=' + newTitle, {})
                .toPromise().then(() => {
                    this.openDialog('Successfully added "' + newTitle + '"');
                })
        } catch (err) {
            this.openDialog('failded to add "' + newTitle + '". Title already exists or is invalid.');
            throw err;
        }
    }

    /**
     * handle the error from an API call
     * @param error HttpErrorResponse Object
     */
    private handleError(error: HttpErrorResponse) {
        if (error.status === 0) {
            // A client-side or network error occurred.
            this.openDialog('A client-side or network error occurred, please check your connection.');
        } else if (error.status === 400) {
            // A error with the input occurred.
            this.openDialog('The inputstring was invalid, please check again');
        }
        else if (error.status === 500) {
            // A server-side error occurred.
            this.openDialog('There is a Problem on the backend, pleas try later again')
        }
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong.
        console.error(
            `Backend returned code ${error.status}, ` + `body was: ${error.error}`
        );
    }
}
