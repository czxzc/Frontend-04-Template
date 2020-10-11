学习笔记
# 字符串分析算法
- 字典树：精确匹配字符串跟模式，主要用来处理海量字符串。大量高重复字符串的存储和分析，检查两个字符串是否完全匹配，如搜索关键词等

- KMP：在一个长字符串匹配短字符串，将时间复杂度O(m*n) 变为O(m+n)

- Wildcard: 在KMP的基础上增加了通配符，带通配符的字符串模式， ？-匹配任意字符，*-匹配任意数量的任意字符，用于文件查找等。时间复杂度为O(m+n)或者O(n),贪心算法

- 正则：字符串通用模式匹配

- 状态机：通用的字符串分析

- LL LR: 字符串多层级结构分析

  

## 字典树

字典树的分析过程：

![1601090109768](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1601090109768.png)

在js中用object或者map来保存字典树的分支结构

用一个symbol来表示截止符

字典树是哈希树的一个特例



## KMP字符串模式匹配算法

在一个长字符串（source）中查找一个短字符串（pattern），暴力破解的话时间复杂度为O(m*n)

关注字符串的自重复行为

![1601094519131](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1601094519131.png)

表格第二排的数字表示匹配到当前位置时，前面有几个字符出现重复

![1601094750940](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1601094750940.png)

KMP算法：

1. 求跳转表格；考虑情况：'aabaaabc', 'abcababcd', 'abcabc'
2. 进行匹配



## Wildcard算法
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