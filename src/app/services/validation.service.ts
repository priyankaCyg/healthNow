import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ValidationService {

  constructor() { }

  static alphabetValidator(control) {
    // Validates upper case and lower case alphabets
    if (control.value.match(/^[A-Za-z\s]+$/)) {
      return null;
    } else {
      return { invalidEntry: true };
    }
  }

  static alphabetValidator_1(control) {
    // Validates upper case alphabets
    if (control.value.match(/^[A-Z]+$/)) {
      return null;
    } else {
      return { invalidEntry: true };
    }
  }

  static alphaNumericValidator(control) {
    //Matches any alphanumeric string (no spaces).
    if (control.value.match(/^[a-zA-Z0-9]+$/)) {
      return null;
    } else {
      return { invalidEntry: true };
    }
  }

  static alphaNumericValidator_1(control) {
    //ANY alphanumeric string with spaces, commas, dashes.
    if (control.value.match(/^[a-zA-Z0-9\s.\-]+$/)) {
      return null;
    } else {
      return { invalidEntry: true };
    }
  }

  static alphaNumericValidator_2(control) {
    //Alphanumeric, hyphen apostrophe, comma dash spaces
    if (control.value.match(/^[a-zA-Z0-9\s.\-_']+$/)) {
      return null;
    } else {
      return { invalidEntry: true };
    }
  }


  static pincodeValidator(control) {
    //Validates indian pincode
    if (control.value.match(/^[1-9]{1}[0-9]{2}\\s{0, 1}[0-9]{3}$/)) {
      return null;
    } else {
      return { invalidEntry: true };
    }
  }

  static phoneNoValidator(control) {
    //Validates mobile numbers
    if (control.value.match(/^\\d{10}$/)) {
      return null;
    } else {
      return { invalidEntry: true };
    }
  }

  static integerValidator(control) {
    //Validates only integer numbers
    if (control.value.match(/^[0-9]*$/)) {
      return null;
    } else {
      return { invalidEntry: true };
    }
  }

  // static emailValidator(control) {
  //   //Email validator
  //   if (
  //     control.value.match(
  //       /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  //     )
  //   ) {
  //     return null;
  //   } else {
  //     return { invalidEmailAddress: true };
  //   }
  // }

  // static passwordValidator(control) {
  //   // {6,100}           - Assert password is between 6 and 100 characters
  //   // (?=.*[0-9])       - Assert a string has at least one number
  //   if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
  //     return null;
  //   } else {
  //     return { invalidPassword: true };
  //   }
  // }

  // static creditCardValidator(control) {
  //   // Visa, MasterCard, American Express, Diners Club, Discover, JCB
  //   if (
  //     control.value.match(
  //       /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/
  //     )
  //   ) {
  //     return null;
  //   } else {
  //     return { invalidCreditCard: true };
  //   }
  // }
}