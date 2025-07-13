// types/crypto-js.d.ts
declare module 'crypto-js/sha256' {
  import { WordArray } from 'crypto-js'
  function SHA256(message: string | WordArray, options?: any): WordArray
  export = SHA256
}
