import { Directive, Input } from '@angular/core';
import { FormControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
    selector: '[appUniqueValidator]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: UniqueValidatorDirective,
            multi: true
        }
    ]
})
export class UniqueValidatorDirective implements Validator {

    // tslint:disable-next-line: no-input-rename
    @Input('annotationList') public annotationList: any[];

    validate(control: FormControl): ValidationErrors | null {
        if (control.dirty || control.touched || control.value) {
            const controlValue = control.value;
            if (controlValue && this.annotationList.findIndex(
                annotator => annotator && controlValue === annotator) !== -1) {
                return {
                    isDuplicate: true
                };
            }
        }
        return null;
    }
}
