import type { layoutItem, nodeType, uiStoreType } from '@/types/ui'
import { create } from 'zustand'
import { defaultInfoMap } from './DevStore'

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
    layoutMap: new Map<string, Record<'main' | 'side', layoutItem[]>>([
      [
        '0',
        {
          main: Array.from(Object.keys(defaultInfoMap)).map((i) => ({
            key: i,
            label: defaultInfoMap[i].label,
          })),
          side: [],
        },
      ],
    ]),
    setUiSchema: (newUISchema) =>
      set(() => {
        return {
          uiSchema: newUISchema,
        }
      }),
    // updateSchema: (moduleOrderArr) =>
    //   set((state) => {
    //     const newChildren: (nodeType | null)[] = []
    //     moduleOrderArr.forEach((module, index) => {
    //       newChildren[index] =
    //         state.uiSchema?.children?.find((i) => i.bind === module) || null
    //     })
    //     console.log('newChildren', newChildren.filter(Boolean))

    //     const orderSchema = {
    //       ...state.uiSchema,
    //       children: newChildren.filter(Boolean),
    //     } as nodeType

    //     return {
    //       uiSchema: orderSchema,
    //     }
    //   }),
    updateLayoutMap: (val) => {
      return set(() => {
        return {
          layoutMap: val,
        }
      })
    },
    addPage: () => {
      return set((state) => {
        const newLayoutMap = new Map(state.layoutMap) // 创建新 Map
        newLayoutMap.set(String([...state.layoutMap.keys()].length), {
          main: [],
          side: [],
        })
        return { layoutMap: newLayoutMap }
      })
    },
    delPage: (key) => {
      return set((state) => {
        const newLayoutMap = new Map(state.layoutMap) // 创建新 Map
        newLayoutMap.delete(key)
        return { layoutMap: newLayoutMap }
      })
    },
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
