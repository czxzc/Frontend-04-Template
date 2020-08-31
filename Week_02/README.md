学习笔记

# 1. 寻路|实现一个地图编辑器

用一个长度为10000的一维数组来保存map，[].fill()

用js生成10000个div

3个监听事件：

- mousemove: 绑定在每个格子上 ，实现逻辑和视觉上的选中和清除

- mousedown: 绑定在父元素container上，标识鼠标按下的是哪个键，左键画， 右键清除

  如何判断鼠标点击的是右键？e.which === 3

  点击右键要清楚默认弹出菜单事件，可以通过监听contextmenu实现

- mouseup: 绑定在父元素container上