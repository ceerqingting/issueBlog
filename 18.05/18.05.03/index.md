项目框架结构用的是vue + iview, 但是引用iview组件时，eslint老是提示

```
Parsing error: x-invalid-end-tag

```

解决方法：

在.eslintrc.js的rules加上

```
"vue/no-parsing-error": [2, { "x-invalid-end-tag": false }]

```

原文地址： [issue](https://github.com/iview/iview/issues/2828)