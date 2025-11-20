'use client'

import './HeroSection.css'
import { useState } from 'react'
import { useSearch } from '../context/SearchContext'

export default function HeroSection() {
  const { setSearchTerm } = useSearch()
  const [localSearch, setLocalSearch] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setSearchTerm(localSearch)
    // Scroll para a seção do catálogo
    const catalogoSection = document.querySelector('.catalogo')
    if (catalogoSection) {
      catalogoSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="hero-section">
      <article className="hero-content">
        <h1>Descubra o Mundo dos <span>Livros</span> <br /> em Nossa <span>Biblioteca <br /> Comunitária</span></h1>
        <p>Conectando leitores, compartilhando conhecimento e <br /> fortalecendo nossa comunidade através da paixão pela <br /> leitura.</p>
      </article>
      <section className="search-main">
        <form className="search-bar-main" onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Buscar por título, autor, categoria ou ISBN..." 
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
          />
          <button type="submit"><span className="material-symbols-outlined">search</span>Buscar</button>
        </form>
      </section>
      <nav className="container-buttons">
        <a href="#catalogo"><button id="explorar"><span className="material-symbols-outlined">book_ribbon</span>Explorar Catálogo</button></a>
        <a href="#recomendacoes"><button id="btn-recomendacoes"><span className="material-symbols-outlined">favorite</span>Ver Recomendações</button></a>
      </nav>
    </section>
  )
}