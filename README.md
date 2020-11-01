# **Project**

- [**GitHub**](https://github.com/dynamic-forms/dynamic-forms) repository with [released libraries](https://github.com/dynamic-forms/dynamic-forms/releases) and [packages](https://github.com/dynamic-forms/dynamic-forms/packages)
- [**Azure DevOps**](https://dev.azure.com/alexandergebuhr/dynamic-forms) project with [build pipelines](https://dev.azure.com/alexandergebuhr/dynamic-forms/_build) and [release dashboard](https://dev.azure.com/alexandergebuhr/dynamic-forms/_dashboards/dashboard/75c3b542-d483-4a2c-b7e0-b822a0d4a493)
- [**Azure**](https://dynamic-forms.azurewebsites.net/) web apps

## **Demo**

### **Version 8** [![Build Status](https://dev.azure.com/alexandergebuhr/dynamic-forms/_apis/build/status/dynamic-forms-v8-cd?branchName=develop%2Fv8)](https://dev.azure.com/alexandergebuhr/dynamic-forms/_build/latest?definitionId=1&branchName=develop%2Fv8) [![Build Status](https://dev.azure.com/alexandergebuhr/dynamic-forms/_apis/build/status/dynamic-forms-v8-cd?branchName=release%2Fv8)](https://dev.azure.com/alexandergebuhr/dynamic-forms/_build/latest?definitionId=1&branchName=release%2Fv8)

- Built with [Angular 8](https://v8.angular.io/)
- Environments include [DEV](https://dynamic-forms.azurewebsites.net/v8/dev/) and [PROD](https://dynamic-forms.azurewebsites.net/v8/)

### **Version 9** [![Build Status](https://dev.azure.com/alexandergebuhr/dynamic-forms/_apis/build/status/dynamic-forms-v9-cd?branchName=develop%2Fv9)](https://dev.azure.com/alexandergebuhr/dynamic-forms/_build/latest?definitionId=4&branchName=develop%2Fv9) [![Build Status](https://dev.azure.com/alexandergebuhr/dynamic-forms/_apis/build/status/dynamic-forms-v9-cd?branchName=release%2Fv9)](https://dev.azure.com/alexandergebuhr/dynamic-forms/_build/latest?definitionId=4&branchName=release%2Fv9)

- Built with [Angular 9](https://v9.angular.io/)
- Environments include [DEV](https://dynamic-forms.azurewebsites.net/v9/dev/) and [PROD](https://dynamic-forms.azurewebsites.net/v9/)

### **Version 10** [![Build Status](https://dev.azure.com/alexandergebuhr/dynamic-forms/_apis/build/status/dynamic-forms-v10-cd?branchName=develop%2Fv10)](https://dev.azure.com/alexandergebuhr/dynamic-forms/_build/latest?definitionId=8&branchName=develop%2Fv10) [![Build Status](https://dev.azure.com/alexandergebuhr/dynamic-forms/_apis/build/status/dynamic-forms-v10-cd?branchName=release%2Fv10)](https://dev.azure.com/alexandergebuhr/dynamic-forms/_build/latest?definitionId=8&branchName=release%2Fv10)

- Built with [Angular 10](https://next.angular.io/)
- Environments include [DEV](https://dynamic-forms.azurewebsites.net/v10/dev/) and [PROD](https://dynamic-forms.azurewebsites.net/v10/)

## **Features**

- Dynamic [**reactive forms**](https://angular.io/guide/reactive-forms) based on **JSON** definition
- Structuring / nesting dynamic forms by
  - Dynamic form elements (container, content, markdown, modal)
  - Dynamic form fields (control, group, array, dictionary)
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

## **Packages**

Packages are hosted by GitHub. Therefore, it's required to add `@dynamic-forms:registry=https://npm.pkg.github.com` to the registry file `.npmrc`.

### **Version 8** [![Build Status](https://dev.azure.com/alexandergebuhr/dynamic-forms/_apis/build/status/v8/dynamic-forms-v8-publish?branchName=refs/tags/v8.0.0-next.4)](https://dev.azure.com/alexandergebuhr/dynamic-forms/_build/latest?definitionId=10&branchName=refs/tags/v8.0.0-next.4)

- `npm install @dynamic-forms/core@v8.0.0-next.4`
- `npm install @dynamic-forms/bootstrap@v8.0.0-next.4`
- `npm install @dynamic-forms/material@v8.0.0-next.4`

### **Version 9** [![Build Status](https://dev.azure.com/alexandergebuhr/dynamic-forms/_apis/build/status/v9/dynamic-forms-v9-publish?branchName=refs/tags/v9.0.0-next.3)](https://dev.azure.com/alexandergebuhr/dynamic-forms/_build/latest?definitionId=11&branchName=refs/tags/v9.0.0-next.3)

- `npm install @dynamic-forms/core@v9.0.0-next.3`
- `npm install @dynamic-forms/bootstrap@v9.0.0-next.3`
- `npm install @dynamic-forms/material@v9.0.0-next.3`

### **Version 10** [![Build Status](https://dev.azure.com/alexandergebuhr/dynamic-forms/_apis/build/status/v10/dynamic-forms-v10-publish?branchName=refs/tags/v10.0.0-next.3)](https://dev.azure.com/alexandergebuhr/dynamic-forms/_build/latest?definitionId=12&branchName=refs/tags/v10.0.0-next.3)

- `npm install @dynamic-forms/core@v10.0.0-next.3`
- `npm install @dynamic-forms/bootstrap@v10.0.0-next.3`
- `npm install @dynamic-forms/material@v10.0.0-next.3`

## **Libraries**

### **@dynamic-forms/core**

- Library includes **extensible** interfaces, classes, components, factories, services and **modules**
  - Dynamic form config module for registration of components
  - Dynamic form module includes
    - Builder to create form controls, groups, arrays and dictionaries
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
