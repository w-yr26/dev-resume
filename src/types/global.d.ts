export type GlobalInitType = {
  keyToPosition: Partial<Record<string, number>>
  setPosition: (key: string, val: number) => void
}
