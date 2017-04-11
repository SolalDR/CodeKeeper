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
//= require turbolinks
//= require Request
//= require angular/angular
//= require codemirror
//= require codemirror/keymaps/vim
//= require codemirror/modes/ruby
//= require codemirror/modes/javascript
//= require codemirror/modes/htmlmixed
//= require codemirror/modes/css

// bespin base16-dark hopscotch railscasts

//Crée un élément depuis une string
function createElement(str){
  var frag = document.createElement("fragment");
  frag.innerHTML = str;
  return frag.firstChild;
}


function toggleDisplay(el, visible, hidden){
  el.className = el.className.match(visible) ? el.className.replace(visible, hidden) : el.className.replace(hidden, visible);
}


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


SearchManage = {
  responses : [],
  getDataForm:function(){
    this.data = {
      text: this.textField.value
    }
  },
  callback:function(response){
    var self = SearchManage;
    self.responses = [];
    self.responseSearch.innerHTML = "";
    var snippets = JSON.parse(response);
    if(snippets){
      self.display();
      var protoReplace = "";
      for(i=0; i<snippets.length; i++){
        protoReplace = self.prototype;
        protoReplace = protoReplace.replace(/__id__/g, snippets[i].id);
        protoReplace = protoReplace.replace(/__name__/g, snippets[i].name);
        protoReplace = protoReplace.replace(/__lang__/g, snippets[i].lang.lib);

        self.responses.push(createElement(protoReplace));
        console.log(self.responses[i]);
        self.initFocusEvent(self.responses[i], i)
        self.responseSearch.appendChild(self.responses[i]);
      }
    }
  },

  initFocusEvent:function(el, rank){
    var self = this;
    el.addEventListener("focus", function(){
      self.isResponseFocus = true;
      self.activeR = rank;
    }, false)
    el.addEventListener("focusout", function(){
      var el = this;
      setTimeout(function(){
        if(rank === self.activeR){
          self.isResponseFocus = false;
          self.activeR = null;
        }
      }, 50)
    }, false)
  },


  nextTab:function(){
    if(this.isResponseFocus){
      var self = this;
      if(this.responses[this.activeR+1]){
        this.responses[this.activeR+1].focus();
      } else {
        this.responses[0].focus();
      }
    }
  },

  previousTab:function(){

  },

  isSearchFocus:function(){
    if(document.activeElement === this.textField){
      return true;
    }
    return false;
  },


  initEvents:function(){
    var self = this;
    this.searchForm.addEventListener("submit", function(e){
      e.preventDefault();
      if(self.textField.value && self.textField.value != ""){
        self.launchRequest();
      } else {
        self.close();
      }
      return false;
    }, false)

    this.responseSearch.addEventListener("click", function(){
      self.close();
    }, false)

    this.textField.addEventListener("keypress", function(){
      setTimeout(function(){
        if(self.textField.value && self.textField.value != ""){
          self.launchRequest();
        } else {
          self.close();
        }
      }, 10)
    }, false)

    window.addEventListener("keypress", function(e){
      var keyCode = e.keyCode
      switch (keyCode) {
        // retour
        case 8:
          if(self.isResponseFocus){
            e.preventDefault();
            self.close();
          }
          break;
        // tab
        case 9:
          e.preventDefault();
          if(self.isSearchFocus() && self.responses[0]){
            setTimeout(function(){
              self.responses[0].focus();
            }, 100)
          } else {
            self.nextTab();
          }
          break;
        // enter : 13
        // right : 39
        // left : 37
        // top :  38
        // bottom : 40
      }
    }, false)
  },

  launchRequest:function(){
    this.getDataForm();
    this.request = new Request({
      url : "/search",
      data : "text="+this.textField.value,
      method: "POST",
      json: false,
      callback : this.callback
    }).send();
  },

  display:function(){
    this.responseSearch.className = this.responseSearch.className.replace("closed", "visible");
  },
  close:function(){
    var self = this;
    this.responseSearch.className = this.responseSearch.className.replace("visible", "closed");
    this.activeR = null;
    this.isResponseFocus = false;
    setTimeout(function(){
      self.responseSearch.innerHTML = "";
      self.textField.focus();
    }, 400)
  },
  init:function(){
    this.searchForm = document.getElementById("form-search");
    this.textField = document.getElementById("search-input");
    this.responseSearch = document.getElementById("response-search");
    this.prototype  = this.responseSearch.getAttribute("data-prototype");

    this.initEvents();
  }
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
  display:function(rank){
    for(i=0; i<this.codeVersions.length; i++){
      this.codeVersions[i].classList.remove("visible");
      this.codeVersions[i].classList.add("hidden");
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
    this.codeVersions = document.getElementsByClassName("code-version");
    this.select.selectedIndex = this.codeVersions.length-1; 
    for(i=0; i<this.codeVersions.length; i++){
      if(!this.codeVersions[i].className.match("visible")){
        this.codeVersions[i].classList.add("hidden");
      }
    }
    this.iniEvents();
  }
}


window.addEventListener("turbolinks:load", function(){
  CodemirrorManage.init();
  SearchManage.init();
  DropDown.init();
  SnippetVersion.init();
  initSideBar();
}, false)
