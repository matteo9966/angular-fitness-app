import { Optional, Provider } from "@angular/core";
import { ControlContainer, NgForm, NgModelGroup } from "@angular/forms";
/**
 * @description in order to create a sub-form (a form with ngFormGroup) used inside a form,
 * you must provide a ControlContainer to prevent the angular error
 * `Template parse errors: No provider for ControlContainer (“[ERROR ->]<fieldset ngModelGroup=”address”>`
 */
export const formViewProvider: Provider = {
    provide: ControlContainer,
    useFactory: _formViewProviderFactory,
    deps: [
      [new Optional(), NgForm],
      [new Optional(), NgModelGroup]
    ]
  };
   
  export function _formViewProviderFactory(
    ngForm: NgForm, ngModelGroup: NgModelGroup
  ) {
    return ngModelGroup || ngForm || null;
  }