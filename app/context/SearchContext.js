'use client'

import { createContext, useContext, useState } from 'react'

const SearchContext = createContext()

export function SearchProvider({ children }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [sortBy, setSortBy] = useState('titulo')

  return (
    <SearchContext.Provider value={{
      searchTerm,
      setSearchTerm,
      selectedCategory,
      setSelectedCategory,
      sortBy,
      setSortBy
    }}>
      {children}
    </SearchContext.Provider>
  )
}

export function useSearch() {
  const context = useContext(SearchContext)
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider')
  }
  return context
}
