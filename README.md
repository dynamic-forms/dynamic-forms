# **DynamicForms**

## **Project**

- Repository at GitHub https://github.com/dynamic-forms/dynamic-forms 
- Overview at Azure DevOps https://dev.azure.com/alexandergebuhr/dynamic-forms/

## **Demo**

### **Version 8**
[![Build Status](https://dev.azure.com/alexandergebuhr/dynamic-forms/_apis/build/status/dynamic-forms-v8-cd?branchName=release%2Fv8)](https://dev.azure.com/alexandergebuhr/dynamic-forms/_build/latest?definitionId=1&branchName=release%2Fv8)

- Built with [Angular 8](https://v8.angular.io/)
- Production https://dynamic-forms.azurewebsites.net/v8/
- Development https://dynamic-forms.azurewebsites.net/v8/dev/

### **Version 9**
[![Build Status](https://dev.azure.com/alexandergebuhr/dynamic-forms/_apis/build/status/dynamic-forms-v9-cd?branchName=release%2Fv9)](https://dev.azure.com/alexandergebuhr/dynamic-forms/_build/latest?definitionId=4&branchName=release%2Fv9)

- Built with [Angular 9](https://v9.angular.io/)
- Production https://dynamic-forms.azurewebsites.net/v9/
- Development https://dynamic-forms.azurewebsites.net/v9/dev/

### **Version 10**
[![Build Status](https://dev.azure.com/alexandergebuhr/dynamic-forms/_apis/build/status/dynamic-forms-v10-cd?branchName=release%2Fv10)](https://dev.azure.com/alexandergebuhr/dynamic-forms/_build/latest?definitionId=8&branchName=release%2Fv10)

- Built with [Angular 10](https://next.angular.io/) (Pre-Release)
- Production https://dynamic-forms.azurewebsites.net/v10/
- Development https://dynamic-forms.azurewebsites.net/v10/dev/

## **Features**

- Dynamic [**reactive forms**](https://angular.io/guide/reactive-forms) based on **JSON** definition
- Structuring / nesting dynamic forms by
  - Dynamic form elements (container, content, modal)
  - Dynamic form fields (group, array, control)
  - Dynamic form actions (button, icon)
- Dynamic form controls / inputs include 
  - Dynamic form inputs 
     - Checkbox and switch
     - Combobox, radio and select
     - Textbox and textarea
     - Datepicker 
     - Numberbox
  - Dynamic form input validation
  - Dynamic form input hints

## **Libraries**

### **@dynamic-forms/core**

- Library includes **extensible** interfaces, classes, components, factories, services and **modules**
  - Dynamic form config module for registration of components
  - Dynamic form module includes
    - Builder to create form groups, arrays and controls
    - Component factory to resolve registered components
    - Component to render elements, fields and actions
  - Dynamic form control module includes
    - Component to render input
  - Dynamic form group module includes
    - Component to render controls
  - Dynamic form array module includes
    - Component to render groups and controls
  - Dynamic form validation module for registration of validators and messages
    - Builder to create validators
    - Service to resolve validation messages
  - Dynamic form action module for registration of action handlers
    - Service to resolve action handlers

### **@dynamic-forms/bootstrap**

- Library for components based on [**bootstrap**](https://getbootstrap.com/) and **HTML5** 

### **@dynamic-forms/material** 

- Library for components based on [**@angular/material**](https://material.angular.io/) 