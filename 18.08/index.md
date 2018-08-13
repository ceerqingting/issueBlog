1. 基本类型和包装类之间的转换

基本类型和包装类之间经常需要互相转换

```java
Integer a = new Integer(3); // 定义Integer包装类对象，值为3
int b = a + 5; // 将对象和基本类型进行运算
```
在JDK1.5引入自动装箱和拆箱的机制后，包装类和基本类型之间的转换就更加便利了

装箱： 把基本类型转换为包装类，使其具有对象的性质，又可分为手动装箱和自动装箱

```java
int i = 10; // 定义一个int基本类型值
Integer x = new Integer(i); // 手动装箱
Integer y = i; //自动装箱
```

拆箱：把包装类对象转换成基本类型的值，又可分为手动拆箱和自动拆箱

```java
Integer j = new Integer(8); // 定义一个Integer包装类对象，值为8
int m = j.intValue(); // 手动拆箱为int类型
int n = j // 自动拆箱为int类型
```

2. 基本类型和字符串之间的转换

基本类型转换为字符串有三种方法：

a. 使用包装类toString()方法
b. 使用String类的valueOf()方法
c. 用一个空字符串加上基本类型，得到的就是基本类型数据对应的字符串


将字符串转换成基本类型有两种方法：

a. 调用包装类的parseXxx静态方法
b. 调用包装类的valueOf()方法转换为基本类型的包装类，会自动拆箱


3. 使用Date和SimpleDateFormat类表示时间

```java
Date d = new Date();
SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
String today = sdf.format(d);

String day = "2014年02月14日 10:30:25"
SimpleDateFormat df = new SimpleDateFormat("yyyy年MM月dd日 HH:mm:ss");

Date date = df.parse(day);
```

4. Calendar类的应用

java.util.Calendar类是一个抽象类，可以通过getInstance()静态方法获取一个Calendar对象，此对象已由当前日期时间初始化，即默认代表当前时间

```java
Calendar c = Calendar.getInstance();
int year = c.get(Calendar.YEAR);
int month = c.get(Calendar.MONTH) + 1
int day = c.get(Calendar.DAY_OF_MONTH);
int hour = c.get(Calendar.HOUR_OF_DAY);
int minute = c.get(Calendar.MINUTE);
int second = c.get(Calendar.SECOND);

Date date = c.getTime();
Long time = c.getTimeInMillis();
```

5. 用Math类操作数据

Math类位于java.lang包中，包含用于执行基本数学运算方法，Math类的所有方法都是静态方法，所以使用该类中的方法时，可以直接使用类名.方法名，如：Math.round();

