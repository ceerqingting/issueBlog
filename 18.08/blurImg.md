## Medium是如何实现渐进式加载图片

最近，我在浏览Medium上的文章，我发现一个很好图片加载效果。首先，加载一个小的模糊图片，然后过渡到大的图片。我发现它非常整洁，想要剖析一下它是如何完成的。

<video controls="" style="max-width:100%" width="854" height="480"><source src="https://jmperezperez.com/assets/images/posts/medium-progressive-loading.mp4" type="video/mp4"></video>

加载过程：

1. 渲染一个图片的容器div。

Mediun使用 <div/> 标签，并且设置其 style 的padding-bottom 的值为一个百分比，对应原始图片的比例。这样能阻止当图片加载完成的重排，因为所有已渲染的元素都在它最终的位置。

2. 加载一个缩小版的图片。

目前，他们似乎要求质量非常低的小JPEG缩略图（比如20%）。这个小图片的标记在初始的HTML中以<img/>标签返回，所以浏览器开始立即请求资源

3. 一旦图片加载完成，它会被<canvas/>画出。然后，图片数据获取和传递通过一个自定义的blur函数，