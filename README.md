# **dynamic-forms**

This is an [**Angular**](https://angular.io) project for dynamic forms based on JSON:

- [**GitHub**](https://github.com/dynamic-forms/dynamic-forms) repository under [MIT License](https://github.com/dynamic-forms/dynamic-forms/blob/main/LICENSE.md) with [releases](https://github.com/dynamic-forms/dynamic-forms/releases)
- [**Azure DevOps**](https://dev.azure.com/alexandergebuhr/dynamic-forms) project with [build pipelines](https://dev.azure.com/alexandergebuhr/dynamic-forms/_build), [release dashboard](https://dev.azure.com/alexandergebuhr/dynamic-forms/_dashboards/dashboard/75c3b542-d483-4a2c-b7e0-b822a0d4a493) and [npm packages](https://dev.azure.com/alexandergebuhr/dynamic-forms/_artifacts/feed/dynamic-forms) for [releases](https://dev.azure.com/alexandergebuhr/dynamic-forms/_artifacts/feed/dynamic-forms@96db2eda-0952-490c-bacf-3737543f73a0) and [pre-releases](https://dev.azure.com/alexandergebuhr/dynamic-forms/_artifacts/feed/dynamic-forms@a73fb5f7-2221-462a-8b8e-2a989c29ff59) up to version `14.0.0-rc.1`
- [**Azure**](https://dynamic-forms.azurewebsites.net/) web apps with demos
- [**npm packages**](https://www.npmjs.com/org/dynamic-forms) for libraries
- [**stackblitz**](https://stackblitz.com/edit/dynamic-forms-stackblitz) example

## **Features**

- Dynamic [**reactive forms**](https://angular.io/guide/reactive-forms) based on **JSON** definition
- Structuring / nesting dynamic forms by
  - Dynamic form elements (container, accordion, tabs, content, markdown, modal)
  - Dynamic form fields (control, group, array, dictionary)
  - Dynamic form actions (button, icon)
- Dynamic form controls / inputs include
  - Dynamic form inputs
    - Checkbox and switch
    - Combobox, radio, select and toggle
    - Textbox and textarea
    - Datepicker
    - Numberbox
  - Dynamic form input validation
  - Dynamic form input hints

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

Packages up to version `14.0.0-rc.1` were hosted by Azure DevOps. Therefore, the following lines

```
@dynamic-forms:registry=https://pkgs.dev.azure.com/alexandergebuhr/dynamic-forms/_packaging/dynamic-forms/npm/registry/
```

needed to be part of the npm config file `.nmprc`.

### **Version 15** [![Build Status](https://dev.azure.com/alexandergebuhr/dynamic-forms/_apis/build/status/v15/dynamic-forms-v15-publish?branchName=refs/tags/15.0.0-rc.0)](https://dev.azure.com/alexandergebuhr/dynamic-forms/_build/latest?definitionId=41&branchName=refs/tags/15.0.0-rc.0)

- `npm install @dynamic-forms/core@15.0.0-rc.0`
- `npm install @dynamic-forms/bootstrap@15.0.0-rc.0`
- `npm install @dynamic-forms/material@15.0.0-rc.0`
- `npm install @dynamic-forms/markdown@15.0.0-rc.0`

### **Version 14** [![Build Status](https://dev.azure.com/alexandergebuhr/dynamic-forms/_apis/build/status/v14/dynamic-forms-v14-publish?branchName=refs/tags/14.1.0)](https://dev.azure.com/alexandergebuhr/dynamic-forms/_build/latest?definitionId=32&branchName=refs/tags/14.1.0)

- `npm install @dynamic-forms/core@14.1.0`
- `npm install @dynamic-forms/bootstrap@14.1.0`
- `npm install @dynamic-forms/material@14.1.0`
- `npm install @dynamic-forms/markdown@14.1.0`

### **Version 13** [![Build Status](https://dev.azure.com/alexandergebuhr/dynamic-forms/_apis/build/status/v13/dynamic-forms-v13-publish?branchName=refs/tags/13.0.0)](https://dev.azure.com/alexandergebuhr/dynamic-forms/_build/latest?definitionId=27&branchName=refs/tags/13.0.0)

- `npm install @dynamic-forms/core@13.0.0`
- `npm install @dynamic-forms/bootstrap@13.0.0`
- `npm install @dynamic-forms/material@13.0.0`

## **Demos**

### **Version 15** [![Build Status](https://dev.azure.com/alexandergebuhr/dynamic-forms/_apis/build/status/dynamic-forms-v15-cd?branchName=15.0.x)](https://dev.azure.com/alexandergebuhr/dynamic-forms/_build/latest?definitionId=39&branchName=15.0.x)

- Built with [Angular 15](https://v15.angular.io/)
- Environments include [DEV](https://dynamic-forms.azurewebsites.net/v15/dev/) and [PROD](https://dynamic-forms.azurewebsites.net/v15/)

### **Version 14** [![Build Status](https://dev.azure.com/alexandergebuhr/dynamic-forms/_apis/build/status/dynamic-forms-v14-cd?branchName=14.0.x)](https://dev.azure.com/alexandergebuhr/dynamic-forms/_build/latest?definitionId=30&branchName=14.0.x)

- Built with [Angular 14](https://v14.angular.io/)
- Environments include [DEV](https://dynamic-forms.azurewebsites.net/v14/dev/) and [PROD](https://dynamic-forms.azurewebsites.net/v14/)

### **Version 13** [![Build Status](https://dev.azure.com/alexandergebuhr/dynamic-forms/_apis/build/status/dynamic-forms-v13-cd?branchName=13.0.x)](https://dev.azure.com/alexandergebuhr/dynamic-forms/_build/latest?definitionId=26&branchName=13.0.x)

- Built with [Angular 13](https://v13.angular.io/)
- Environments include [DEV](https://dynamic-forms.azurewebsites.net/v13/dev/) and [PROD](https://dynamic-forms.azurewebsites.net/v13/)