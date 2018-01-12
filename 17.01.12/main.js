  var myWorker = new Worker("my_worker.js");
  var some_url = 'https://test1-iobs.pingan.com.cn/download/pss-esales-ela-gl-dmz-dev-pub/ELA_JSON_PRODUCTS_1120103025?1515722983444';
 async function get_useful_data() {
  console.log('async')
  const raw_data = await fetch(some_url).then((res)=>{
    return res.url;
  });
  console.log('post', raw_data);
  myWorker.postMessage(raw_data);
  var j = 1000000;
  while(j>0) {
    j--;
  }
  console.log('tongbu');
}
const show_data = (e) => {
  const data = e.data;
}
myWorker.onmessage = show_data;

get_useful_data();
