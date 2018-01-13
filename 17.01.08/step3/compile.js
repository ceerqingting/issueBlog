function Compile(el, vm){
  this.vm = vm;
  this.el = document.querySelector(el);
  this.fragment = null;
  this.init();
}
Compile.prototype = {
  init: function(){
    this.fragment = this.nodeToFragment(this.el);
    this.compileElement(this.fragment);
    this.el.appendChild(this.fragment);
  },
  nodeToFragment: function (el) {
    var fragment = document.createDocumentFragment();
    var child = el.firstChild;
    while (child) {
      fragment.appendChild(child);
      child = el.firstChild;
    }
    return fragment;
  },
  compileElement: function (el) {
    var self = this;
    el.childNodes.forEach(function (node) {
      var reg = /\{\{(.*)\}\}/;
      if (self.isTextNode(node)&& reg.test(node.textContent)) {
        node.textContent = data[reg.exec(node.textContent)[1]];
      } else if (self.isElementNode(node)) {
        var attrs = node.attributes;
        Array.prototype.forEach.call(attrs, function (attr) {
          var attrName = attr.name;
          if (self.isDirective(attrName)) {
            var exp = attr.value;
            var dir = attrName.substring(2);
            if (self.isEventDirective(dir)) {
               self.compileEvent(node, dir, exp);
            } else {
               self.compileModel(node, exp);
            }
            node.removeAttribute(attrName)
          }
        })
      }
      if (node.childNodes&&node.childNodes.length) {
        self.compileElement(node);
      }
    })
  },
  isElementNode: function(node){
     return node.nodeType === 1;
  },
  isTextNode: function(node) {
    return node.nodeType === 3;
  },
  isDirective: function(attr) {
    return attr.indexOf('v-') === 0;
  },
  isEventDirective: function(dir) {
    return dir.indexOf('on:') === 0
  },
  compileEvent: function(node, dir, exp){
    var eventType = dir.split(':')[1];
    node.addEventListener(eventType, methods[exp], false);
  },
  compileModel: function(node, exp) {
     node.addEventListener('input', function(e){
       data[exp] = e.target.value;
     }, false)
  }
}

