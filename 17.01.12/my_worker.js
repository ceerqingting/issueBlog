const do_a_lot_of_processing = (data) => {
  console.log('lot')
  var i = 10000;
  while(i>0){
    i--;
  }
  console.log('receive', data);
}

onmessage = function(e) {
  postMessage(do_a_lot_of_processing(e.data));
}