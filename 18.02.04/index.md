### 跨域解决方案

#### 什么是跨域
【广义的跨域】：跨域是指一个域下的文档或者脚本试图请求另一个域下的资源

1. 资源跳转：A链接、重定向、表单提交
2. 资源嵌入： \<link>、\<script>、\<img>、\<iframe>等dom标签，还有样式中background:url()、@font-face()等文件外链
3. 脚本请求： js发起的ajax请求、dom和js对象的跨域操作等

【狭义的跨域】：由浏览器同源策略限制的一类请求场景
 
【同源策略/SOP(same origin policy)】： 由Netscape公司1995年引入浏览器，它是浏览器最核心也最基本的安全功能，如果缺少了同源策略，浏览器很容易受到XSS,CSFR等攻击。同源是指“协议+域名+端口”三者相同，即便两个不同的域名指向同一个ip地址，也非同源

【限制】：
1. Cookie、LocalStorage和IndexDB无法读取
2. DOM和Js对象无法获得
3. AJAX请求不能发送

#### 跨域解决方案
[1. 通过jsonp跨域](#1)

[2. document.domain + iframe跨域](#2)

[3. location.hash + iframe](#3)

[4. window.name + iframe跨域](#4)

[5. postMessage跨域](#5)

[6. 跨域资源共享（CORS）](#6)

[7. nginx代理跨域](#7)

[8. nodejs中间件代理跨域](#8)
9. WebSocket协议跨域

<h4 id="1">通过jsonp跨域</h4>
通常为了减轻web服务器的负载，我们把js、css、img等静态资源分离到另一台独立域名的服务器上，在html页面中在通过相应的标签从不同域名下加载静态资源，而被浏览器允许。基于此原理，我们可以通过动态创建script，再请求一个带参网址实现跨域通信


- 原生实现
```javascript
 
```
服务端返回：
```javascript
  
```

后端node.js代码
```javascript
  var querystring = require('querystring');
  var http = require('http');
  var server = http.createServer();
  server.on('request', function(req, res){
    var params = qs.parse(req.url.split('?')[1]);
    var fn = params.callback;
    res.writeHead(200, {'Content-Type': 'text/javascript'});
    res.write(fn + '(' + JSON.stringfy(params) + ')');
    res.end();
  })
  server.listen('8080');
  console.log('Server is running at port 8080...');
```

缺点： 只能实现get一种请求

<h4 id="2">document.domain + iframe跨域</h4>
此方案仅限主域相同，子域不同的跨域应用场景

【实现原理】：两个页面都通过js强制设置document.domain为基础主域，就实现了同域

- 父窗口： (http://www.domain.com/a.html)

```html
  <iframe id="iframe" src="http://child.domain.com/b.html"></iframe>
  <script>
    document.domain = 'domain.com';
    var user = 'admin';
  </script>
```
- 子窗口：（http://child.domain.com/b.html）

```html
 <script>
   document.domain = 'domain.com';
   alert('get js data from parent ==>' + window.parent.user);
 </script>
```
<h4 id="3">location.hash + iframe跨域</h4>
【实现原理】：a欲与b跨域互相通信，通过中间页c来实现。三个页面，不同域之间利用iframe的location.hash传值，相同域之间直接js访问来通信

【具体实现】：A域：a.html -> B域：b.html -> A域：c.html，a与b不同域只能通过hash值单向通信，b与c也不同域也只能单向通信，但c与a同域，所以c可以通过parent.parent访问a页面所有对象

- a.html: (http://www.domain1.com/a.html)
```html
  <iframe id="iframe" src="http://www.domain2.com/b.html" style="display:none"></iframe>
  <script>
    var iframe = document.getElementById('iframe');
    // 向b.html传hash值
    setTimeout(function(){
      iframe.src = iframe.src + '#user=admmin';
    }, 1000)
    // 开放给同域c.html的回调方法
    function onCallback(res) {
      alert('data from c.html --->' + res);
    }
  </script>
```

- b.html: (http://www.domain2.com/b.html)
```html
  <iframe id="iframe" src="http://www.domain1.com/c.html" style="display:none;"></iframe>
  <script>
    var iframe = document.getElementById('iframe');
    // 监听a.html传来的hash值，在传给c.html
    window.onhashchange = function() {
      iframe.src = iframe.src + location.hash;
    }
  </script>
```

- c.html: (http://www.domain1.com/c.html)
```html
 <script>
  //监听b.html传来的hash值
  window.onhashchange = function() {
    window.parent.parent.onCallback('hello:' + location.hash.replace('#user=', ''));
  }
 </script>
```
<h4 id="4">window.name + iframe跨域</h4>
window.name属性的独特之处：name值在不同的页面（甚至不同域名）加载后依旧存在，并且可以支持非常长的name值（2MB）

- a.html: (http://www.domain1.com/a.html)

```javascript
  var proxy = function(url, callback) {
    var state = 0;
    var iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.onload = function() {
      if (state === 1) {
        // 第2次onload(同域proxy页)成功后，读取同域window.name中数据
        callback(iframe.contentWindow.name);
        destoryFrame();
      } else if (state === 0) {
        // 第1次onload(跨域页)成功后，切换到同域代理页面
        iframe.contentWindow.location = 'http://www.domain1.com/proxy.html';
        state = 1;
      }
    }
    document.body.appendChild(iframe);
    function destoryFrame() {
      iframe.contentWindow.document.write('');
      iframe.contentWindow.close();
      document.body.removeChild(iframe);
    }
  }

  // 请求跨域b页面数据
  proxy('http://www.domain2.com/b.html', function(data) {
    alert(data);
  })
```
- proxy.html: (http://www.domain1.com/proxy...)

中间代理页，与a.html同域，内容为空即可

- b.html: (http://www.domain2.com/b.html)
```script
  window.name = 'This is domain2 data!';
```

- 总结： 通过iframe的src属性由外域转向本地域，跨域数据即由iframe的window.name从外域传递到本地域。这个巧妙地绕过了浏览器的跨域访问限制，但同时又是安全操作

<h4 id="5">postMessage跨域</h4>
postMessage是HTML5 XMLHttpRequest Level2中的API，且是为数不多可以跨域操作的window属性之一，它可以用于解决一下方面问题：

- 页面和其打开的新窗口的数据传递
- 多窗口之间消息传递
- 页面与嵌套的iframe消息传递
- 上面三个场景的跨域数据传递

【用法】：postMessage(data, origin)方法接受两个参数
data: html5规范支持任意基本类型或可复制的对象，但部分浏览器只支持字符，所以传参时最好用JSON.stringfy()序列化
origin: 协议 + 主机 + 端口号，也可以设置为“*”，表示可以传递给任意窗口，如果要指定和当前窗口同源的话就设置为“/”

- a.html: (http://www.domain1.com/a.html)
```html
  <iframe id="iframe" src="http://www.domain2.com/b.html" style="display:none"></iframe>
  <script>
    var iframe = document.getElementById('iframe');
    iframe.onload = function() {
      var data = {
        name: 'aym'
      }
      // 向domain2传送跨域数据
      iframe.contentWindow.postMessage(JSON.stringify(data), 'http://www.domain2.com')
    }
    window.addEventListener('message', function(e) {
      alert('data from domain2 --->' + e.data);
    }, false)
  </script>
```
- b.html: (http://www.domain2.com/b.html)
```html
  <script>
  // 接收domian1的数据
  window.addEventListener('message', function(e) {
    alert('data from domain1--->' + e.data);
    var data = JSON.parse(e.data);
    if (data) {
      data.number = 16;
      window.parent.postMessage(JSON.stringify(data), 'http://www.domain1.com', false)
    }
  })
  </script>
```
<h4 id="6">跨域资源共享（CORS）</h4>
普通跨域请求：只服务端设置Access-Control-Allow-Origin即可，前端无须设置，若要带cookie请求，前后端都需要设置

注意： 由于同源策略的限制，所读取的cookie为跨域请求接口所在域的cookie，而非当前页。如果想实现当前页cookie的写入。可参考7.nginx反向代理中设置proxy_cookie_domain和8.NodeJs中间件代理中cookieDomainRewrite参数的设置

【前端设置】
- 原生ajax
```javascript
  var xhr = new XMLHttpRequest();

  // 前端设置是否带cookie
  xhr.withCredentials = true;
  xhr.open('post', 'http://www.domain2.com:8080/login', true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send('user=domain');
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      alert(xhr.responseText);
    }
  }
```
【服务端设置】
 - Java后台：
 ```java
 /**
  * 导入包： import javax.servlet.http.HttpServletResponse;
  * 接口参数中定义： HttpServletResponse response
 */
 response.setHeader('Access-Control-Allow-Origin', 'http://www.domain1.com'); // 若有端口需写全（协议+域名+端口
 response.setHeader('Access-Control-Allow-Credentials', 'true');
 ```
- Nodejs后台
```javascript
  var http = require('http');
  var qs = require('querystring');

  var server = http.createServer();
  server.on('request', function(res, req) {
    var postData = '';
    // 数据块接收中
    req.addListener('data', function(chunk){
      postData += chunk;
    })
    // 数据接收完毕
    req,addListener('end', function(){
      postData = qs.parse(postData);
      res.writeHead(200, {
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Origin': 'http://www.domian1.com',
        'Set-Cookie': 'l=a123456;path=/;Domain=www.domain2.com'
      })
      res.write(JSON.stringify(postData));
      res.end();
    })
  })
  server.listen('8080');
```

<h4 id="7">nginx代理跨域</h4>

- nginx配置解决iconfont跨域
浏览器跨域访问js、css、img等常规静态资源被同源策略许可，但iconfont字体文件（eot/otf/ttf/woff/svg）例外，此时可在nginx的静态资源服务器中加入以下配置。

```
location / {
  add_header Access-Control-Allow-Origin *;
}
```
- nginx反向代理接口跨域
【跨域原理】：同源策略是浏览器的安全策略，不是HTTP协议的一部分。服务器端调用HTTP接口只是使用HTTP协议，不会执行JS脚本，不需要同源策略，也就不存在跨域问题

【实现思路】：通过nginx配置一个代理服务器（域名与domain1相同，端口不同）做跳板机，反向代理访问domain2接口，并且可以顺便修改cookie中domain信息，方便当前域cookie写入，实现跨域登录

【nginx具体配置】
```
 #proxy服务器
 server {
   listen 81;
   server_name www.domain1.com;
   location / {
     proxy_pass http://www.domain2.com:8080; #反向代理
     proxy_cookie_domain www.domain2.com www.domain1.com; #修改cookie里域名
     index index.html index.htm;

     # 当用webpack-dev-server等中间件代理接口访问nignx时，此时无浏览器参与，故没有同源限制，下面的跨域配置可不启用
     add_header Access-Control-Allow-Origin http://www.domain1.com;  #当前端只跨域不带cookie时，可为*
     add_header Access-Control-Allow-Credentials true;
   }
 }
```
【前端代码】：
```javascript
var xhr = new XMLHttpRequest();

// 前端开关：浏览器是否读写cookie
xhr.withCredentials = true;

// 访问nginx中的代理服务器
xhr.open('get', 'http://www.domain1.com:81/?user=admin', true);
xhr.send();
```
【nodejs后台】：
```javascript
var http = require('http');
var server = http.createServer();
var qs = require('querystring');

server.on('request', function(req, res) {
    var params = qs.parse(req.url.substring(2));

    // 向前台写cookie
    res.writeHead(200, {
        'Set-Cookie': 'l=a123456;Path=/;Domain=www.domain2.com;HttpOnly'   // HttpOnly:脚本无法读取
    });

    res.write(JSON.stringify(params));
    res.end();
});

server.listen('8080');
console.log('Server is running at port 8080...');
```

<h4 id="8">nodejs中间件代理跨域</h4>

node中间件实现跨域代理，原理大致与nginx相同，都是通过启一个代理服务器，实现数据的转发，也可以通过设置cookieDomainRewrite参数修改响应头中cookie中域名，实现当前域的cookie写入，方便接口登录认证。

【非vue框架跨域】（2次跨域）

 利用node + express + http-proxy-middleware搭建一个proxy服务器。

 - 前端
 ```javascript
 var xhr = new XMLHttpRequest();

// 前端开关：浏览器是否读写cookie
xhr.withCredentials = true;

// 访问http-proxy-middleware代理服务器
xhr.open('get', 'http://www.domain1.com:3000/login?user=admin', true);
xhr.send();
 ```

 - 中间件服务器
 ```javascript
var express = require('express');
var proxy = require('http-proxy-middleware');
var app = express();

app.use('/', proxy({
    // 代理跨域目标接口
    target: 'http://www.domain2.com:8080',
    changeOrigin: true,

    // 修改响应头信息，实现跨域并允许带cookie
    onProxyRes: function(proxyRes, req, res) {
        res.header('Access-Control-Allow-Origin', 'http://www.domain1.com');
        res.header('Access-Control-Allow-Credentials', 'true');
    },

    // 修改响应信息中的cookie域名
    cookieDomainRewrite: 'www.domain1.com'  // 可以为false，表示不修改
}));

app.listen(3000);
console.log('Proxy server is listen at port 3000...');
 ```
 - node后台同（六：nginx）
 【vue框架的跨域】（1次跨域）
 利用node + webpack + webpack-dev-server代理接口跨域。在开发环境下，由于vue渲染服务和接口代理服务都是webpack-dev-server同一个，所以页面与代理接口之间不再跨域，无须设置headers跨域信息了。

 webpack.config.js部分配置：

 ```javascript
 module.exports = {
    entry: {},
    module: {},
    ...
    devServer: {
        historyApiFallback: true,
        proxy: [{
            context: '/login',
            target: 'http://www.domain2.com:8080',  // 代理跨域目标接口
            changeOrigin: true,
            secure: false,  // 当代理某些https服务报错时用
            cookieDomainRewrite: 'www.domain1.com'  // 可以为false，表示不修改
        }],
        noInfo: true
    }
}
 ```