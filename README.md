## 更新 style 的方案 - 结构共享

* 父 <Render> 的 props.node 改了 → 重新渲染。

* 子 <Render> 的 props.node 也因为链路拷贝，引用也改了 → 也重新渲染。

* 非变化路径下的 <Render> 保持旧引用 → 不浪费渲染
