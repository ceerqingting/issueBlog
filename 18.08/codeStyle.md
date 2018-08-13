## 函数编程方式让你代码更易读

单纯的函数更容易阅读与理解。所有函数的依赖关系都在其定义中，所以更容易看到。单纯的函数功能往往很小而且只做一件事。它们不使用this，这个一直是混乱的源头。

### Chaining(链式)

Chaining是被用来简化多个方法一个接一个的应用于对象的技巧

让我们来比较下两种风格： 过程式和函数式。在函数式风格中，我使用列表操作的基本方法，filter()和map()。然后把他们连在一起。

我们拿任务的收集举例。一个任务有id，desc, completed(boolean), type

```js
// Imperative style
var filteredTask = [];
var task, i;
for(i = 0; i < task.length; i++) {
  task = tasks[i];
  if (task.type === "RE" && !task.completed) {
    filteredTask.push({id: task.id, desc: task.desc});
  }
}

// Functional style
function isPriorityTask(task) {
  return task.type === "Re" && !task.completed
}

function toTaskViewModel(task) {
  return {id: task.id, desc: task.desc}
}

var filteredtask = tasks.filter(isPriorityTask).map(toTaskViewModel);
```

注意filter() 和 map() 的回调是用的以揭示意图命名的纯方法

### Point-free style(无参数风格)

在之前的例子中，我使用了无参数风格构造函数。无参数是通过减少不必要的参数来提高可读性。想一下如下代码

```js
tasks.filter(task => isPriorityTask(task)).map(task => toTaskViewModel(task));
```

无参数风格是没有参数的：

```js
tasks.filter(isPriorityTask).map(toTaskViewModel);
```

