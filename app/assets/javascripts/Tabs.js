DOMTokenList.prototype.replace =function(arg1, arg2){
  this.remove(arg1);
  this.add(arg2);
}

function getTarget(url){
  var match = url.match(/.+?(#.+)$/);
  if( match ) {
    return match[1] ? match[1] : null;
  } else {
    return null;
  }
}

TabsManage = {

  findActive:function(href){
    var target = getTarget(href);
    var matchEl = document.querySelector(target);

    var response = {};
    for(i=0; i<this.itemsHead.length; i++){
      if(getTarget(this.itemsHead[i].href) === target) {
        response.head = this.itemsHead[i];
        response.r = i;
      }
      if(this.itemsBody[i] == matchEl){
        response.body = this.itemsBody[i];
      }
    }

    return response;
  },

  active:function(response){
    if(!response.head.className.match("active")){
      response.head.classList.add("active");
    }
    this.bar.style.left = response.r*(100/this.itemsHead.length)+"%";
  },

  manageUrl:function(href){
    href = href.replace(/.+(#.+)$/, "$1");
    var actual = window.location.href;
    if(actual.match(/#.+$/)){
      window.location.href = window.location.href.replace(/#.+$/, href);
    } else {
      window.location.href += href;
    }
  },

  removeActive:function(){
    for(i=0; i<this.itemsHead.length; i++){
      this.itemsHead[i].classList.remove("active");
      this.itemsHead[i].classList.remove("left");
      this.itemsHead[i].classList.remove("right");
    }
  },

  onItemClick:function(el, r){
    var self = this;
    el.addEventListener("click", function(e){
      e.preventDefault();

      self.currentRank = r;
      self.bar.style.left = r*(100/self.length)+"%";
      self.slide.style = "transform: translateX("+r*(-100/6)+"%) translateZ(0);"

      self.removeActive();
      this.classList.add("active");
      // self.manageUrl(this.href);
      return false;
    }, false)
  },

  onItemsClick:function(){
    for(i=0; i<this.itemsHead.length; i++){
      this.onItemClick(this.itemsHead[i], i);
    }
  },

  init:function(){
    this.tab = document.getElementById("tabs");
    if( this.tab ){
      this.bar = document.getElementById("bar");
      this.itemsHead = document.querySelectorAll(".item-head-select a");
      this.length = this.itemsHead.length;
      this.itemsBody = document.querySelectorAll(".item-body-select");
      this.slide = document.getElementById("slide");
      this.onItemsClick();
      if(this.itemsBody.length !== this.itemsHead.length) console.warn("Le nombre d'élément itemHead ne correspond par au nombre d'élément body");
      var response = this.findActive(window.location.href);
      if( response && response.head ) {
        this.active(response);
      }
    }
  }

}
