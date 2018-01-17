function Observer(data) {
  this.data = data;
  var self = this;
  Object.keys(data).forEach(function(key){
    self.defineReactive(data, key, data[key]);
  })
}

Observer.prototype = {
  defineReactive: function(data, key, val) {
    var childObj = observe(val);
    Object.defineProperty(data, key, {
      enumerable: false,
      configurable: true,
      get: function(){
        return val;
      },
      set: function(newVal){
        if (val === newVal) { return };
        val = newVal;
      }
    })
  }
}
function Dep() {
  this.subs = [];
}
Dep.prototype = {
  addSub: function(sub){
    this.subs.push(sub)
  },
  notify: function() {
    
  }
}

function observe(val) {
  if (!val || typeof val !== 'object') { return; }
  return new Observer(val);
}
