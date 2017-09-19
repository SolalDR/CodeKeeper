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
//= require materialize-sprockets
//= require turbolinks
//= require Request
//= require Scaffold
//= require Search
//= require Tabs
//= require codemirror
//= require codemirror/keymaps/vim
//= require codemirror/modes/ruby
//= require codemirror/modes/javascript
//= require codemirror/modes/htmlmixed
//= require codemirror/modes/css
//= require ckeditor/init
//= require bootstrap

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


function initSideBar(){
  var btn = document.getElementById("sidebar-right-btn");
  var sidebar = document.getElementById("sidebar-right");
  btn.addEventListener("click", function(){
    toggleDisplay(sidebar, "visible", "hide");
  }, false)
}




DropDown = {
  onClick:function(el, r){
    var self = this;
    el.addEventListener("click", function(){
      for(i=0; i<self.elements.length; i++){
        if(i!==r){
          self.elements[i].className = self.elements[i].className.replace("drop-visible", "drop-hidden")
        }
      }
      toggleDisplay(this, "drop-hidden", "drop-visible");
    }, false)
  },
  init:function(){
    this.elements = document.getElementsByClassName("drop-down-item");
    for(i=0; i<this.elements.length; i++){
      this.onClick(this.elements[i], i);
    }
  }
}


SnippetVersion = {
  patternEdit: /^(.+?\/)\d+(\/.+)$/,
  display:function(rank){
    for(i=0; i<this.codeVersions.length; i++){
      this.codeVersions[i].classList.remove("visible");
      this.codeVersions[i].classList.add("hidden");
    }
    if(this.editButton){
      var nextHref = this.editButton.href.replace(this.patternEdit, "$1"+this.codeVersions[rank].getAttribute("data-id")+"$2");
      this.editButton.href = nextHref
    }
    this.codeVersions[rank].classList.remove("hidden");
    this.codeVersions[rank].classList.add("visible");
  },
  iniEvents:function(){
    var self = this;
    this.select.addEventListener("change", function(){
      var index = this.selectedIndex;
      self.display(index);
    }, false)
  },
  init:function(){
    this.select = document.getElementById("select_version");
    if(this.select){
      this.codeVersions = document.getElementsByClassName("code-version");
      this.editButton = document.getElementById("snippet-version-edit");
      this.select.selectedIndex = this.codeVersions.length-1;
      for(i=0; i<this.codeVersions.length; i++){
        if(!this.codeVersions[i].className.match("visible")){
          this.codeVersions[i].classList.add("hidden");
        }
      }
      this.iniEvents();
    }
  }
}


window.addEventListener("turbolinks:load", function(){
  CodemirrorManage.init();
  SearchManage.init();
  DropDown.init();
  SnippetVersion.init();
  TabsManage.init();
  initSideBar();
}, false)

// var item = document.querySelectorAll('.carousel-item');
// var popup = document.querySelectorAll('.popup');
// var close = document.querySelectorAll('.close');
//
//
// for (var i = 0; i < item.length; i++){
//   (function(){
//     var r = i;
//     item[r].addEventListener("click", function(){
//       for(j=0; j<popup.length; j++){
//         popup[j].style.display = "none";
//       }
//       popup[r].style.display = 'block';
//     }, false);
//     close[r].addEventListener('click',function(){
//       popup[r].style.display="none";
//     });
//   })();
// }
