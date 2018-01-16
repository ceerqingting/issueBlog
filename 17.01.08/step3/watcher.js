function Watcher(vm, exp, cb) {
  this.vm = vm;
  this.exp = exp;
  this.cb = cb;
  this.value = this.get();
}

Watcher.prototype = {
  update: function() {
    this.run();
  },
  run: function() {
    if (this.exp instanceof Array){
      var value = this.vm.data[this.exp[0]][this.exp[1]];
      var oldVal = this.value; 
      if (value !== oldVal) {
        this.value = value;
        this.cb.call(this.vm, value, oldVal);
      }
    } else {
      var value = this.vm.data[this.exp];
      var oldVal = this.value;       
      if (value !== oldVal) {
        this.value = value;
        this.cb.call(this.vm, value, oldVal);
      }
    }

  },
  get: function() {
    Dep.target = this;
    if (this.exp instanceof Array) {
      var value = this.vm.data[this.exp[0]][this.exp[1]];
    } else {
      var value = this.vm.data[this.exp];
    }
    Dep.target = null;
    return value;
  }
}