学习笔记
# TicTacToe小游戏

## 基础版：

1. 用二维数组pattern存放棋盘

2. 画出棋盘show()
    **注意：** 

  - 设置样式时，vertical-align设置为middle, line-height等于height；
  - 有多个判断时，三元表达式的书写；

3. 添加点击事件 move()
    **注意：**

  - 在for循环中添加点击事件，let和var的区别；
  - color交替计算的小技巧 3-color 、 2/color;
  - 计算完以后要重新show，show的时候要把board清空；

4. 判断胜负check()

   三横三列两斜

## 升级版1：
初步ai判断下一步是否出现了可赢的局面

check函数增加入参，变成纯函数；

添加willwin方法，循环遍历空节点，判断是否可以赢；

添加clone方法，克隆pattern

## 升级版2：

策略：

- 第一层：我要赢；

- 第二层：别输；

- 第三层：...

- 棋谱



1. 完美ai预先判断输赢，

   思路：先判断是否有我方能赢的点；如果没有，再找出对方策略最差的点，就是我方最好的点；

   递归：设置搜索深度，胜负剪枝

2. 把二维数组换成一维数组；

3. 改造clone方法，利用Object.create来创建一个新对象，继承patter的数据和方法，生命周期短于pattern，可以节省内存空间

## 升级版3：
人机对战

# 异步编程

红绿灯问题：一个路口的红绿灯，会按照绿灯亮10s,黄灯亮2s，红灯亮5s的顺序无限循环，请编写js代码来控制这个红绿灯。

js的异步机制：

- callback：回调地狱
- promise： 链式调用
- async/await ： 基于promise的语法支持和封装



generator与异步：

- generator模拟asycn/await

- async generator 

  for await of

   while(true)不带break的这种代码，在同步代码中基本不会出现，但是在异步代码中很常见，用于表示无限循环， 如操作系统的事件循环

  ```js
      function sleep(ms) {
        console.time();
        return new Promise((resolve) => {
          setTimeout(() => {
            console.timeEnd();
            resolve();
          }, ms);
        });
      }    
  
  	async function* counter() {
        let i = 0;
        while(true) {
          await sleep(1000);
          yield i++;
        }
      }
  
      (async function(){
        for await(let i of counter()) {
          console.log(i);
        }
      })()
  ```

  

问题：

1. win为什么要设置在块级作用局中，重复赋值？


https://github.com/GeekUniversity/Frontend-04-Template
交作业模板：
#学号: G20200447040023
#姓名: 朱淳
#班级: 1班
#小组: 2组
#作业&总结链接: https://github.com/czxzc/Frontend-04-Template/tree/master/Week_02