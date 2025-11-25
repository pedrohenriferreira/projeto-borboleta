'use client'

import { createContext, useContext, useState } from 'react'

const BookContext = createContext()

export function BookProvider({ children }) {
  const [selectedBookId, setSelectedBookId] = useState(null)

  return (
    <BookContext.Provider value={{
      selectedBookId,
      setSelectedBookId
    }}>
      {children}
    </BookContext.Provider>
  )
}

export function useBook() {
  const context = useContext(BookContext)
  if (!context) {
    throw new Error('useBook must be used within a BookProvider')
  }
  return context
}
