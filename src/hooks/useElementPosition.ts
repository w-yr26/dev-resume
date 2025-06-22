import { useGlobalStore } from '@/store'
import { useEffect } from 'react'

// 设置模块位置
export function useElementPosition(
  ref: React.RefObject<HTMLDivElement | null>,
  key: string // 模块标识
) {
  const setPosition = useGlobalStore((state) => state.setPosition)

  useEffect(() => {
    if (ref.current) {
      const { y } = ref.current.getBoundingClientRect()
      setPosition(key, y)
    }
  }, [ref, key])
}
