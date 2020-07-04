import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})

export class ValidationService {

  constructor() { }

  static telephoneNoValidator(control) {
    if (control.value == "") {
      return { Msg: "This field is required" };
    }
    //Allows only numbers
    else if (!control.value.match(/^[0-9]+$/)) {
      // return null;
      return { Msg: "Enter a valid Tele No." };
    }
    else if (control.value.length > 13 || control.value.length < 10) {
      return { Msg: "Tele No. should be 10 to 13 digit" };
    }
  }

  static faxNoValidator(control) {
    if (control.value == "") {
      return { Msg: "This field is required" };
    }
    //Allows only numbers
    else if (!control.value.match(/^[0-9]+$/)) {
      return { Msg: "Enter a valid Fax No." };
    }
    else if (control.value.length > 13 || control.value.length < 10) {
      return { Msg: "Fax No. should be 10 to 13 digit" };
    }
  }

  static addressValidator(control) {
    if (control.value == "") {
      return { Msg: "This field is required" };
    }
    // Allows uppercase lowercase alphabets, numbers, space, dot, hiphen, slash, comma, round brackets
    else if (!control.value.match(/^[a-zA-Z0-9\s.\-\,\()\/\\]+$/)) {
      return { Msg: "Enter a valid address" };
    }
  }

  static pincodeValidator(control) {
    if (control.value == "") {
      return { Msg: "This field is required" };
    }
    //Allows only numbers
    else if (!control.value.match(/^[0-9]*$/)) {
      return { Msg: "Enter a valid pincode" };
    }
    else if (control.value.length != 6) {
      return { Msg: "Enter a 6 digit pincode" };
    }
  }

  static nameValidator_space(control) {
    if (control.value == "") {
      return { Msg: "This field is required" };
    }
    //Allows both uppercase and lowercase alphabets and space
    else if (!control.value.match(/^[a-zA-Z\s]+$/)) {
      return { Msg: "Enter a valid name" };
    }
  }

  static nameValidator(control) {
    if (control.value == "") {
      return { Msg: "This field is required" };
    }
    //Allows both uppercase and lowercase alphabets
    else if (!control.value.match(/^[a-zA-Z]+$/)) {
      return { Msg: "Enter a valid name" };
    }
  }

  //used for PAN no, GST, IFSC, Short code
  static alphaNumericValidator(control) {
    if (control.value == "") {
      return { Msg: "This field is required" };
    }
    //Allows uppercase alphabets and numbers
    else if (!control.value.match(/^[A-Z0-9]+$/)) {
      return { Msg: "Only Uppercase alpha numeric is allowed" };
    }
  }

  static accountValidator(control) {
    if (control.value == "") {
      return { Msg: "This field is required" };
    }
    //Allows only numbers
    else if (!control.value.match(/^[0-9]*$/)) {
      return { Msg: "Enter a valid Account No." };
    }
   
  }
  
  static accountTypeValidator(control) {
    if (control.value == "") {
      return { Msg: "This field is required" };
    }
    //Allows only numbers
    else if (!control.value.match(/^[a-zA-z\-\s]*$/)) {
      return { Msg: "Enter a valid Short Code/Account Type." };
    }
   
  }

  // ********************* Testing modules below  **********************
  
  // static alphabetValidator_1(control) {
  //   // Validates upper case alphabets
  //   if (control.value.match(/^[A-Z]+$/)) {
  //     return null;
  //   } else {
  //     return { invalidEntry: true };
  //   }
  // }

  // static alphaNumericValidator_0(control) {
  //   //Matches any alphanumeric string (no spaces).
  //   if (control.value.match(/^[a-zA-Z0-9]+$/)) {
  //     return null;
  //   } else {
  //     return { invalidEntry: true };
  //   }
  // }

  // static alphaNumericValidator_1(control) {
  //   //ANY alphanumeric string with spaces, commas, dashes.
  //   if (control.value.match(/^[a-zA-Z0-9\s.\-]+$/)) {
  //     return null;
  //   } else {
  //     return { invalidEntry: true };
  //   }
  // }



  // static alphaNumericValidator_2(control) {
  //   //Alphanumeric, hyphen apostrophe, comma dash spaces
  //   if (control.value.match(/^[a-zA-Z0-9\s.\-_']+$/)) {
  //     return null;
  //   } else {
  //     return { invalidEntry: true };
  //   }
  // }



  // static phoneNoValidator(control) {
  //   //Validates mobile numbers
  //   if (control.value.match(/^\\d{10}$/)) {
  //     return null;
  //   } else {
  //     return { invalidEntry: true };
  //   }
  // }

  // static integerValidator(control) {
  //   //Validates only integer numbers
  //   if (control.value.match(/^[0-9]*$/)) {
  //     return null;
  //   } else {
  //     return { invalidEntry: true };
  //   }
  // }

  // static numberLengthValidator(control) {
  //   //Validates only integer numbers
  //   if (control.value.length >= 10 && control.value.length <= 12) {
  //     return null;
  //   } else {
  //     return { invalidEntry: true };
  //   }
  // }
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

  // static numeric(control: AbstractControl) {
  //   let val = control.value;

  //   // if (val === null || val === '') return null;

  //   if (!val.toString().match(/^[0-9]+(\.?[0-9]+)?$/)) return { 'invalidNumber': true };

  //   return null;
  // }
}
