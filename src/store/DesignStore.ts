import { create } from 'zustand'
import { produce } from 'immer'
import { v4 as uuidv4 } from 'uuid'
import type { designStoreType, singleNode } from '@/types/ui'
import { devtools } from 'zustand/middleware'

export const findNode = (
  nodeKey: string,
  originSchema: singleNode
): singleNode | null => {
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
    (set) => {
      return {
        currentUISchema: {
          type: 'root', // 根容器
          isNested: true, // 是否支持嵌套，即children是否有值
          layout: 'vertical',
          style: {}, // 即configStyle
          bind: '',
          tag: '',
          nodeKey: 'root' + '~' + uuidv4(),
          children: [
            {
              type: 'module', // 根容器
              isNested: true, // 是否支持嵌套，即children是否有值
              layout: 'vertical',
              style: {}, // 即configStyle
              bind: '',
              tag: '',
              nodeKey: 'module1' + '~' + uuidv4(),
              children: [],
            }
          ],
        },
        insertNode: (nodeKey, targetKey, desUISchema) => {
          set(
            produce((state: designStoreType) => {
              const targetNode = findNode(targetKey, state.currentUISchema)
              if (!targetNode) return
              // 理论上，能支持拖拽放入的节点都会有children字段，即 nested = true，此处只是做一个兜底
              targetNode.children = targetNode.children || []
              targetNode.children.push({
                ...desUISchema,
                nodeKey: `${nodeKey}${targetNode.children.length}`,
              })
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
