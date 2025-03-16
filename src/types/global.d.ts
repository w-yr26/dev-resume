import { FC } from 'react'
import type { optionalCom } from './dev'

export type GlobalInitType = {
  keyToComponentMap: Partial<Record<optionalCom, FC<any>>>
}
