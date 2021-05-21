import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { SalutationService } from '../salutation.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  constructor(public salutationService: SalutationService) {}

  salutation = new FormControl('', [Validators.required]);

  ngOnInit(): void {}

  /**
   * Checks the error in salutation and returns it as a string
   *
   * @returns Error Message as string
   */
  getErrorMessage() {
    if (this.salutation.hasError('required')) {
      return 'You have to enter a salutation';
    }
    return this.salutation.hasError('salutation')
      ? 'Not a valid salutation'
      : '';
  }

  /**
   * formats the salutation
   */
  formatSalutation() {
    this.salutationService.goFormatSalut(this.salutation.value);
  }
}
