import { CSSProperties } from 'react'
import { Dayjs, isDayjs } from 'dayjs'
import styled from './index.module.scss'
import { useStyleStore } from '@/store'
interface RenderProps {
  node: {
    type: string
    layout: string
    children?: any[]
    style?: CSSProperties
    bind: string
    repeat?: string
    showLabel?: boolean
    label?: string
  }
  dataContext: any
}

const checkDate = (data: any) => {
  return Array.isArray(data) && data.every((date: Dayjs) => isDayjs(date))
}

const formatDate = (data: Dayjs[]) => {
  return data.map((item) => item.format('YYYY-MM')).join('~')
}

const Render = ({ dataContext, node }: RenderProps) => {
  const lineHeight = useStyleStore((state) => state.lineHeight)
  const fontSize = useStyleStore((state) => state.fontSize)
  const fontColor = useStyleStore((state) => state.fontColor)
  const bgColor = useStyleStore((state) => state.bgColor)
  const borderStyle = useStyleStore((state) => state.borderStyle)
  const modulePadding = useStyleStore((state) => state.modulePadding)

  const {
    type,
    layout,
    children = [],
    style = {},
    bind,
    showLabel = true,
    label = '',
  } = node

  let mergedStyle: React.CSSProperties = {
    display:
      type === 'container' || type === 'root' || type === 'module'
        ? layout === 'horizontal'
          ? 'flex'
          : 'block'
        : undefined,
    flexDirection: layout === 'vertical' ? 'column' : undefined,
    ...style,
    borderBottomStyle: style.borderBottomStyle ? borderStyle : 'none',
  }

  // 根部
  if (type === 'root') {
    const rootStyle: React.CSSProperties = {
      lineHeight: style.lineHeight ?? lineHeight,
      fontSize: style.fontSize ?? fontSize + 'px',
      color: style.color ?? fontColor,
      backgroundColor: style.backgroundColor ?? bgColor,
    }
    // console.log('merge', mergedStyle, rootStyle)
    return (
      <div
        className={styled['render-container']}
        style={{
          ...mergedStyle,
          ...rootStyle,
        }}
      >
        {children.map((child: any, index: number) => {
          return <Render key={index} dataContext={dataContext} node={child} />
        })}
      </div>
    )
  }

  if (type === 'container' || type === 'module') {
    // 如果当前是模块，style.padding还要考虑联动
    if (type === 'module') {
      mergedStyle = {
        ...mergedStyle,
        paddingTop: modulePadding + 'px',
        paddingBottom: modulePadding + 'px',
      }
    }
    // 不需要显示栏目的label，参考BASE_INFO，所拿到的 dataContext 需要再往下拆一层
    if (!showLabel) {
      // 此时是非循环列表
      const data = dataContext[bind].info || {}
      const visible = dataContext[bind].visible
      if (!visible) return null
      return (
        <div style={mergedStyle}>
          {children.map((child: any, index: number) => {
            return <Render key={index} node={child} dataContext={data} />
          })}
        </div>
      )
    } else {
      // 需要显示栏目label，则不能往下直接拆到info[];因为还有label
      // 有时候，container只是作为容器存在，并不一定会在当前container渲染数据(可能是在它的子元素中),这种 case 就需要传递dataContext进行兜底
      const data = dataContext[bind] || { ...dataContext }
      return (
        <div style={mergedStyle}>
          {children.map((child: any, index: number) => {
            return <Render key={index} node={child} dataContext={data} />
          })}
        </div>
      )
    }
  }

  // 局部循环列表
  if (type === 'section') {
    const list = dataContext[bind] || []
    // 此时做两层循环，一层是遍历数据列表，一层是遍历所有的子容器
    return (
      <div style={mergedStyle}>
        {list.map((item: any, index: number) => {
          return (
            <div key={index}>
              {children.map((child: any, idx: number) => {
                return (
                  <Render key={idx} dataContext={item} node={child}></Render>
                )
              })}
            </div>
          )
        })}
      </div>
    )
  }

  if (type === 'text') {
    let data = dataContext[bind]
    if (!data) {
      data = '默认内容...'
    } else if (checkDate(data)) {
      data = formatDate(data)
    }
    return <div style={mergedStyle}>{data}</div>
  }

  if (type === 'html') {
    const data = dataContext[bind] ?? '占位信息...'
    mergedStyle = {
      ...mergedStyle,
      listStylePosition: 'inside',
    }

    return (
      <div
        style={mergedStyle}
        dangerouslySetInnerHTML={{
          __html: data,
        }}
      />
    )
  }

  if (type === 'label') {
    return <div style={mergedStyle}>{label}</div>
  }

  if (type === 'image') {
    return <img src={dataContext[bind]} style={mergedStyle} />
  }
  return null
}

export default Render
