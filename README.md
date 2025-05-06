## 更新 style 的方案 - 结构共享

* 父 <Render> 的 props.node 改了 → 重新渲染。

* 子 <Render> 的 props.node 也因为链路拷贝，引用也改了 → 也重新渲染。

* 非变化路径下的 <Render> 保持旧引用 → 不浪费渲染

## 自定义 md 编辑器

Done：

- Header1～4(但对应到简历内容中似乎没必要制定这个`md`规则)
- 无序列表
- 有序列表

TODO：
- 粗体
- 行内代码
- 斜体
- 块引用