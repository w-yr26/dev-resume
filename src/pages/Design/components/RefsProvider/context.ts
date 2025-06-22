import { createContext } from 'react'

export const RefsContext = createContext<{
  ref1: React.RefObject<HTMLElement | null>
  ref2: React.RefObject<HTMLElement | null>
  ref3: React.RefObject<HTMLElement | null>
  ref4: React.RefObject<HTMLElement | null>
  ref5: React.RefObject<HTMLElement | null>
} | null>(null)
