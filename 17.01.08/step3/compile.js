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
    console.log(this.fragment);
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
        self.compileText(node, reg.exec(node.textContent)[1]);
        // node.textContent = self.vm.data[reg.exec(node.textContent)[1]];
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
  compileText: function(node, exp) {
    var self = this;
    if (/\./.test(exp)) {
      exp = exp.split('.');
      this.updateText(node, this.vm[exp[0]][exp[1]]);
      new Watcher(this.vm, exp, function(value){
        self.updateText(node, value)
      })
    } else {
      this.updateText(node, this.vm[exp]);
      new Watcher(this.vm, exp, function(value){
        self.updateText(node, value)
      })
    }
 
  },
  updateText: function(node, val) {
    node.textContent = typeof val === 'undefined' ? '' : val ;
  },
  compileEvent: function(node, dir, exp){
    var eventType = dir.split(':')[1];
    var cb = this.vm.methods[exp];
    if (eventType&&cb) {
      node.addEventListener(eventType, cb.bind(this.vm), false);
    }
  },
  compileModel: function(node, exp) {
    var self = this;
    var value = this.vm[exp];
    new Watcher(this.vm, exp, function(value){
      self.modelUploader(node, value);
    })
    this.modelUploader(node, value);
     node.addEventListener('input', function(e){
       var newVal = e.target.value;
       if (newVal === value) {return};
       self.modelUploader(node, newVal);
       value = newVal;

       self.vm[exp] = newVal;
     }, false)
  },
  modelUploader: function(node, val) {
    node.value = typeof val === 'undefined' ? '' : val ;
  }
}

