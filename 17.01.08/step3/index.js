function Vue(opts){
  this.data = opts.data;
  new Compile(opts.el, this);
  var self = this;
  Object.keys(this.data).forEach(function(key){
    self.proxyKey(key);
  })
}

Vue.prototype = {
  proxyKey: function(key) {
    var self = this;
    Object.defineProperty(this, key, {
      enumerable: false,
      configurable: true,
      get: function(){
        return self.data[key];
      },
      set: function(newVal) {
        self.data[key] = newVal;
      }
    })
  }
}