## Medium是如何实现渐进式加载图片

最近，我在浏览Medium上的文章，我发现一个很好图片加载效果。首先，加载一个小的模糊图片，然后过渡到大的图片。我发现它非常整洁，想要剖析一下它是如何完成的。

<video controls="" style="max-width:100%" width="854" height="480"><source src="https://jmperezperez.com/assets/images/posts/medium-progressive-loading.mp4" type="video/mp4"></video>

### 加载过程：

1. 渲染一个图片的容器div。

Mediun使用 <div/> 标签，并且设置其 style 的padding-bottom 的值为一个百分比，对应原始图片的比例。这样能阻止当图片加载完成的重排，因为所有已渲染的元素都在它最终的位置。

2. 加载一个缩小版的图片。

目前，他们似乎要求质量非常低的小JPEG缩略图（比如20%）。这个小图片的标记在初始的HTML中以<img/>标签返回，所以浏览器开始立即请求资源

3. 一旦图片加载完成，它会被<canvas/>画出。然后，图片数据获取和传递通过一个自定义的blur函数，你可以在main-base.bundle JS文件中看到它，有点乱码。这个功能与StackBlur的模糊功能相似，但不完全相同。同时，请求主图像

4. 一旦主图像加载完，它会显示出来，canvas将被隐藏。所有的过度动画都是非常平滑的，感谢css动画的应用

### 实现原理

图片实现的结构图

```html
<figure>
  <div>
     <div><!--这个div将会保持宽高比例，所以占用位不会被折叠-->
       <img/> <!--这是一个分辨率很低图片，~27x17和低质量-->
       <canvas/><!--将上面的图片应用高斯模糊-->
       <img/><!--大的图片将要显示的地方-->
       <noscript><!--fallback for no JS-->
     </div>
  </div>
</figure>
```

一个具体的例子，你将看到这些是什么发生的

```html
  <figure name="2170" id="2170" class="graf graf--figure graf-after--li">
    <div class="aspectRatioPlaceholder is-locked" style="max-width: 700px; max-height: 530px;">
      <div class="aspectRatioPlaceholder-fill" style="padding-bottom: 75.8%;"></div>
      <div class="progressiveMedia js-progressiveMedia graf-image is-canvasLoaded is-imageLoaded" data-image-id="0*sdYBIZugLh_DJFvu"
        data-width="1155" data-height="875" data-action="zoom" data-action-value="0*sdYBIZugLh_DJFvu" data-scroll="native">
        <img src="https://cdn-images-1.medium.com/freeze/max/27/0*sdYBIZugLh_DJFvu?q=20" crossorigin="anonymous" class="progressiveMedia-thumbnail js-progressiveMedia-thumbnail">
        <canvas class="progressiveMedia-canvas js-progressiveMedia-canvas" width="75" height="55"></canvas>
        <img class="progressiveMedia-image js-progressiveMedia-image" data-src="https://cdn-images-1.medium.com/max/720/0*sdYBIZugLh_DJFvu"
          src="https://cdn-images-1.medium.com/max/720/0*sdYBIZugLh_DJFvu">
        <noscript class="js-progressiveMedia-inner">
          <img class="progressiveMedia-noscript js-progressiveMedia-inner" src="https://cdn-images-1.medium.com/max/720/0*sdYBIZugLh_DJFvu">
        </noscript>
      </div>
    </div>
    <figcaption class="imageCaption">
      <em class="markup--em markup--figure-em">Text on multiple lines with a rounded corner background</em>
    </figcaption>
  </figure>
```

### 重现效果

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <style>
.placeholder {
  background-color: #f6f6f6;
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  overflow: hidden;
}

.placeholder img {
  position: absolute;
  opacity: 0;
  top: 0;
  left: 0;
  width: 100%;
  transition: opacity 1s linear;
}

.placeholder img.loaded {
  opacity: 1;
}

.img-small {
  filter: blur(50px);
  /* this is needed so Safari keeps sharp edges */
  transform: scale(1);
}
  </style>
</head>
<body>
  <div class="placeholder" data-large="https://cdn-images-1.medium.com/max/1800/1*sg-uLNm73whmdOgKlrQdZA.jpeg">
     <img src="https://cdn-images-1.medium.com/freeze/max/27/1*sg-uLNm73whmdOgKlrQdZA.jpeg?q=20" class="img-small">
     <div class="heightholder"></div>
  </div>
  <script>
      window.onload = function() {     
        var placeholder = document.querySelector('.placeholder'),
            small = placeholder.querySelector('.img-small'),
            heightholder = placeholder.querySelector('.heightholder');
        
        // 1: load small image and show it
        var img = new Image();
        img.src = small.src;
        img.onload = function () {
            heightholder.style.paddingBottom = ((img.width / img.height) * 100).toFixed(2) + '%';
            small.classList.add('loaded');
        };
        
        // 2: load large image
        var imgLarge = new Image();
        imgLarge.src = placeholder.dataset.large; 
        imgLarge.onload = function () {
          imgLarge.classList.add('loaded');
        };
        placeholder.appendChild(imgLarge);
      }
  </script>
</body>
</html>
```

### 这样值的吗？

很明显 ，有很多事情可以用这种方式渲染图片，并且如果在你网站上做类似的事情可能有些沮丧。几年前，做这种动画和模糊效果用一种高效的方式是不可能的，但是事实是大部分情况延迟是瓶颈，而不是设备的功能，我们可以继续这些视觉的探索

完全掌握图片的加载有几点好处：

- 懒加载

使用JS来发起请求允许他们掌控哪些图片要发起请求。虽然所有小缩略图被加载了，但是大图只有在视窗内才会被请求

- 更好的占位

缩略图非常小，只有2kb，结合模糊的效果会比纯色的占位更好，而也不用牺牲负载

- 剪裁图片大小

Medium根据不同设备发出的请求来提供不同图片大小，优化页面的重量

