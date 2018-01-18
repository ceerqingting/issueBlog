function Observer(data){
  this.data = data;
  var self = this;
  Object.keys(data).forEach(function(key){
     self.defineReactive(data, key, data[key]);
  })
}

Observer.prototype = {
  defineReactive: function(data, key, val){
    var dep = new Dep();
    var child = observe(val); 
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: true,
      get: function(){
        console.log('get')
        if (Dep.target) {
          dep.addSub(Dep.target);
        }
        return val;
      },
      set: function(newVal){
        if (val === newVal) {
          return;
        }
        val = newVal;
        dep.notify();
      }
    })
  }
}

function observe(val) {

  if (!val || typeof val !== 'object'){
    return;
  }
  return new Observer(val);
}

function Dep() {
  this.subs = [];
}

Dep.prototype = {
  addSub: function(sub){
    this.subs.push(sub)
  },
  notify: function(){
    this.subs.forEach(function(sub){
      sub.update();
    })
  }
}

Dep.target = null;
