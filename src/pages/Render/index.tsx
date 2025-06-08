import React, { memo } from 'react'
import { Dayjs, isDayjs } from 'dayjs'
import styles from './index.module.scss'
import { useStyleStore, useUIStore } from '@/store'
import { nodeType } from '@/types/ui'
import { tokenizer } from '@/components/MdEditor/utils/tokens'
import { buildAST } from '@/components/MdEditor/utils/ast'
import { renderAST } from '@/components/MdEditor/utils/render'
// import BlockWrapper from './BlockWrapper'
interface RenderProps {
  node: nodeType | null
  dataContext: any
  top?: number
  wheel: number
}

// 个人信息表单项的标题
const keyToFieldLabel: Record<string, string> = {
  userName: '姓名',
  gender: '性别',
  age: '年龄',
  position: '求职岗位',
  phone: '电话',
  email: '邮箱',
  tblob: '个人博客',
}

// 这里原先使用 memo 时，当用户自定义修改样式，是无法达到更新的效果的
// 因为 memo 进行的是浅比较，而原先修改的逻辑是借助"currentSchema与uiSchema引用地址相同"进行修改的，所以 uiSchema 的引用地址保持不变，所以加了 memo 之后就不会更新
// TODO：每一次只需要进行很小的 style 改动，但是却要重新执行整个递归，导致会有很明显的样式更新延迟
const Render = (props: RenderProps) => {
  const { dataContext, node, wheel } = props
  const lineHeight = useStyleStore((state) => state.lineHeight)
  const fontSize = useStyleStore((state) => state.fontSize)
  const fontColor = useStyleStore((state) => state.fontColor)
  const bgColor = useStyleStore((state) => state.bgColor)
  const borderStyle = useStyleStore((state) => state.borderStyle)
  const modulePadding = useStyleStore((state) => state.modulePadding)
  const pagePadding = useStyleStore((state) => state.pagePadding)

  if (!node) return null
  const { type, layout, children = [], style = {}, bind, label = '' } = node

  let mergedStyle: React.CSSProperties = {
    display:
      type === 'container' ||
      type === 'columns' ||
      type === 'root' ||
      type === 'module' ||
      type === 'section'
        ? layout === 'horizontal'
          ? 'flex'
          : layout === 'grid'
          ? 'grid'
          : 'block'
        : undefined,
    flexDirection: layout === 'vertical' ? 'column' : 'row',
    ...style,
    borderBottomStyle: style.borderBottomStyle ? borderStyle : 'none',
  }

  // 根部
  if (type === 'root') {
    const rootStyle: React.CSSProperties = {
      lineHeight: lineHeight,
      fontSize: fontSize + 'px',
      color: fontColor,
      backgroundColor: bgColor,
      padding: pagePadding + 'px',
    }

    // 整体是两栏布局，需要设置主侧栏的比例并且表示当前简历全局是两栏排列的
    // if (layout === 'grid') {
    //   setIsHorizontal(true)
    //   rootStyle.gridTemplateColumns = sidebarProportions
    //     .map((item) => item + 'fr')
    //     .join(' ')
    // }

    return (
      <div
        className={styles['render-container']}
        style={{
          ...mergedStyle,
          ...rootStyle,
        }}
        data-node-key={node.nodeKey}
      >
        {children.map((child: any, index: number) => {
          return (
            <Render
              key={index}
              dataContext={dataContext}
              node={child}
              wheel={wheel}
            />
          )
        })}
      </div>
    )
  }

  if (type === 'container' || type === 'columns' || type === 'module') {
    // 如果当前是模块，style.padding还要考虑联动
    if (type === 'module') {
      mergedStyle = {
        ...mergedStyle,
        paddingTop: modulePadding + 'px',
        paddingBottom: modulePadding + 'px',
      }
    }
    // 有时候，container只是作为容器存在，并不一定会在当前container渲染数据(可能是在它的子元素中),这种 case 就需要传递dataContext进行兜底
    const data = dataContext[bind] || { ...dataContext }

    return (
      <div
        className={`${type}-box`}
        style={mergedStyle}
        data-node-key={node.nodeKey}
      >
        {children.map((child: any, index: number) => {
          return (
            <Render key={index} node={child} dataContext={data} wheel={wheel} />
          )
        })}
      </div>
    )
  }

  // 局部循环列表
  if (type === 'section') {
    const list = dataContext[bind] || []
    // 此时做两层循环，一层是遍历数据列表，一层是遍历所有的子容器
    return list && list.length ? (
      <div
        className="section-box"
        style={mergedStyle}
        data-node-key={node.nodeKey}
      >
        {list.map((item: any, index: number) => {
          return item.visible ? (
            <React.Fragment key={index}>
              {children.map((child: any, idx: number) => {
                return (
                  <Render
                    key={idx}
                    dataContext={item}
                    node={child}
                    wheel={wheel}
                  />
                )
              })}
            </React.Fragment>
          ) : null
        })}
      </div>
    ) : null
  }

  // 此处对应模块标题
  if (type === 'text') {
    const data = dataContext[bind]
    // 取不到对应的值，直接返回null
    if (!data) {
      return null
    }
    return (
      <div
        className="text-box"
        style={mergedStyle}
        data-node-key={node.nodeKey}
      >
        {data}
      </div>
    )
  }

  if (type === 'md') {
    const data = dataContext[bind] ?? '占位信息...'
    mergedStyle = {
      ...mergedStyle,
      listStylePosition: 'inside',
    }

    const tokens = tokenizer.tokenize(data)
    const ast = buildAST(tokens)
    const mdStr = renderAST(ast)
    if (!mdStr) return null

    return (
      <div
        style={mergedStyle}
        dangerouslySetInnerHTML={{
          __html: mdStr,
        }}
        data-node-key={node.nodeKey}
      />
    )
  }

  if (type === 'image') {
    return (
      <img
        src={dataContext[bind]}
        style={{
          ...mergedStyle,
          width: (Number(mergedStyle?.width) || 75) * wheel + 'px',
          height: (Number(mergedStyle?.height) || 140) * wheel + 'px',
        }}
      />
    )
  }

  if (type === 'field') {
    let val = dataContext[bind]
    // 如果处理的是时间，做一下特殊处理，去掉""
    if (bind === 'date') {
      val = val.replace(/"/g, '')
    }
    return (
      <div className={`${styles['field-box']}`} style={mergedStyle}>
        <div className={styles['label']}>
          {keyToFieldLabel[bind]}
          {keyToFieldLabel[bind] ? ': ' : null}
        </div>
        <div className={styles['value']}>{val}</div>
      </div>
    )
  }
  return null
}
Render.displayName = 'Render'
export default memo(Render)
