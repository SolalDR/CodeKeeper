//Crée un élément depuis une string
function createElement(str){
  var frag = document.createElement("fragment");
  frag.innerHTML = str;
  return frag.firstChild;
}


function toggleDisplay(el, visible, hidden){
  el.className = el.className.match(visible) ? el.className.replace(visible, hidden) : el.className.replace(hidden, visible);
}
