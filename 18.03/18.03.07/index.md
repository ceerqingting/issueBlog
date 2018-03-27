用框架用习惯了，很多时候我们会忘了去思考为什么一定要按照这个规范去用，其实往下再深究一下，会更加理解作者的意图，也让我们自己更加深刻的记住这个规范。

1. 组件名应为多个单词，根组件App除外。

   原因： 这样避免与HTML元素相冲突
   ```javascript
   Vue.component('todo-item', {
     // ...
   })
   ```
   ```javascript
   export default {
     name: 'TodoItem',
     // ...
   }
   ```
2. 组件的data必须是一个函数

   当在组件中使用data属性的时候（除了new Vue外的任何地方），它的值必须是返回一个对象的函数
   
   原因：当data的值是一个对象时，它会在这个组件的所有实例之间共享。这时因为每个组件的实例都引用了相同的数据对象，更改其中一个的数据，就会改变其他实例的数据。所以为了实现每个组件实例都管理其自己的数据，每个实例都必须生成一个独立的数据对象。在Javascript中，在一个函数中返回这个对象就可以了。
   ```javascript
     export default {
       data() {
         return {
           foo: 'bar'
         }
       }
     }
   ```
3. Prop定义应该尽量详细

   至少需要指定其类型

   原因：
   - 写明了组件的API，容易看懂组件的用法
   - 在开发环境下，如果向一个组件提供格式不正确的prop，Vue将会告警，帮组捕获潜在的错误来源

   ```javascript
   props: {
     status: String
   }
   ```
   ```javascript
   // 更好的做法
   props: {
     status: {
       type: String,
       required: true,
       validator: function(value){
         return [
           'syncing',
           'synced',
           'version-conflict',
           'error'
         ].indexOf(value) !== -1
       }
     }
   }
   ```
4. 为**v-for**设置键值

   总是用**key**配合**v-for**

   原因： 以便维护内部组件及其子树的状态。甚至在元素上维护可预测的行为。

   ```javascript
   data: function(){
     return {
       todos: [
         {
           id: 1,
           text: '学习使用v-for'
         },
         {
           id: 2,
           text: '学习使用key'
         }
       ]
     }
   }
   ```

   如果把它们按照字母顺序排序，在更新DOM的时候，Vue将会优化渲染把可能的DOM变动降到最低。即可能删除第一个元素，然后把它重新加回到列表的最末尾

   但是如果你想使用<transition-group>给列表加过渡动画，或想在被渲染元素是<input>时保持聚焦。在这些情况下，不能删除仍然会留在DOM中的元素，为每一个项目添加一个唯一的键值，将会让Vue知道如何使行为更加容易预测。

```html
  <ul>
    <li
      v-for="todo in todos"
      :key="todo.id"
    >
      {{ todo.text }}
    </li>
  </ul>
```
  

5. 避免**v-if**和**v-for**用在一起

- 情形一：（**v-for="user in users" v-if="user.isActive"**）
  
  正确做法： **users**替换为一个计算属性，让其返回过滤后的列表
- 情形二： (**v-for="user in users" v-if="shouldShowUsers"**)
 
  正确做法：**v-if移至容器元素上**

  原因：Vue处理指令时，v-for比v-if具有更高优先级
 
 ```html
 <ul>
   <li
     v-for="user in users"
     v-if="user.isActive"
     :key="user.id"
   >
   {{user.name}}
   </li>
 </ul>
 ```
 以上模板将会经过如下运算
 ```javascript
 this.users.map(function(user){
   if(user.isActive) {
     return user.name
   }
 })
 ```
 因此哪怕只渲染出一小部分用户的元素，也得在每次重渲染的时候遍历整个列表，不论活跃用户是否发生变化
 
 正确做法：
 ```javascript
 computed: {
   activeUsers: function(){
     return this.users.filter(function(user){
        return user.isActive
     })
   }
 }
 ```
 ```html
  <ul>
   <li
     v-for="user in activeUsers"
     :key="user.id"
   >
   {{user.name}}
   </li>
 </ul>
 ```

好处：
- 过滤后的列表只会在**users**数组发生相关变化时才被重新计算，过滤更搞笑
- 渲染的时候只遍历活跃用户，渲染更搞笑
- 解耦渲染层的逻辑，可维护性（对逻辑的更改和扩展）更强

同样可以把：
```html
<ul>
   <li
     v-for="user in activeUsers"
     v-if="shouldShowUsers"
     :key="user.id"
   >
   {{user.name}}
   </li>
 </ul>
```
更新为：

```html
<ul v-if="shouldShowUsers">
   <li
     v-for="user in activeUsers"
     :key="user.id"
   >
   {{user.name}}
   </li>
 </ul>
```
好处： 不会对每个用户检查**shouldShowUsers**，只检查一次，且不会在**shouldShowUsers**为否时运算**v-for**

6. 为组件样式设置作用域

对于应用来说，顶级**App**组件和布局组件中的样式可以是全局的。但是其他所有组件都应该是有作用域的。

这条规则只与单文件组件有关，不一定要使用scoped特性。设置作用域也可以通过CSS Modules，