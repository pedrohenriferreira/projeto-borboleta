'use client'

import './Header.css'
import Link from 'next/link'
import { useState } from 'react'
import { useSearch } from '../context/SearchContext'
import { useAuth } from '../context/AuthContext'
import AddBookModal from './AddBookModal'

export default function Header() {
  const { setSearchTerm } = useSearch()
  const { user, logout, getInitials } = useAuth()
  const [localSearch, setLocalSearch] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSearchTerm(localSearch)
    // Scroll para a seção do catálogo
    const catalogoSection = document.querySelector('.catalogo')
    if (catalogoSection) {
      catalogoSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToSection = (sectionId) => {
    console.log('Tentando rolar para:', sectionId)
    const section = document.getElementById(sectionId)
    console.log('Elemento encontrado:', section)
    if (section) {
      const elementPosition = section.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - 100
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    } else {
      console.log('Elemento não encontrado!')
    }
  }

  return (
    <header>
      <div className="titulo">
        <span className="material-symbols-outlined">book_ribbon</span>
        <h1>Biblioteca Comunitária</h1>
      </div>
      <nav className="link-content">
        <p><a href="#catalogo" onClick={(e) => { e.preventDefault(); scrollToSection('catalogo'); }}>Catálogo</a></p>
        <p><a href="#recomendacoes" onClick={(e) => { e.preventDefault(); scrollToSection('recomendacoes'); }}>Recomendações</a></p>
      </nav>
      <section className="search">
        <form className="search-bar" onSubmit={handleSubmit}>
          <button type="submit"><span className="material-symbols-outlined">search</span></button>
          <input 
            id="buscar" 
            type="text" 
            placeholder="Buscar por título, autor ou categoria..." 
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
          />
        </form>
      </section>
      <div className="botoes">
        {user ? (
          <div className="user-avatar-container">
            <div 
              className="user-avatar" 
              onClick={() => setShowUserMenu(!showUserMenu)}
              title={user.email}
            >
              {getInitials(user.email)}
            </div>
            {showUserMenu && (
              <div className="user-menu">
                <div className="user-menu-email">{user.email}</div>
                <button onClick={logout} className="user-menu-logout">
                  <span className="material-symbols-outlined">logout</span>
                  Sair
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link href="/login">
            <button id="login">
              <span className="material-symbols-outlined">person</span>Entrar
            </button>
          </Link>
        )}
        <button id="add-livro" onClick={() => setIsModalOpen(true)}>
          <span className="material-symbols-outlined">add</span>Adicionar um livro
        </button>
      </div>

      <AddBookModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </header>
  )
}