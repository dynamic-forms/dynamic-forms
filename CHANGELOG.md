# Changelog

## 17.0.0-rc.0 (2023-12-13)

* **core:** update to angular 17
* **bootstrap:** update to angular 17
* **material:** update to angular and angular material 17
* **markdown:** update to angular 17 and marked 9

## 17.0.0-next.0 (2023-12-10)

### Features

* **core:** update to angular 17 (release candidate)
* **bootstrap:** update to angular 17 (release candidate)
* **material:** update to angular and angular material 17 (release candidate)
* **markdown:** update to angular 17 (release candidate) and marked 9

## 16.0.0 (2023-05-05)

### Features

* **core:** update to angular 16
* **bootstrap:** update to angular 16
* **material:** update to angular and angular material 16
* **markdown:** update to angular 16

## 16.0.0-rc.1 (2023-04-25)

### Features

* **core:** support of action link
* **bootstrap:** implementation of button and icon link
* **material:** implementation of button and icon link

## 16.0.0-rc.0 (2023-04-14)

### Features

* **core:** update to angular 16 (release candidate)
* **bootstrap:** update to angular 16 (release candidate)
* **material:** update to angular and angular material 16 (release candidate)
* **markdown:** update to angular 16 (release candidate)

## 16.0.0-next.5 (2023-04-10)

### Features

* **core:** support of method ```clear()``` for ```DynamicFormField``` 
* **bootstrap:** implementation of ```DynamicFormControlAddOn``` suffix for datepicker and file
* **material:** implementation of ```DynamicFormControlAddOn``` suffix for datepicker and file

### Bug Fixes

* **bootstrap:** fixed issue of file input component not opening file dialog

## 16.0.0-next.4 (2023-04-03)

### Features

* **core:** support of floating label
* **bootstrap:** implementation of floating label for combobox, datepicker, file, numberbox, select, textarea and textbox
* **material:** implementation of floating label for combobox, datepicker, file, numberbox, select, textarea and textbox

## 16.0.0-next.3 (2023-03-24)

### Features

* **core:** extension of ```DynamicFormElementExpressionData```, ```DynamicFormFieldExpressionData``` and ```DynamicFormActionExpressionData``` with properties ```hidden```, ```disabled``` (only action and field) and ```readonly``` (only field)
* **core:** introduction of ```DynamicFormTextboxModule``` with action handler ```dynamicFormTextboxToggleAsTextTypeHandler``` to toggle textbox as text type (can be used for textbox add-on to show / hide password in example)

## 16.0.0-next.2 (2023-03-21)

### Features

* **core:** support of ```DynamicFormElement``` or ```DynamicFormAction``` as ```DynamicFormControlAddOn``` for ```DynamicFormControl``` (prefix and / or suffix)
* **core:** support of hidden ```DynamicFormElement``` and ```DynamicFormElementBase``` and improvements regarding hidden elements, actions and fields by using attribute instead of CSS class
* **core:** introduction of ```DynamicFormTextModule``` and ```DynamicFormTextComponent``` to render plain text
* **bootstrap:** implementation of ```DynamicFormControlAddOn``` for combobox, datepicker, file, numberbox, select, textarea and textbox
* **material:** implementation of ```DynamicFormControlAddOn``` for combobox, datepicker, file, numberbox, select, textarea and textbox

## 16.0.0-next.1 (2023-03-09)

### Bug Fixes

* **material:** fixed peer dependency version for @angular/core which was ^^16.0.0-next.0 instead of ^16.0.0-next.0

## 16.0.0-next.0 (2023-03-09)

### Features

* **core:** update to angular 16 (next version)
* **bootstrap:** update to angular 16 (next version)
* **material:** update to angular and angular material 16 (next version)
* **markdown:** update to angular 16 (next version)

### General

* update of peer dependencies: bootstrap (5.2.3) and marked (4.2.12)

## 15.1.0 (2023-03-05)

* **core:** introduction of ```DynamicFormFileModule``` exporting ```DynamicFormFileDirective``` to support reactive file input in combination with base class ```DynamicFormFileBase``` (provides functionality for using ```DynamicFormAction``` to open file explorer)
* **bootstrap:** implementation of ```BsDynamicFormFileComponent``` exported in ```BsDynamicFormFileModule```
* **material:** implementation of ```MatDynamicFormFileComponent``` exported in ```MatDynamicFormFileModule```

## 15.1.0-next.1 (2023-02-27)

### Features

* **core:** introduction of ```DynamicFormThemeModule``` providing ```DynamicFormColorService``` and ```DynamicFormColorPipe``` to support colors for buttons and icons via template  
* **bootstrap:** implementation of button and icon colors using ```DynamicFormColorPipe```
* **material:** implementation of button and icon colors using ```DynamicFormColorPipe```

## 15.1.0-next.0 (2023-02-15)

### Features

* **core:** improvements regarding type of dynamic form elements (dynamic form builder resolves component type information before instantiation)
* **core:** introduction of ```DynamicFormErrorModule``` providing ```DynamicFormErrorHandler``` and ```DynamicFormLogger``` to improve error handling / logging of invalid form definition

### Breaking Changes

* **core:** type for ```DynamicFormIdBuilder``` and its token ```DYNAMIC_FORM_ID_BUILDER``` is now an object with method ```createId()``` instead of a function returning an id
* **core:** ```DynamicFormElement``` (and its derived classes ```DynamicFormField```, ```DynamicFormAction```, etc.) has new generic parameter ```Type extends DynamicFormElementType``` and new constructor parameter ```type: Type``` to improve type information (includes component type)

### Bug Fixes

* **core:** fixed field wrapper issue by not wrapping input components with wrappers of the field definition which belongs to the input
* **demo:** fixed tab `Value` for examples and editor by using usage form value instead of from model

## 15.0.0 (2023-02-02)

* **core:** release of library using angular 15
* **bootstrap:** release of library using angular 15
* **material:** release of library using angular material 15
* **markdown:** release of library using angular 15

## 15.0.0-rc.0 (2023-02-02)

* **core:** release candidate of library using angular 15
* **bootstrap:** release candidate of library using angular 15
* **material:** release candidate of library using angular material 15
* **markdown:** release candidate of library using angular 15

## 15.0.0-next.0 (2022-11-19)

### Features

* **core:** preview of library using angular 15
* **bootstrap:** preview of library using angular 15
* **material:** preview of library using angular material 15
* **markdown:** preview of library using angular 15

### General

* update of peer dependencies: bootstrap (5.2.2) and marked (4.2.2)

## 14.1.0 (2022-06-24)

* **markdown:** release of library using angular 14 and marked

## 14.1.0-rc.1 (2022-06-24)

### Features

* **core:** added ```valueChange``` emitter to ```DynamicFormComponent```

## 14.0.2 (2022-06-23)

### Features

* **core:** added ```valueChange``` emitter to ```DynamicFormComponent```

## 14.1.0-next.1 (2022-06-20)

### Breaking Changes

* **core:** made use of [typed reactive forms](https://angular.io/guide/typed-forms) by adding generic parameters ```Value = any, Model extends Value = Value``` to abstract classes ```DynamicFormField```, ```DynamicFormFieldBase```, ```DynamicFormFieldWrapperBase``` and its derived classes / components for form controls / inputs, groups, arrays and dictionarys

## 14.1.0-next.0 (2022-06-19)

### Features

* **markdown:** created library by extracting markdown module from core

### Breaking Changes

* **core:** removed markdown module and peer dependency to marked (import ```DynamicFormMarkdownModule``` from ```@dynamic-forms/markdown``` instead of ```@dynamic-forms/core```)

## 14.0.1 (2022-06-07)

### Features

* **core:** styles for markdown (file ```markdown.scss``` in directory ```assets/scss```)

## 14.0.0 (2022-06-04)

### Features

* **core:** release of library using angular 14
* **bootstrap:** release of library using angular 14
* **material:** release of library using angular material 14

## 14.0.0-rc.1 (2022-05-24)

### Features

* **core:** release candidate of library using angular 14
* **bootstrap:** release candidate of library using angular 14
* **material:** release candidate of library using angular material 14

## 14.0.0-next.1 (2022-04-26)

### Features

* **core:** next version of library using angular 14
* **bootstrap:** next version of library using angular 14
* **material:** next version of library using angular material 14

## 14.0.0-next.0 (2022-04-25)

### Features

* **core:** next version of library using angular 14
* **bootstrap:** next version of library using angular 14
* **material:** next version of library using angular material 14

### Breaking Changes

* **bootstrap:** removed ```DynamicFormMarkdownModule``` from imports of ```BsDynamicFormsModule``` to get rid of implicit dependency to ```marked``` library (use explicit import instead)
* **material:** removed ```DynamicFormMarkdownModule``` from imports of ```MatDynamicFormsModule``` to get rid of implicit dependency to ```marked``` library (use explicit import instead)

## 13.0.0 (2022-01-15)

### Features

* **core:** update of marked (4.0.10) to fix vulnerability

## 13.0.0-rc.0 (2022-01-15)

### Features

* **core:** release candidate of library using angular 13
* **bootstrap:** release candidate of library using angular 13
* **material:** release candidate of library using angular material 13

## 13.0.0-next.1 (2022-01-14)

### Features

* **core:** next version of library using angular 13
* **bootstrap:** next version of library using angular 13
* **material:** next version of library using angular material 13

### General

* update of peer dependencies: angular (13.1.2) to include compiler-cli fix [#44587](https://github.com/angular/angular/pull/44587)
* update of peer dependencies: tslib (2.3.0), rxjs (7.4.0) and marked (4.0.0)

### Breaking Changes

* **core:** constructor of ```DynamicFormFieldValidatorBase``` (and its derived classes ```DynamicFormFieldValidator``` and ```DynamicFormFieldAsyncValidator```) has new sequence for parameters (parameter for factory was moved from last to first place)
* **core:** constructor of ```DynamicFormFieldValidatorBase``` (and its derived classes ```DynamicFormFieldValidator``` and ```DynamicFormFieldAsyncValidator```) has new parameter ```deps``` to support dependencies (like ```HttpClient```) which can be provided in the registration of validator types within ```DynamicFormValidationModule``` (see basic interfaces ```DynamicFormFieldValidatorType``` and ```DynamicFormFieldAsyncValidatorType```)

### Feature

* **core:** support of async validators

## 13.0.0-next.0 (2021-11-07)

### Features

* **core:** next version of library using angular 13 (next)
* **bootstrap:** next version of library using angular 13 (next)
* **material:** next version of library using angular material 13 (next)

### Breaking Changes

* **core:** constructor of ```DynamicFormElement``` (and its derived classes like ```DynamicFormAction``` and ```DynamicFormField```) has new parameter for ```DynamicFormBuilder``` to support updates of expressions, children, actions, validators, etc. from within the classes (especially in new method ```init()```)
* **core:** improved ```DynamicFormBuilder``` by using the method ```init()``` of ```DynamicFormElement``` for initialization

### Bug Fixes

* **core:** improved method ```resetDefault()``` of class ```DynamicFormArray``` to reflect the length of children that result from either the default length or the length of the default value
* **core:** improved method ```resetDefault()``` of class ```DynamicFormDictionary``` to reflect the length of children that result from either the length of default keys or the length of keys from the default value

### Feature

* **core:** method ```resetEmpty()``` of ```DynamicFormArray``` clears children and sets model / value to an empty array
* **core:** method ```resetEmpty()``` of ```DynamicFormDictionary``` clears children and sets model / value to an empty object

## 12.1.1 (2021-05-16)

### Bug Fixes

* **material:** fixed template of dynamic form dialog

## 11.1.1 (2021-05-16)

### Bug Fixes

* **material:** fixed template of dynamic form dialog

## 10.0.2 (2021-05-16)

### Bug Fixes

* **material:** fixed package version

## 12.0.1 (2021-05-16)

### Bug Fixes

* **material:** fixed template of dynamic form dialog

## 11.0.1 (2021-05-16)

### Bug Fixes

* **material:** fixed template of dynamic form dialog

## 10.0.1 (2021-05-16)

### Bug Fixes

* **material:** fixed template of dynamic form dialog

## 9.0.1 (2021-05-16)

### Bug Fixes

* **material:** fixed template of dynamic form dialog

## 8.0.1 (2021-05-16)

### Bug Fixes

* **material:** fixed template of dynamic form dialog

## 12.1.0 (2021-05-13)

### Features

* **core:** use boostrap 5
* **bootstrap:** use boostrap 5

## 11.1.0 (2021-05-13)

### Features

* **core:** use boostrap 5
* **bootstrap:** use boostrap 5

## 12.0.0 (2021-05-12)

### Features

* **core:** release candidate of library using angular 12
* **bootstrap:** release candidate of library using angular 12
* **material:** release candidate of library using angular material 12

## 12.0.0-rc.1 (2021-05-03)

### Features

* **core:** release candidate of library using angular 12 (release candidate 1)
* **bootstrap:** release candidate of library using angular 12 (release candidate 1)
* **material:** release candidate of library using angular material 12 (release candidate 1)

## 12.0.0-rc.0 (2021-04-23)

### Features

* **core:** release candidate of library using angular 12 (release candidate)
* **bootstrap:** release candidate of library using angular 12 (release candidate)
* **material:** release candidate of library using angular material 12 (release candidate)

## 12.0.0-next.0 (2021-04-14)

### Features

* **core:** next version of library using angular 12 (next)
* **bootstrap:** next version of library using angular 12 (next)
* **material:** next version of library using angular material 12 (next)

## 11.0.0 (2021-04-14)

### Features

* **core:** release of library using angular 11
* **bootstrap:** release of library using angular 11
* **material:** release of library using angular material 11

## 10.0.0 (2021-04-14)

### Features

* **core:** release of library using angular 10
* **bootstrap:** release of library using angular 10
* **material:** release of library using angular material 10

## 9.0.0 (2021-04-14)

### Features

* **core:** release of library using angular 9
* **bootstrap:** release of library using angular 9
* **material:** release of library using angular material 9

## 8.0.0 (2021-04-14)

### Features

* **core:** release of library using angular 8
* **core:** dynamic form based on reactive forms and JSON definition for elements, fields and actions
* **core:** dynamic form element for content elements (like HTML, markdown, etc.)
* **core:** dynamic form fields (control, group, array and dictionary) for form inputs
* **core:** dynamic form action for triggering events handled by dynamic form fields
* **bootstrap:** release of library using angular 8, bootstrap and HTML5
* **bootstrap:** dynamic form inputs (checkbox, combobox, datepicker, numberbox, radio, select, switch, textarea, textbox, toggle)
* **material:** release of library using angular material 8
* **material:** dynamic form inputs (checkbox, combobox, datepicker, numberbox, radio, select, switch, textarea, textbox, toggle) making use of material form fields
