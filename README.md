# **Project**

- [**GitHub**](https://github.com/dynamic-forms/dynamic-forms) repository under [MIT License](https://github.com/dynamic-forms/dynamic-forms/blob/main/LICENSE.md) with [released libraries](https://github.com/dynamic-forms/dynamic-forms/releases) and [packages](https://github.com/dynamic-forms/dynamic-forms/packages)
- [**Azure DevOps**](https://dev.azure.com/alexandergebuhr/dynamic-forms) project with [build pipelines](https://dev.azure.com/alexandergebuhr/dynamic-forms/_build) and [release dashboard](https://dev.azure.com/alexandergebuhr/dynamic-forms/_dashboards/dashboard/75c3b542-d483-4a2c-b7e0-b822a0d4a493)
- [**Azure**](https://dynamic-forms.azurewebsites.net/) web apps

## **Demo**

### **Version 14** [![Build Status](https://dev.azure.com/alexandergebuhr/dynamic-forms/_apis/build/status/dynamic-forms-v14-cd?branchName=14.0.x)](https://dev.azure.com/alexandergebuhr/dynamic-forms/_build/latest?definitionId=30&branchName=14.0.x)

- Built with [Angular 14](https://v14.angular.io/)
- Environments include [DEV](https://dynamic-forms.azurewebsites.net/v14/dev/) and [PROD](https://dynamic-forms.azurewebsites.net/v14/)

### **Version 13** [![Build Status](https://dev.azure.com/alexandergebuhr/dynamic-forms/_apis/build/status/dynamic-forms-v13-cd?branchName=13.0.x)](https://dev.azure.com/alexandergebuhr/dynamic-forms/_build/latest?definitionId=26&branchName=13.0.x)

- Built with [Angular 13](https://v13.angular.io/)
- Environments include [DEV](https://dynamic-forms.azurewebsites.net/v13/dev/) and [PROD](https://dynamic-forms.azurewebsites.net/v13/)

### **Version 12** [![Build Status](https://dev.azure.com/alexandergebuhr/dynamic-forms/_apis/build/status/dynamic-forms-v12-cd?branchName=12.1.x)](https://dev.azure.com/alexandergebuhr/dynamic-forms/_build/latest?definitionId=22&branchName=12.1.x)

- Built with [Angular 12](https://v12.angular.io/)
- Environments include [DEV](https://dynamic-forms.azurewebsites.net/v12/dev/) and [PROD](https://dynamic-forms.azurewebsites.net/v12/)

### **Version 11** [![Build Status](https://dev.azure.com/alexandergebuhr/dynamic-forms/_apis/build/status/dynamic-forms-v11-cd?branchName=11.1.x)](https://dev.azure.com/alexandergebuhr/dynamic-forms/_build/latest?definitionId=18&branchName=11.1.x)

- Built with [Angular 11](https://v11.angular.io/)
- Environments include [DEV](https://dynamic-forms.azurewebsites.net/v11/dev/) and [PROD](https://dynamic-forms.azurewebsites.net/v11/)

### **Version 10** [![Build Status](https://dev.azure.com/alexandergebuhr/dynamic-forms/_apis/build/status/dynamic-forms-v10-cd?branchName=10.0.x)](https://dev.azure.com/alexandergebuhr/dynamic-forms/_build/latest?definitionId=8&branchName=10.0.x)

- Built with [Angular 10](https://v10.angular.io/)
- Environments include [DEV](https://dynamic-forms.azurewebsites.net/v10/dev/) and [PROD](https://dynamic-forms.azurewebsites.net/v10/)

### **Version 9** [![Build Status](https://dev.azure.com/alexandergebuhr/dynamic-forms/_apis/build/status/dynamic-forms-v9-cd?branchName=9.0.x)](https://dev.azure.com/alexandergebuhr/dynamic-forms/_build/latest?definitionId=4&branchName=9.0.x)

- Built with [Angular 9](https://v9.angular.io/)
- Environments include [DEV](https://dynamic-forms.azurewebsites.net/v9/dev/) and [PROD](https://dynamic-forms.azurewebsites.net/v9/)

### **Version 8** [![Build Status](https://dev.azure.com/alexandergebuhr/dynamic-forms/_apis/build/status/dynamic-forms-v8-cd?branchName=8.0.x)](https://dev.azure.com/alexandergebuhr/dynamic-forms/_build/latest?definitionId=1&branchName=8.0.x)

- Built with [Angular 8](https://v8.angular.io/)
- Environments include [DEV](https://dynamic-forms.azurewebsites.net/v8/dev/) and [PROD](https://dynamic-forms.azurewebsites.net/v8/)

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

## **Packages**

Packages are hosted by Azure DevOps. Therefore, the following lines

```
@dynamic-forms:registry=https://pkgs.dev.azure.com/alexandergebuhr/dynamic-forms/_packaging/dynamic-forms/npm/registry/
```

need to be part of the npm config file `.nmprc`.

### **Version 14** [![Build Status](https://dev.azure.com/alexandergebuhr/dynamic-forms/_apis/build/status/v14/dynamic-forms-v14-publish?branchName=refs/tags/14.0.0-rc.0)](https://dev.azure.com/alexandergebuhr/dynamic-forms/_build/latest?definitionId=32&branchName=refs/tags/14.0.0-rc.0)

- `npm install @dynamic-forms/core@14.0.0-rc.0`
- `npm install @dynamic-forms/bootstrap@14.0.0-rc.0`
- `npm install @dynamic-forms/material@14.0.0-rc.0`

### **Version 13** [![Build Status](https://dev.azure.com/alexandergebuhr/dynamic-forms/_apis/build/status/v13/dynamic-forms-v13-publish?branchName=refs/tags/13.0.0)](https://dev.azure.com/alexandergebuhr/dynamic-forms/_build/latest?definitionId=27&branchName=refs/tags/13.0.0)

- `npm install @dynamic-forms/core@13.0.0`
- `npm install @dynamic-forms/bootstrap@13.0.0`
- `npm install @dynamic-forms/material@13.0.0`

### **Version 12** [![Build Status](https://dev.azure.com/alexandergebuhr/dynamic-forms/_apis/build/status/v12/dynamic-forms-v12-publish?branchName=refs/tags/12.1.1)](https://dev.azure.com/alexandergebuhr/dynamic-forms/_build/latest?definitionId=24&branchName=refs/tags/12.1.1)

- `npm install @dynamic-forms/core@12.1.1`
- `npm install @dynamic-forms/bootstrap@12.1.1`
- `npm install @dynamic-forms/material@12.1.1`

### **Version 11** [![Build Status](https://dev.azure.com/alexandergebuhr/dynamic-forms/_apis/build/status/v11/dynamic-forms-v11-publish?branchName=refs/tags/11.1.1)](https://dev.azure.com/alexandergebuhr/dynamic-forms/_build/latest?definitionId=20&branchName=refs/tags/11.1.1)

- `npm install @dynamic-forms/core@11.1.1`
- `npm install @dynamic-forms/bootstrap@11.1.1`
- `npm install @dynamic-forms/material@11.1.1`

### **Version 10** [![Build Status](https://dev.azure.com/alexandergebuhr/dynamic-forms/_apis/build/status/v10/dynamic-forms-v10-publish?branchName=refs/tags/10.0.2)](https://dev.azure.com/alexandergebuhr/dynamic-forms/_build/latest?definitionId=12&branchName=refs/tags/10.0.2)

- `npm install @dynamic-forms/core@10.0.2`
- `npm install @dynamic-forms/bootstrap@10.0.2`
- `npm install @dynamic-forms/material@10.0.2`

### **Version 9** [![Build Status](https://dev.azure.com/alexandergebuhr/dynamic-forms/_apis/build/status/v9/dynamic-forms-v9-publish?branchName=refs/tags/9.0.1)](https://dev.azure.com/alexandergebuhr/dynamic-forms/_build/latest?definitionId=11&branchName=refs/tags/9.0.1)

- `npm install @dynamic-forms/core@9.0.1`
- `npm install @dynamic-forms/bootstrap@9.0.1`
- `npm install @dynamic-forms/material@9.0.1`

### **Version 8** [![Build Status](https://dev.azure.com/alexandergebuhr/dynamic-forms/_apis/build/status/v8/dynamic-forms-v8-publish?branchName=refs/tags/8.0.2)](https://dev.azure.com/alexandergebuhr/dynamic-forms/_build/latest?definitionId=10&branchName=refs/tags/8.0.2)

- `npm install @dynamic-forms/core@8.0.2`
- `npm install @dynamic-forms/bootstrap@8.0.2`
- `npm install @dynamic-forms/material@8.0.2`

## **Libraries**

### **@dynamic-forms/core**

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

### **@dynamic-forms/bootstrap**

- Library for components based on [**bootstrap**](https://getbootstrap.com/) and **HTML5**

### **@dynamic-forms/material**

- Library for components based on [**@angular/material**](https://material.angular.io/)
