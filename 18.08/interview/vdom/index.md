```html
  <ul id="list">
    <li class="item">Item 1</li>
    <li class="item">Item 2</li>
  </ul>
```

```javascript
 {
   tag: 'ul',
   attrs: {
     id: 'list'
   },
   children: [
     {
       tag: 'li',
       attrs: {
         className: 'item'
       },
       children: ['Item 1']
     },
     {
       tag: 'li',
       attrs: {
         className: 'item'
       },
       children: ['Item 2']
     }
   ]
 }
```

```js
  var vnode = h('ul#list', {}, [
    h('li.item', {}, 'Item 1'),
    h('li.item', {}, 'Item 2')
  ])
```