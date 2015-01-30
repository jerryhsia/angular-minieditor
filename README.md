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

TODO
---
More button.

Thanks
---
This editor will continue to develop, and if you like it, please star it, Thanks.








