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
          constraints: {
            ableDel: false,
            ableBind: false,
            isNestedAgain: true,
            allowedParentBind: [],
          },
          type: 'root', // 根容器
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
          nodeKey: uuidv4() + '?root',
          children: [
            {
              constraints: {
                ableDel: true,
                ableBind: true,
                isNestedAgain: true,
                allowedParentBind: ['root'],
              },
              type: 'module', // 根容器
              layout: 'vertical',
              style: {}, // 即configStyle
              bind: 'BASE_INFO',
              tag: '',
              nodeKey: uuidv4() + '?module',
              children: [],
            },
          ],
        },
        currentSelectedKey: '',
        templateName: '',
        setTemplateName: (val) => {
          set(() => {
            return {
              templateName: val,
            }
          })
        },
        setCurUISchema: (val) => {
          set(() => {
            return {
              currentUISchema: val,
            }
          })
        },
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
                  nodeKey,
                },
              ]
            })
          )
        },
        delNode: (prevKey, nodeKey) => {
          set(
            produce((state: designStoreType) => {
              const targetNode = findNode(prevKey, state.currentUISchema)
              if (!targetNode) return
              // 过滤掉待删除的child
              targetNode.children = (targetNode.children || []).filter(
                (child) => child.nodeKey !== nodeKey
              )
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
              // 如果修改的是字段绑定值，记录当前容器所绑定的字段，用于后续的绑定上下文感知
              // if (key === 'bind') {
              //   targetNode.path = targetNode.path
              //     ? value
              //     : targetNode.path + `&${value}`
              // }
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
        setRootStyle: (key, val) => {
          set(
            produce((state: designStoreType) => {
              state.currentUISchema.configStyle[key] = val
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
