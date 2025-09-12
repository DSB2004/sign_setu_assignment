import React, { ReactNode } from 'react'
import { BlockProvider } from '@/store/block.store'
export default function BlockLayout({children}:{children:ReactNode}) {
  return (
      <BlockProvider>
          {children}
    </BlockProvider>
  )
}
