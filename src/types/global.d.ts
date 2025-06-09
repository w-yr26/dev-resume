import { FC } from 'react'
import type { optionalCom } from './dev'

export type GlobalInitType = {
  keyToComponentMap: Partial<Record<optionalCom, FC<any>>>
  keyToPosition: Partial<Record<string, number>>
  setPosition: (key: string, val: number) => void
}
