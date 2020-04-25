import { Directive, Input } from "@angular/core";
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

@Directive({
    selector: '[appSelectValidator]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: dropdownValidatorDirective,
        multi: true
    }]
})

export class dropdownValidatorDirective implements Validator{
    @Input() appSelectValidator: string;
    validate(control: AbstractControl):{[key: string]:any} | null{
        return control.value === this.appSelectValidator ? { 'defaultSelected':true}: null;
    }
}