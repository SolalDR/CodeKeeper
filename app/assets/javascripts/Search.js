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
