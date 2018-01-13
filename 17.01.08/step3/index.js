function Vue(opts){
  this.data = opts.data;
  new Compile(opts.el, this);
  
}