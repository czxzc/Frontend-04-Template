学习笔记

## 一、寻路

### 1. 实现一个地图编辑器

1. 用一个长度为10000的一维数组来保存map，[].fill()

2. 用js生成10000个div，

   没有给div设置边距，为什么会有边距？https://www.jb51.net/css/645772.html

3. 添加3个监听事件：

- mousemove: 绑定在每个格子上 ，实现逻辑和视觉上的选中和清除

- mousedown: 绑定在父元素container上，标识鼠标按下的是哪个键，左键画， 右键清除

  如何判断鼠标点击的是右键？e.which === 3

  点击右键要清除默认弹出菜单事件，可以通过监听contextmenu实现

- mouseup: 绑定在父元素container上



### 2. 广度优先搜索

1. 在寻路问题上不能使用递归，用了递归就使用了深度优先算法，深度优先在寻路问题上不友好

2. 搜索方法有三个入参：map(地图), start(起点), end(终点)

3. 数据结构：用queue队列来保存搜索的节点，js中的队列（push+shift）和栈(unshift+pop)都可以用数组来表示：

   push(): 从尾部插入

   unshift()：从头部插入

   shift()：删除第一个元素

   pop()：删除最后一个元素

这个 搜索算法的关键点就在于要用队列来保存，如果是用栈保存，就会变成深度优先搜索

注意：在用localStorage缓存数组时，要用JSON.stringify处理下数组



### 3.通过异步编程可视化寻路算法

当前存在两个问题：

1. 算法的正确性无法保证；
2. 没有返回路径

这一小节解决第1个问题

在将当前节点插入到队列的方法中，将当前节点的背景色设置为lightgreen, 添加异步的sleep方法，可以看到div变色的过程，实现可视化



### 4. 处理路径问题

在当前节点上保存上一个节点的坐标，从最后一个节点出发，按照链式查找，就可以找到开始的节点

1. 以map为原型创造一个新对象table；
2. insert方法增加一个入参pre，代表上一个节点的坐标
3. 当每次进行插入队列操作时，将pre保存到table的当前节点中；
4. 找到终点后，从终点出发，链式查找table， 直到找到起点为止。



### 5. 启发式搜索

1. 什么是启发式搜索？

   用一个函数去判断点扩散的<u>优先级</u>

   数学家证明：启发式函数的估值只要能够一定小于这个点到终点的路径，它就是个一定能找到最优路径的启发式寻路

   A* : 能找到最优路径的启发式寻路

   A: 不一定能找到最终的启发式寻路

 2. 在我们的代码中怎么实现启发式搜索？

    1) 将先进先出的queue改成能<u>以一定的优先级来提供点的数据结构</u>，这里用`class Sort`来实现；

    class Sort接收一个数据data和一个判断优先级的方法compare，包含两个成员方法take()和give()，保证每次take的时候拿的总是最小的，give的时候不用管

    

    删除数组时，要少挪动数组的元素：

    splice删除数组后，可能会有挪动数组的操作，时间复杂度为O(n)，不推荐使用，

    可以将数组的最后一个元素，赋值给当前要删除的数组的位置，然后pop删除最后一个元素，这样时间复杂度就变为了O(1)



​		2) distance() 计算点到终点的距离



选做：

1. 怎么找到最佳路径？ 提示：调整insertQueue中table的读写

2. 优化Sort中的数据结构替换为二叉堆

   什么是二叉堆？

   [https://baike.baidu.com/item/%E4%BA%8C%E5%8F%89%E5%A0%86](https://baike.baidu.com/item/二叉堆)

   https://blog.csdn.net/qq_35344198/article/details/107024843

可以用数组来保存二叉堆

构建二叉堆的思路：从最后一个非叶子节点开始下沉调整，依次将所有的非叶子节点调整完成为止。



### 6. 使用LL算法构建AST

AST: 抽象语法树

构建语法树，抽象AST的过程，也叫作语法分析，核心的语法分析算法思想包括LL算法和LR算法

https://zhuanlan.zhihu.com/p/122571100

四则运算：

- tokenNumber: 1 2 3 4 5 6 7 8 9 0 小数点的组合
- operator: + - * /
- whitespace: <SP>
- lineTerminator: <LF> <CR>

编码：

1. 词法分析：
   - 定义一个正则和字典，利用正则表达式的exec方法来判断正则捕获到的字符串类型；
   - 判断是否存在非法字符；
   - 使用generator和yield ，结合for-of获取匹配到的每个字符的类型和值；

2. 语法分析：

   根据产生式来进行语法分析

   ```
   <Expression>::=
   <AdditiveExpression><EOF>
   ```

   ```
   // 加法产生式一
   <AdditiveExpression>::=
   <MultiplicativeExpression> |
   <AdditiveExpression><+><MultiplicativeExpression> |
   <AdditiveExpression><-><MultiplicativeExpression> |
   
   ```

   ```
   // 乘法产生式
   <MultiplicativeExpression>::=
   <Number> |
   <MultiplicativeExpression><*><Number> |
   <MultiplicativeExpression></><Number> |
   ```

   ```
   // 将MultiplicativeExpression扩展后的，加法产生式二
   <AdditiveExpression>::=
   <Number> |
   <MultiplicativeExpression><*><Number> |
   <MultiplicativeExpression></><Number> |
   <AdditiveExpression><+><MultiplicativeExpression> |
   <AdditiveExpression><-><MultiplicativeExpression> |
   ```

   

   输入"10 + 25 / 2"，产生的语法树为：

```json
{
	"type": "Expression",
	"children": [{
		"type": "AdditiveExpression",
		"operation": "+",
		"children": [{
			"type": "AdditiveExpression",
			"children": [{
				"type": "MultiplicativeExpression",
				"children": [{
					"type": "number",
					"val": "10"
				}]
			}]
		}, {
			"type": "+",
			"val": "+"
		}, {
			"type": "MultiplicativeExpression",
			"operation": "/",
			"children": [{
				"type": "MultiplicativeExpression",
				"children": [{
					"type": "number",
					"val": "25"
				}]
			}, {
				"type": "/",
				"val": "/"
			}, {
				"type": "number",
				"val": "2"
			}]
		}]
	}, {
		"type": "EOF"
	}]
}
```

![](C:\Users\Administrator\Desktop\1.png)