# **dynamic-forms**

This is an [**Angular**](https://angular.dev) project for dynamic forms based on JSON:

- [**GitHub**](https://github.com/dynamic-forms/dynamic-forms) repository under [MIT License](https://github.com/dynamic-forms/dynamic-forms/blob/main/LICENSE.md) with [releases](https://github.com/dynamic-forms/dynamic-forms/releases)
- [**Azure DevOps**](https://dev.azure.com/alexandergebuhr/dynamic-forms) project with [build pipelines](https://dev.azure.com/alexandergebuhr/dynamic-forms/_build) and [release dashboard](https://dev.azure.com/alexandergebuhr/dynamic-forms/_dashboards/dashboard/75c3b542-d483-4a2c-b7e0-b822a0d4a493)
- [**Azure**](https://dynamic-forms.azurewebsites.net/) web apps with demos
- [**npm packages**](https://www.npmjs.com/org/dynamic-forms) for libraries
- [**stackblitz**](https://stackblitz.com/~/github.com/dynamic-forms/dynamic-forms) for project and [**stackblitz**](https://stackblitz.com/edit/dynamic-forms-stackblitz) with example using npm packages of libraries

## **Features**

- Dynamic [**reactive forms**](https://angular.dev/guide/forms/reactive-forms) based on **JSON** definition
- Structuring / nesting dynamic forms by
  - Dynamic form elements (container, accordion, tabs, text, content, markdown, modal)
  - Dynamic form fields (control, group, array, dictionary)
  - Dynamic form actions (button, icon)
- Dynamic form controls / inputs include
  - Dynamic form inputs
    - Checkbox and switch
    - Combobox, radio, select and toggle
    - Textbox, textarea and input mask
    - Datepicker
    - Numberbox
    - File(s)
  - Dynamic form input validation
  - Dynamic form input hints
  - Dynamic form input add-ons

## **Libraries**

### **@dynamic-forms/core** [![npm version](https://badge.fury.io/js/@dynamic-forms%2Fcore.svg)](https://badge.fury.io/js/@dynamic-forms%2Fcore)

- Library includes **extendable** interfaces, classes, components, factories, services and **modules**
  - Dynamic form config module for registration of components
  - Dynamic form module includes
    - Builder to create form controls, groups, arrays and dictionaries
    - Component factory to resolve registered components
    - Component to render elements, fields and actions
  - Dynamic form control module includes
    - Component to render an input
  - Dynamic form group module includes
    - Component to render controls, groups and arrays
  - Dynamic form array module includes
    - Component to render either controls, groups or arrays of same structure
  - Dynamic form dictionary module includes
    - Component to render either controls, groups or arrays of same structure
  - Dynamic form validation module for registration of validators and messages
    - Builder to create validators
    - Service to resolve validation messages
  - Dynamic form action module for registration of action handlers
    - Service to resolve action handlers

### **@dynamic-forms/bootstrap** [![npm version](https://badge.fury.io/js/@dynamic-forms%2Fbootstrap.svg)](https://badge.fury.io/js/@dynamic-forms%2Fbootstrap)

- Library for components based on [**bootstrap**](https://getbootstrap.com/) and **HTML5**

### **@dynamic-forms/material** [![npm version](https://badge.fury.io/js/@dynamic-forms%2Fmaterial.svg)](https://badge.fury.io/js/@dynamic-forms%2Fmaterial)

- Library for components based on [**@angular/material**](https://material.angular.io/)

### **@dynamic-forms/markdown** [![npm version](https://badge.fury.io/js/@dynamic-forms%2Fmarkdown.svg)](https://badge.fury.io/js/@dynamic-forms%2Fmarkdown)

- Extension library for markdown based on [**marked**](https://github.com/markedjs/marked)

## **Packages**

### **Version 19** [![Build Status](https://dev.azure.com/alexandergebuhr/dynamic-forms/_apis/build/status/dynamic-forms-publish?branchName=refs/tags/19.1.0)](https://dev.azure.com/alexandergebuhr/dynamic-forms/_build/latest?definitionId=45&branchName=refs/tags/19.1.0)

- `npm install @dynamic-forms/core@19.1.0`
- `npm install @dynamic-forms/bootstrap@19.1.0`
- `npm install @dynamic-forms/material@19.1.0`
- `npm install @dynamic-forms/markdown@19.1.0`

### **Version 18** [![Build Status](https://dev.azure.com/alexandergebuhr/dynamic-forms/_apis/build/status/dynamic-forms-publish?branchName=refs/tags/18.1.2)](https://dev.azure.com/alexandergebuhr/dynamic-forms/_build/latest?definitionId=45&branchName=refs/tags/18.1.2)

- `npm install @dynamic-forms/core@18.1.2`
- `npm install @dynamic-forms/bootstrap@18.1.2`
- `npm install @dynamic-forms/material@18.1.2`
- `npm install @dynamic-forms/markdown@18.1.2`

### **Version 17** [![Build Status](https://dev.azure.com/alexandergebuhr/dynamic-forms/_apis/build/status/dynamic-forms-publish?branchName=refs/tags/17.0.0)](https://dev.azure.com/alexandergebuhr/dynamic-forms/_build/latest?definitionId=45&branchName=refs/tags/17.0.0)

- `npm install @dynamic-forms/core@17.0.0`
- `npm install @dynamic-forms/bootstrap@17.0.0`
- `npm install @dynamic-forms/material@17.0.0`
- `npm install @dynamic-forms/markdown@17.0.0`

### **Version 16**

- `npm install @dynamic-forms/core@16.0.0`
- `npm install @dynamic-forms/bootstrap@16.0.0`
- `npm install @dynamic-forms/material@16.0.0`
- `npm install @dynamic-forms/markdown@16.0.0`

### **Version 15**

- `npm install @dynamic-forms/core@15.1.0`
- `npm install @dynamic-forms/bootstrap@15.1.0`
- `npm install @dynamic-forms/material@15.1.0`
- `npm install @dynamic-forms/markdown@15.1.0`

## **Demos**

### **Version 19** [![Build Status](https://dev.azure.com/alexandergebuhr/dynamic-forms/_apis/build/status/dynamic-forms-cd?branchName=19.0.x)](https://dev.azure.com/alexandergebuhr/dynamic-forms/_build/latest?definitionId=43&branchName=19.0.x)

- Built with [Angular 19](https://v19.angular.dev/)
- Environments include [DEV](https://dynamic-forms.azurewebsites.net/v19/dev/) and [PROD](https://dynamic-forms.azurewebsites.net/v19/)

### **Version 18** [![Build Status](https://dev.azure.com/alexandergebuhr/dynamic-forms/_apis/build/status/dynamic-forms-cd?branchName=18.1.x)](https://dev.azure.com/alexandergebuhr/dynamic-forms/_build/latest?definitionId=43&branchName=18.1.x)

- Built with [Angular 18](https://v18.angular.dev/)
- Environments include [DEV](https://dynamic-forms.azurewebsites.net/v18/dev/) and [PROD](https://dynamic-forms.azurewebsites.net/v18/)

### **Version 17** [![Build Status](https://dev.azure.com/alexandergebuhr/dynamic-forms/_apis/build/status/dynamic-forms-cd?branchName=17.0.x)](https://dev.azure.com/alexandergebuhr/dynamic-forms/_build/latest?definitionId=43&branchName=17.0.x)

- Built with [Angular 17](https://v17.angular.io/)
- Environments include [DEV](https://dynamic-forms.azurewebsites.net/v17/dev/) and [PROD](https://dynamic-forms.azurewebsites.net/v17/)

### **Version 16** [![Build Status](https://dev.azure.com/alexandergebuhr/dynamic-forms/_apis/build/status/dynamic-forms-cd?branchName=16.0.x)](https://dev.azure.com/alexandergebuhr/dynamic-forms/_build/latest?definitionId=43&branchName=16.0.x)

- Built with [Angular 16](https://v16.angular.io/)
- Environments include [DEV](https://dynamic-forms.azurewebsites.net/v16/dev/) and [PROD](https://dynamic-forms.azurewebsites.net/v16/)

### **Version 15** [![Build Status](https://dev.azure.com/alexandergebuhr/dynamic-forms/_apis/build/status/dynamic-forms-v15-cd?branchName=15.0.x)](https://dev.azure.com/alexandergebuhr/dynamic-forms/_build/latest?definitionId=39&branchName=15.0.x)

- Built with [Angular 15](https://v15.angular.io/)
- Environments include [DEV](https://dynamic-forms.azurewebsites.net/v15/dev/) and [PROD](https://dynamic-forms.azurewebsites.net/v15/)