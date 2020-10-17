学习笔记
# 1 字符串分析算法
- 字典树：精确匹配字符串跟模式，主要用来处理海量字符串。大量高重复字符串的存储和分析，检查两个字符串是否完全匹配，如搜索关键词等

- KMP：在一个长字符串匹配短字符串，将时间复杂度O(m*n) 变为O(m+n)

- Wildcard: 在KMP的基础上增加了通配符，带通配符的字符串模式， ？-匹配任意字符，*-匹配任意数量的任意字符，用于文件查找等。时间复杂度为O(m+n)或者O(n),贪心算法

- 正则：字符串通用模式匹配

- 状态机：通用的字符串分析

- LL LR: 字符串多层级结构分析

  

## 1.1 字典树

字典树的分析过程：

![1601090109768](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1601090109768.png)

在js中用object或者map来保存字典树的分支结构

用一个symbol来表示截止符

字典树是哈希树的一个特例



## 1.2 KMP字符串模式匹配算法

在一个长字符串（source）中查找一个短字符串（pattern），暴力破解的话时间复杂度为O(m*n)

关注字符串的自重复行为

![1601094519131](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1601094519131.png)

表格第二排的数字表示匹配到当前位置时，前面有几个字符出现重复

![1601094750940](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1601094750940.png)

KMP算法：

1. 求跳转表格；考虑情况：'aabaaabc', 'abcababcd', 'abcabc'
2. 进行匹配



## 1.3 Wildcard算法
wildcard加入了两种通配符：

？-匹配任意字符

\*-匹配任意数量的任意字符

情况更复杂。

```
wildcard: ab*c?d*abc*a?d
简化问题：
只有*：ab*cd*abc*a?d
只有?: c?d, a?d
```

![1602419698938](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1602419698938.png)

- <font color="red">\*</font>到底是尽量匹配多，还是尽量匹配少？

最后一个<font color="red">\*</font>(也就是上图中橙色的\*)尽可能的匹配多的字符，其他<font color="red">\*</font>尽量少匹配

- 特殊的两个段：开头段和结尾段，开头绿色的部分只匹配开头的几个字符，结尾蓝色的部分只匹配尾巴上的几个字符。

- 剩余黑色的部分，一个\*加上一段字符作为一组，表示在一个字符串中去找一个特定pattern的字符（KMP算法），如上图的<font color="orange">\*cd</font>代表在源字符串中找<font color="orange">cd字符，<font color="orange">\*abc</font>代表在源字符串中找<font color="orange">abc</font>字符
- 上图的字符串若去掉问号，则是一个wildcard其实就是若干个kmp组成的格式。加上问号，则要写带问号的kmp算法，但是带问号的kmp有点复杂，我们进一步思考：在一个字符串中找一个特定的pattern，除了kmp算法，还可以使用正则的exec来解决。如果把整个wildcard转换成正则，性能一定不合格，通过逐段的转换成exec去处理正则表达式，性能是没有大问题的。

处理步骤：

1. 从头到尾找出一共有几个\*
2. 处理边缘情况：没有\*的情况
3. 处理第一个\*之前的字符串匹配；
4. 处理一个\*加上一段字符作为一组的字符串匹配，将？通配符替换为正则的“[\\\s\\\S]”
5. 结尾段的匹配； 结尾段从后往前匹配，最后一个\*可以不用去处理，因为只要确保开头段，\*跟字符串组成的每一组模式和结尾段都有匹配到，最后一个*不论匹配多少字符都无所谓。



思考题：是否可以用带问号的kmp算法替代正则来实现wildcard算法？



# 2 proxy与双向绑定

## 2.1 proxy的基本用法

应用了proxy的代码会导致预期性变差，proxy是专门为底层库设计的一个特性。

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy

proxy的get和set与普通对象的getter和setter的区别：即使对象上不存在的属性，proxy的get和set也可以监听到。



## 2.2 模仿vue的reactive实现原理

1.  定义reactive函数，返回用new proxy包装过得对象；
2.  定义粗糙版的effect，有严重的性能问题，因为callbacks是一个全局的数组，如果给100个对象设置了100了effect，每次执行都会把所有的回调函数执行一遍，就会执行1万遍
3. effect只有在对应变量变化时，才触发函数的调用，问题： 监听不到po.a.b
4.  优化reactive，<font color="red">为什么要缓存reactive生成的proxy？</font>



## 2.3 reactivity响应式对象

首先来思考一个问题：reactivity有什么用?

reactivity是半成品的双向绑定，负责【数据-->dom】这条线的监听

实现调色盘



# 3 使用Range实现dom精确操作

实现一个正常流里的拖拽，元素在拖拽过程中会参与排版

思路：

1. 实现拖拽的骨架；

- 使用drag事件无法实现元素完全跟随鼠标移动，这里要用mousedown，mousemove, mouseup结合来实现

- 必须在mousedown里面监听mousemove和mouseup事件，避免鼠标一移动就触发mousemove和mouseup事件；
- mousemove和mouseup事件绑定在document上，避免 鼠标拖动太快，移出了dragable的区域时会发生拖断的情况



2. 让元素跟随鼠标动起来

- 采用transform+translate来实现；
- 识别鼠标的起始点，translate的计算要减去鼠标的起始位置；
- 第二次拖动translate的计算要在上一次的translate上去叠加



3. 利用CSSOM和Range实现正常流里的拖拽

- 文字没有分节点，需要用range寻找到可以拖拽插入的空隙

- 利用CSSOM的api `getBoundingClientRect()`来拿到range的位置，注意此处不能将getBoundingClientRect()的值保存起来，因为该值会根据页面布局不同而不同，只能在每次使用到时去计算；

- insertNode操作之前不需要先移除node，因为dom操作默认会进行移除

  

