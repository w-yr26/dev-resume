import { create } from 'zustand'
import { produce } from 'immer'
import { v4 as uuidv4 } from 'uuid'
import type { designStoreType, singleNode } from '@/types/ui'
import { devtools } from 'zustand/middleware'

export const findNode = (
  nodeKey: string,
  originSchema: singleNode
): singleNode | null => {
  if (!nodeKey) return null
  if (nodeKey === originSchema.nodeKey) return originSchema
  if (!originSchema.children?.length) return null
  for (const child of originSchema.children) {
    const res = findNode(nodeKey, child)
    if (res) return res
  }
  return null
}

const useDesignStore = create<designStoreType>()(
  devtools(
    (set, get) => {
      return {
        currentUISchema: {
          type: 'root', // 根容器
          isNestedAgain: true, // 是否支持嵌套，即children是否有值
          layout: 'vertical',
          style: {}, // 即configStyle
          configStyle: {
            pagePadding: 14,
            modulePadding: 8,
            lineHeight: 1.5,
            fontSize: 14,
            mainColor: 'rgb(71, 85, 105)',
            fontColor: 'rgb(10, 10, 10)',
            bgColor: 'rgb(255, 255, 255)',
            borderStyle: 'solid',
          },
          bind: 'root',
          tag: '',
          nodeKey: 'root' + '~' + uuidv4(),
          children: [
            {
              type: 'module', // 根容器
              isNestedAgain: true, // 是否支持嵌套，即children是否有值
              layout: 'vertical',
              style: {}, // 即configStyle
              bind: '',
              tag: '',
              nodeKey: 'module1' + '~' + uuidv4(),
              children: [],
            },
          ],
        },
        currentSelectedKey: '',
        insertNode: (nodeKey, targetKey, desUISchema) => {
          set(
            produce((state: designStoreType) => {
              const targetNode = findNode(targetKey, state.currentUISchema)
              if (!targetNode) return
              // 理论上，能支持拖拽放入的节点都会有children字段，即 nested = true，此处只是做一个兜底
              targetNode.children = targetNode.children || []
              targetNode.children = [
                ...targetNode.children,
                {
                  ...desUISchema,
                  nodeKey: `${nodeKey}${targetNode.children.length}`,
                },
              ]
            })
          )
        },
        setCurrentSelectedKey: (key) => {
          return set(() => {
            return {
              currentSelectedKey: key,
            }
          })
        },
        // 根据当前选中的节点key，计算出当前节点的schema
        selectedSchema: () => {
          return findNode(get().currentSelectedKey, get().currentUISchema)
        },
        setConfig: (nodeKey, key, value) => {
          set(
            produce((state: designStoreType) => {
              const targetNode = findNode(nodeKey, state.currentUISchema)
              if (!targetNode) return
              targetNode[key] = value
            })
          )
        },
        changeStyle: (nodeKey, styleKey, newCssStyle) => {
          set(
            produce((state: designStoreType) => {
              const targetNode = findNode(nodeKey, state.currentUISchema)
              if (!targetNode) return
              targetNode.style[styleKey] = newCssStyle
            })
          )
        },
        changeChildWidth: (nodeKey, idx, proportion) => {
          set(
            produce((state: designStoreType) => {
              const targetNode = findNode(nodeKey, state.currentUISchema)
              if (!targetNode || !targetNode.children) return
              targetNode.children[idx].style.width = proportion
            })
          )
        },
      }
    },
    {
      name: 'designStore',
    }
  )
)

export default useDesignStore
