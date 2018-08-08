require.config({
  baseUrl: './',
  path: {
    'lib': 'lib'
  }
})

require(['lib', './add'], function(lib, math){
  console.log(math.add(lib.b))
  lib.changeNum()
  console.log(lib.b)
})