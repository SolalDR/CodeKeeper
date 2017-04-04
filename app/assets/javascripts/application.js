// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require angular/angular
//= require_tree .
//= require codemirror
//= require codemirror/keymaps/vim
//= require codemirror/modes/ruby
//= require codemirror/modes/javascript
//= require codemirror/modes/htmlmixed
//= require codemirror/modes/css

// bespin base16-dark hopscotch railscasts
CodemirrorManage = {
  cdMirrorInstance : [],
  launchInstances: function(){
    for(i=0; i<this.textareas.length; i++){
      this.cdMirrorInstance.push(CodeMirror.fromTextArea(this.textareas[i], {
        lineNumbers: true,
        theme: "bespin",
        mode: this.textareas[i].getAttribute("data-cdMirrorMode")
      }));
    }
  },
  init:function(){
    this.textareas = document.getElementsByClassName("codemirror-content");
    this.launchInstances();
  }
}

function toggleDisplay(el, visible, hidden){
  el.className = el.className.match(visible) ? el.className.replace(visible, hidden) : el.className.replace(hidden, visible);
}

function initSideBar(){
  var btn = document.getElementById("sidebar-right-btn");
  var sidebar = document.getElementById("sidebar-right");
  btn.addEventListener("click", function(){
    toggleDisplay(sidebar, "visible", "hide");
  }, false)
}

window.onload = function(){
  CodemirrorManage.init();
  initSideBar();
}
