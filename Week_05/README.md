学习笔记

# js表达式

## 语法树与运算符优先级

运算符的优先级会影响语法树的结构

### Expressions

按照优先级从高到底讲解：

#### 1. Member(最高优先级的一类运算)

```js
a.b
a[b]
foo`string` // 将string作为参数传给foo函数，跟Member无关，只是优先级相同
super.b
super['b']
new.target
new Foo() // 带括号的new，注意不带（）的new优先级比较低
```

#### 2. new

```
new a()()
new new a() // 因为带()的new优先级更高，所以这里的()是属于第二个new的
```



**Reference**类型

`a.b`取出来的是一个引用，而不是属性的值，引用类型不属于javascript的7种基本类型的任何一种，是存在于js运行时中的一种类型，被称为标准中的类型，而不是语言中的类型。

一个Reference取出来的是一个Object和一个key

`delete`和`assign`操作都会用到Reference类型，javascript用引用类型在运行时处理删除或者赋值这样的写相关的操作。



#### 3. Call

```js
foo()
super()
foo()['b']
foo().b // 降低了.运算的优先级，由此可以看出语法结构能够表达的内容要多于运算符优先级所能表达的，像.运算可以有不同优先级，它的优先级是由前面的语法结构决定的
foo()`abc`
```

```js
new a()['b']; //此处的()是先跟a结合还是先跟new结合？显然是先跟new结合，跟new结合的()属于menber类的优先级，要高于call优先级
```



#### 4. 左手left handside & 右手right handside运算

根据能否放到等号左边来判断左手运算还是右手运算，只有left handside expression才有资格放到等号左边。

所有的expression默认只要不属于left handside, 就一定属于right handside。

```
a.b = c;
a + b = c; // a + b是right handside expression， 不能放到等号左边
```

**Update**

```
a ++
a --
-- a
++ a
```



```js
++ a ++ ; //报错 VM7582:1 Uncaught SyntaxError: Invalid left-hand side expression in prefix operation
```



#### 5.单目运算符

```js
delete a.b
void foo()
typeof a
+ a
- a
~ a // 把整数按位取反，不是整数先强制转成整数
! a
await a
```



#### 6. Exponetal

```js
** // js中唯一一个右结合的运算符、
3 ** 2 ** 3
3 ** (2 ** 3)
```



#### 7. Multiplicative: * / %

#### 8. Additive + -

#### 9. Shift

```
<<  >>   >>>
```

#### 10. Relationship

```
< > <= >= instanceof
in
```

#### 11. Equality

```
==
!=
===
!==
```

#### 12. Bitwise

```
& ^ |
```

#### 13. Logical

有短路逻辑

```
&&
||
```

#### 14. Conditional

有短路逻辑

```
?:
```



## 类型转换

```js
a + b
"false" == false
a[o] = 1;
```



### **拆箱转换**

- ToPremitive
- toString vs valueOf
- Symbol.toPrimitive : 有定义的情况下，会忽略toString和valueOf

```js
var o = {
	toString() {return '2'},
	valueOf() {return 1},
	[Symbol.toPrimitive]() {return 3}
}
var x = {};
x[o] = 1;
console.log("x" + o); // x3
```



### 装箱转换

| 类型    | 对象                    | 值          |
| ------- | ----------------------- | ----------- |
| Number  | new Number(1)           | 1           |
| String  | new String("a")         | "a"         |
| Boolean | new Boolean(true)       | true        |
| Symbol  | new Object(Symbol("a")) | Symbol("a") |

使用.或者[]去访问属性时，如果.或者[]前面的变量或者表达式得到的是一个基础类型，那么就会自动调用装箱的过程



**练习：**

StringToNumber：解析四种不同进制的string，变成number；

NumberToString：传一个进制来指定它到底要转换成几进制的字符串



# js语句

### 运行时相关概念

#### **statement**

##### Runtime

- Completion Record: 用于记录语句的执行结果：是否有返回？返回值是啥等等

  [[type]]: normal, break, continue, return, or throw

  [[value]]: 基本类型

  [[target]]: label

- Lexical Environment



##### Grammar

- 简单语句：不会再容纳其他语句

  ExpressionStatement: 完全由表达式组成，`表达式+;`构成一个表达式语句，最核心的简单语句

  EmptyStatement：空语句，单独的一个分号`;`

  DebuggerStatement：`debugger;`

  ThrowStatement： 抛出异常，`thorw 表达式;`

  ContinueStatement：与循环语句搭配，结束当次循环

  BreakStatement：与循环语句搭配，结束整个循环。break适合在多层嵌套的循环语句中使用，带label的break可以一下子跳出多层的循环，节省if语句的判断和逻辑。

  ReturnStatement：一定要在函数中使用，返回函数值

  

- 复合语句

  BlockStatement：{语句列表}，最重要的语句，把所有需要单条语句的地方变成可以用多条语句

  IfStatement：条件语句

  SwitchStatement：多分支语句，建议用if-else替代

  IterationStatement：循环语句

  WithStatement：

  LabelledStatement：在语句前面加上label，相当于给语句取了名

  TryStatement：try-catch-finally, try后面跟的花括号不是BlockStatement，而是由try语句定义的。在try里面使用了return语句，finally中的代码还是会执行。

  

- 声明：凡是有对后续的语句发生作用的语句，都归为声明（跟js标准划分不完全一致）

  FunctionDeclaration：

  GeneratorDeclaration：`function* a(){}`

  AsyncFunctionDeclaration：`async function a(){}`

  AsyncGeneratorDeclaration：`async function* a(){}`

  VariableStatement：var

  ClassDeclaration：

  LexicalDeclaration：const ,let



`function`     `function *`     `async function`    `aysnc function *`    `var`: 这5中声明的作用范围是function body，且都会被当做出现在函数的第一行来处理（声明提升）

`class`    `const`    `let` ： 不会发生声明提升



**预处理（pre-process）**

预处理：在一段代码执行之前，js引擎会对代码本身做一次预先处理。

```js
var a = 2;
void function() {
  a = 1;
  return;
  var a;
}();
console.log(a); // 2
```

```js
var a = 2;
void function() {
  a = 1; 
  return;
  const a; // 报错Uncaught SyntaxError: Missing initializer in const declaration
}();
console.log(a);
```

所有的声明都是有预处理机制的，不论是var还是const，都会把变量变成一个局部变量，区别在于const声明的变量如果在声明前使用会报错。



# js结构化

JS执行力度（运行时）

- 宏任务： 传给js引擎的任务
- 微任务（promise)：js引擎内部的任务
- 函数调用（Execution context）
- 语句/声明（Completion Record）
- 表达式（Reference）
- 直接量/变量/this..



### 宏任务和微任务

js引擎相当于一个静态库，将以下代码传给js引擎：

```js
var x = 1;
var p = new Promise(resolve => resolve());
p.then(() => x = 3);
x = 2
```

js引擎产生了两个异步任务，这两个异步任务被称为MicroTask(Job):

```
x = 1
p = ...
x = 2
```

```
x = 3
```

把代码塞给引擎并且执行的整个过程称为MacroTask(宏任务)。



### 事件循环

事件循环包含三个部分：获取代码（get code），执行代码（execute），等待（wait）。

等待有可能是等待一个时间，有可能等待一个事件，在OC中一般会实现为等待一个锁，会有不同的条件去触发锁。



### js函数调用

执行上下文和执行上下文栈