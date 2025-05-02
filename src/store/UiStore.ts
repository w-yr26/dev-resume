import type { nodeType, uiStoreType } from '@/types/ui'
import { create } from 'zustand'

// 递归处理结构共享
const updateNodeById = (
  root: nodeType,
  id: string,
  updater: (node: nodeType) => nodeType
): nodeType => {
  if (root.nodeKey === id) {
    return updater(root)
  }

  if (root.children) {
    const newChildren = root.children.map((child) =>
      updateNodeById(child, id, updater)
    )
    // 只要 children 有变化，就返回新的 root
    if (newChildren.some((c, idx) => c !== root.children![idx])) {
      return { ...root, children: newChildren }
    }
  }

  return root
}

const useUIStore = create<uiStoreType>((set) => {
  return {
    uiSchema: null,
    isHorizontal: false,
    setUiSchema: (newUISchema) =>
      set(() => {
        return {
          uiSchema: newUISchema,
        }
      }),
    setIsHorizontal: (isHorizontal) =>
      set(() => {
        return {
          isHorizontal: isHorizontal,
        }
      }),
    updateUISchema: (node, id, updater) =>
      set(() => {
        return {
          uiSchema: updateNodeById(node, id, updater),
        }
      }),
  }
})

export default useUIStore
