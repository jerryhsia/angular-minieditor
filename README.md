# angular-minieditor
A mini text editor for angularjs.

Dependancies
---

* [Jquery] (http://jquery.com/) 
* [AngularJS] (http://www.angularjs.com) 
* [Font Awesome] (http://fortawesome.github.io/Font-Awesome/)
* [Twitter Bootstrap] (http://getbootstrap.com/)

Recommended to use this editor on angular project

Installation
---

`bower install angular-minieditor`


Usage
---
- Import script and style files
 
```html
<link rel="stylesheet" href="/path/to/angular-minieditor.css">
<script src="/path/to/angular-minieditor.js"></script>
```

- Import editor module

```javascript
angular.module('app', ['jerryhsia.minieditor']);
````

- Use the directive

```html
<minieditor ng-model="content" options="options"></minieditor>
```

Directive attributes
-----------

Option|Description
---------------------|---------------
**ng-model**		 | 			REQUIRED - The angular data model
**options** 	 |			OPTIONAL-The editor configration

Editor configration options
---

Attribute|Type|Description
---------------|------|---------------
**id**|String|OPTIONAL-The id attribute value 
**class**|String|OPTIONAL-The class attribute value
**width**|Integer|OPTIONAL-The width of editor
**height**|Integer|OPTIONAL-The height of editor content
**menus**|Array|OPTIONAL-The menu button names
**commands**|Object|OPTIONAL - Editor commands



Default buttons
---

```javascript
[
    ['bold', 'italic', 'underline', 'strikethrough'],
    ['fontsize'],
    ['justifyleft', 'justifycenter', 'justifyright'],
    ['insertunorderedlist', 'insertorderedlist'],
    ['indent', 'outdent'],
    ['removeformat', 'createlink', 'insertimage']
]
```

Editor commands
---

You can add any commands to the editor and use it for buttons in the panel. Please note that ```options.command``` merges custom commands to default ones, not replaces them.

If no ```handler``` member is specified in command, then command will run ```document.execCommand(command.command, false, value)```, otherwise custom click handler will be executed.

Default commands:

```javascript
{
    bold: {
      command: 'bold',
      type: 'button',
      title: 'Bold',
      icon: 'bold',
      arg: false
    },
    italic: {
      command: 'italic',
      type: 'button',
      title: 'Italic',
      icon: 'italic',
      arg: false
    },
    underline: {
      command: 'underline',
      type: 'button',
      title: 'Underline',
      icon: 'underline',
      arg: false
    },
    strikethrough: {
      command: 'strikethrough',
      type: 'button',
      title: 'Strikethrough',
      icon: 'strikethrough',
      arg: false
    },
    justifyleft: {
      command: 'justifyleft',
      type: 'button',
      title: 'Left justify',
      icon: 'align-left',
      arg: false
    },
    justifycenter: {
      command: 'justifycenter',
      type: 'button',
      title: 'Center justify',
      icon: 'align-center',
      arg: false
    },
    justifyright: {
      command: 'justifyright',
      type: 'button',
      title: 'Right justify',
      icon: 'align-right',
      arg: false
    },
    insertunorderedlist: {
      command: 'insertunorderedlist',
      type: 'button',
      title: 'Unordered list',
      icon: 'list-ul',
      arg: false
    },
    insertorderedlist: {
      command: 'insertorderedlist',
      type: 'button',
      title: 'Ordered list',
      icon: 'list-ol',
      arg: false
    },
    indent: {
      command: 'indent',
      type: 'button',
      title: 'Indent',
      icon: 'indent',
      arg: false
    },
    outdent: {
      command: 'outdent',
      type: 'button',
      title: 'Outdent',
      icon: 'outdent',
      arg: false
    },
    removeformat: {
      command: 'removeformat',
      type: 'button',
      title: 'Remove format',
      icon: 'eraser',
      arg: false
    },
    fontsize: {
      command: 'fontsize',
      type: 'button',
      title: 'Font size',
      icon: 'text-height',
      arg: true,
      promptTitle: 'Enter the number of 1-7',
      defaultValue: 3,
      filter: function(value) {
        value = value ? parseInt(value) : false;
        if (!(value >= 1 && value <= 7)) {
          value = 2;
        }
        return value;
      }
    },
    createlink: {
      command: 'createlink',
      type: 'button',
      title: 'Create link',
      icon: 'link',
      arg: true,
      promptTitle: 'Enter the link url',
      defaultValue: 'http://',
      filter: function(value) {
        return value;
      }
    },
    insertimage: {
      command: 'insertimage',
      type: 'button',
      title: 'Insert image',
      icon: 'image',
      arg: true,
      promptTitle: 'Enter the image url',
      defaultValue: 'http://',
      filter: function(value) {
        return value;
      }
    }
}
```

TODO
---
More button.

Thanks
---
This editor will continue to develop, and if you like it, please star it, Thanks.








