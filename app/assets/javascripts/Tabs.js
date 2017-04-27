
TabsManage = {

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
      self.removeActive();
      this.classList.add("active");
      self.manageUrl(this.href);
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
      this.onItemsClick();
    }
  }

}
