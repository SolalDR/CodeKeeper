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
//= require Request
//= require angular/angular
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
      this.cdMirrorInstance[i].on('inputRead', function(cm, event) {
        /* event -> object{
             origin: string, can be '+input', '+move' or 'paste'
                 doc for origins >> http://codemirror.net/doc/manual.html#selection_origin
             from: object {line, ch},
             to: object {line, ch},
             removed: array of removed strings
             text: array of pasted strings
        } */
        if (event.origin == 'paste') {
            console.log(event.text);
            var text = event.text[0]; // pasted string
            var new_text = '['+text+']'; // any operations here
            cm.refresh();
            // my first idea was
            // note: for multiline strings may need more complex calculations
            cm.replaceRange(new_text, event.from, {line: event.from.line, ch: event.from.ch + text.length});
            // first solution did'nt work (before i guess to call refresh) so i tried that way, works too
            /* cm.execCommand('undo');
            cm.setCursor(event.from);
            cm.replaceSelection(new_text); */
        }
      });
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



function createElement(str){
  var frag = document.createElement("fragment");
  frag.innerHTML = str;
  return frag.firstChild;
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
        var protoReplace = self.prototype;
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
        if(rank == self.activeR){
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
    if(document.activeElement == this.textField){
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
        // enter
        case 13:
          break;
        // right
        case 39:
          break;
        // left
        case 37:
          break;
        // top
        case 38:
          break;
        // bottom
        case 40:
          break;
        default:
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

window.onload = function(){
  CodemirrorManage.init();
  SearchManage.init();
  initSideBar();
}


CodeMirror.defineExtension("autoFormatRange", function (from, to) {
    var cm = this;
    var outer = cm.getMode(), text = cm.getRange(from, to).split("\n");
    var state = CodeMirror.copyState(outer, cm.getTokenAt(from).state);
    var tabSize = cm.getOption("tabSize");

    var out = "", lines = 0, atSol = from.ch == 0;
    function newline() {
        out += "\n";
        atSol = true;
        ++lines;
    }

    for (var i = 0; i < text.length; ++i) {
        var stream = new CodeMirror.StringStream(text[i], tabSize);
        while (!stream.eol()) {
            var inner = CodeMirror.innerMode(outer, state);
            var style = outer.token(stream, state), cur = stream.current();
            stream.start = stream.pos;
            if (!atSol || /\S/.test(cur)) {
                out += cur;
                atSol = false;
            }
            if (!atSol && inner.mode.newlineAfterToken &&
                inner.mode.newlineAfterToken(style, cur, stream.string.slice(stream.pos) || text[i+1] || "", inner.state))
                newline();
        }
        if (!stream.pos && outer.blankLine) outer.blankLine(state);
        if (!atSol) newline();
    }

    cm.operation(function () {
        cm.replaceRange(out, from, to);
        for (var cur = from.line + 1, end = from.line + lines; cur <= end; ++cur)
            cm.indentLine(cur, "smart");
        cm.setSelection(from, cm.getCursor(false));
    });
});

// Applies automatic mode-aware indentation to the specified range
CodeMirror.defineExtension("autoIndentRange", function (from, to) {
    var cmInstance = this;
    this.operation(function () {
        for (var i = from.line; i <= to.line; i++) {
            cmInstance.indentLine(i, "smart");
        }
    });
});
