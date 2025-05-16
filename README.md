## 更新 style 的方案 - 结构共享

- 父 <Render> 的 props.node 改了 → 重新渲染。

- 子 <Render> 的 props.node 也因为链路拷贝，引用也改了 → 也重新渲染。

- 非变化路径下的 <Render> 保持旧引用 → 不浪费渲染

## 自定义 md 编辑器

**Q&A：**

1. 为啥放弃现成的富文本编辑器/`md`编辑器而是自己实现

主要是为了与项目适配

**核心需求**：每个节点动态绑定随机`ID`，第三方库无法直接干预 DOM 结构

> 这是为了后续的“简历内容评论”、“简历模板自定义样式修改”功能而服务，这两者都需要通过节点`id`记录哪部分被评论/被修改

**轻量化**：现有三方库功能冗余，自定义实现更符合项目场景

> 在简历编辑场景中，基本上只需要：无序列表、有序列表、加粗、斜体、行内代码块，连1~4级标题都可以不需要

**可控性**：避免黑盒限制，方便未来扩展

**权衡**：明确未来会评估重构成本，不排斥合理的技术迭代

Done：

- Header1 ～ 4(但对应到简历内容中似乎没必要制定这个`md`规则)
- 无序列表
- 有序列表
- 粗体
- 行内代码
- 斜体

TODO：
- 块引用

**一些后续优化方向：**

- 输入时的防抖处理
- `XSS`攻击

## 注册&登录

目前登录注册仅仅是跑通，存在一些细节未处理，如：
1. 修改了`<Input />`组件的样式后会与校验信息重叠，需要改动（主要集中在登录页中，可参考注册页进行修改）
2. 登录页的`<Button>`的`loading`状态处理不正确(先暂时这么写)

## 级联组件根据当前层级实现非关键项禁用

**需求**：

当用户点击不同的`dom`时，需要综合考虑`dom`当前所处的层级、`dom`隶属于哪个模块下，从而动态的禁用非相关的级联组件属性

eg: 当前的大容器绑定的是`EDN_BG`，那么该容器的下一级应该只能选择`label`或`info`字段；如果当前容器选择了`info`字段，那么它的后代就只能选择`bg`、`school`、`date`字段，以此类推

**实现方案**：

由于`renderTemplate`是递归渲染的，那么每一次执行都传入一个递增的`deep`表示当前处于第几层；以及把上一次的`bind`字段拼接上当前层的`bind`字段一并传下去，用于表示`bind`路径；后续对绑定路径进行分割 + `deep`当前层数，即可实现动态过滤级联组件的效果

```tsx
const renderTemplate = (
  uiSchema: singleNode,
  deep: number,
  prevBind: string
) => {
  return (
    <>
      <fieldset
        onClick={(e) => {
          e.stopPropagation()
          // 记录当前选中节点在递归中的层级，用于<RightPanel />中禁用非相关的级联选项
          setNodeDeep(deep)
          setNodeBind(prevBind)
          // 记录当前选中节点的key
          setCurrentSelectedKey(uiSchema.nodeKey)
        }}
      >
        {/* 省略非关键代码 */}
        <div
          className={`${
            uiSchema.layout === 'horizontal' ? styles['flex-fieldset'] : ''
          }`}
        >
          {uiSchema.children?.length
            ? uiSchema.children.map((nestedChild: singleNode) => (
                <React.Fragment key={nestedChild.nodeKey}>
                  {/* 这里根据递归的层数拼接bind字段，在后续<RightPanel />中根据拼接路径以及deep层级筛选出所需的bind */}
                  {renderTemplate(
                    nestedChild,
                    deep + 1,
                    prevBind + '-' + nestedChild.bind
                  )}
                </React.Fragment>
              ))
            : null}
        </div>
      </fieldset>
    </>
  )
}
```

## 绑定字段上下文感知

上一点仅仅是讨论了级联组件角度的可选字段正确禁用(通过路径拼接和层级得到`上一层`的信息，从而过滤出对应的可选项)，但是由于整份`uiSchema`是树+嵌套的关系，在绑定字段时，还需要感知上下文，即：当父容器未进行绑定时，子容器无法拖拽进来

**思路：**

物料的描述信息中，`nodeKey`由`uuid()`生成，可以拼接上当前模块的`type`，并在绑定的时候，将`bind`字段也拼接上，整体结构为:`xxxx?module&EDU_BG`。当执行拖拽的时候，`handleDrop`中，拿到目标放置容器的`nodeKey`，此时便可以得知目标放置容器的类型以及是否绑定了字段，实现上下文感知

```ts
// 物料描述信息
{
  svg: normalBoxSVG,
  title: '模块容器',
  sub: '用于定义单个模块',
  // JSON描述信息
  desUISchema: {
    ableDel: true,
    type: 'module',
    isNestedAgain: true,
    layout: 'vertical',
    style: {},
    bind: '',
    tag: '',
    nodeKey: uuidv4() + '?module',
    children: [],
  },
},

// 执行字段绑定的时候
setConfig: (nodeKey, key, value) => {
  set(
    produce((state: designStoreType) => {
      const targetNode = findNode(nodeKey, state.currentUISchema)
      if (!targetNode) return
      targetNode[key] = value
      // 如果修改的是字段绑定值，记录当前容器所绑定的字段，用于后续的绑定上下文感知
      if (key === 'bind') {
        targetNode.nodeKey += `&${value}`
      }
    })
  )
}

// 放置在目标容器中
const handleDrop = (
  nodeKey: string,
  targetKey: string,
  desUISchema: any,
  deep: number
) => {
  console.log('deep', deep, targetKey)
  const typeAndBind = targetKey.split('?')[1]
  // 解析出目标容器的类型和bind字段，如果bind字段为空，说明父容器还未绑定具体字段，此时就不能直接拖拽子元素进来
  const [type, bind] = typeAndBind.split('&')
  if (type === 'module' && !bind) {
    return message.warning('请先标注当前模块类型')
  }
  insertNode(nodeKey, targetKey, desUISchema)
}
```

### 现存问题：

1. 
2. 
3. 
4. 模板设计时，样式控制不够精细，导致内容可渲染、但UI不符合预期

- [x] `section`模式下的循环存在一点问题 -> 丢失`info`层级的绑定
- [ ] 设置简历模板时，全局容器当前没有`configStyle`导致出现样式偏差
- [x] `tag`、`label`、`text`混乱，到底谁才是模块的标题，以及`uiSchema`中的`tag`是否起到了作用 -> `tag`未起实际作用，另外，`label`、`text`应该做一个收敛，没必要同时存在这两个`type`