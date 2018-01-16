function Vue(opts){
  this.data = opts.data;
  this.proxyKeys(this.data);
  this.methods = opts.methods;
    
  observe(this.data);
  new Compile(opts.el, this);
  opts.mounted.call(this);
}

Vue.prototype = {
  proxyKeys: function(data) {
    var self = this;
    Object.keys(data).forEach(function(key){
      Object.defineProperty(self, key, {
        enumerable: false,
        configurable: true,
        get: function() {
          return self.data[key];
        },
        set: function(newVal) {
          self.data[key] = newVal;
        }
      })
    })
  }
}