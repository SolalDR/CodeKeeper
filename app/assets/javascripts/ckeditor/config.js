
CKEDITOR.editorConfig = function (config) {
  // ... other configuration ...

  config.toolbar_mini = [
    ["Source", "Links", "Bold",  "Italic",  "Underline",  "Strike",  "-",  "Subscript",  "Superscript", 'JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock', "BulletedList"],
  ];
  config.toolbar = "mini";

  // ... rest of the original config.js  ...
}