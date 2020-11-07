学习笔记

# 浏览器工作原理



![1601387682258](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1601387682258.png)

第一步：经过http请求，解析http回应，将url中包含的html取出来；

第二步：对文本html进行parse，经过文本分析和基础编译，将html变为dom树；

第三步：进行css computing，得到一颗带css属性的dom树，严格来讲，是带样式的dom树，css的全程是级联样式表，级联样式表是不可能待在dom树上的；

第四步：通过layout，将dom树上所有元素产生的盒位置计算出来，获得位置的并不是dom元素本身，而是css生成的盒；

第五步：渲染，将dom树画在一张图片上，通过操作系统和硬件驱动提供的api接口将这张图片展示出来。

bitmap：是一张图片，传给显卡驱动设备，转换成人眼可识别的光信号



