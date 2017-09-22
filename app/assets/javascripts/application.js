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


SnippetVersion = {
  patternEdit: /^(.+?\/)\d+(\/.+)$/,

  display:function(version){
    if( version != this.currentVersion ){
      this.hide(this.currentVersion); 
      version.className = version.className.replace("hidden", "visible");
      this.currentVersion = version; 
    }
  },

  hide: function(version){
    if( version.className.match("visible") ){
      version.className = version.className.replace("visible", "hidden");
      return;
    }
    version.className += " hidden";
  },

  isDisplayed:  function(rank){
    if( this.versions[rank].className.match("visible") ){
      return true; 
    }
    return false;
  },

  initObserver: function(){
    var self = this; 
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
          var listItem = mutation.target.querySelectorAll("li");
          for(i=0; i<listItem.length; i++){
            if( listItem[i].className.match("selected") ){
              if( !self.isDisplayed(i) ){
                self.display(self.versions[i]);
              }
            }
          }
        });
    });
     
    observer.observe(this.container, {
      attributes: true, 
      subtree: true
    });
  }, 

  initEvents:function(){
    var self = this;

    this.select.addEventListener("change", function(){
      var index = this.selectedIndex;
      self.display(self.versions[index]);
    }, false)

    this.initObserver();
  },

  init:function(){
    this.select = document.getElementById("select_version");
    this.container = document.getElementById("select_container"); 

    if(this.select){

      this.versions = document.getElementsByClassName("code-version");
      this.select.selectedIndex = this.versions.length-1;
      this.currentVersion = this.versions[this.versions.length-1]

      for(i=0; i<this.versions.length; i++){
        if(!this.versions[i].className.match("visible")){
          this.hide(this.versions[i]);
        }
      }

      this.initEvents();
    }
  }
}

window.addEventListener("turbolinks:load", function(){
    $(".dropdown-button").dropdown();
    $(".button-collapse").sideNav();
    $('select').material_select();
    $('#textarea-material').val('New Text');
    $('#textarea-material').trigger('autoresize');
    Materialize.updateTextFields();
    CodemirrorManage.init();
    // DropDown.init();
    SnippetVersion.init();
    TabsManage.init();
}, false)

