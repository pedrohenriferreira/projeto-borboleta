'use client'

import './Catalogo.css'
import { useState, useEffect } from 'react'
import { useSearch } from '../context/SearchContext'
import BookDetailsModal from './BookDetailsModal'
import { searchBooks, getUniqueCategories } from '../services/googleBooksAPI'

export default function Catalogo() {
  const { searchTerm, selectedCategory, setSelectedCategory, sortBy, setSortBy } = useSearch()
  const [allBooks, setAllBooks] = useState([])
  const [filteredBooks, setFilteredBooks] = useState([])
  const [selectedBook, setSelectedBook] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [categories, setCategories] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const booksPerPage = 8

  // Carregar livros da API do Google Books
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true)
        setError(null)
        const books = await searchBooks('literatura brasileira ficção', 40)
        setAllBooks(books)
        const uniqueCategories = getUniqueCategories(books)
        setCategories(uniqueCategories)
      } catch (err) {
        setError('Não foi possível carregar os livros. Tente novamente mais tarde.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchBooks()
  }, [])

  const openBookDetails = (book) => {
    setSelectedBook({
      titulo: book.title,
      autor: book.author,
      categoria: book.category,
      ano: book.year,
      isbn: book.isbn,
      rating: book.rating,
      disponivel: book.status === 'available',
      descricao: book.description,
      thumbnail: book.thumbnail,
      paginas: book.pageCount,
      editora: book.publisher,
      ratingsCount: book.ratingsCount
    })
    setIsModalOpen(true)
  }

  // Filtrar e ordenar livros
  useEffect(() => {
    let result = [...allBooks]

    // Filtrar por termo de pesquisa
    if (searchTerm) {
      result = result.filter(book => 
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filtrar por categoria
    if (selectedCategory) {
      result = result.filter(book => book.category === selectedCategory)
    }

    // Ordenar
    if (sortBy === 'titulo') {
      result.sort((a, b) => a.title.localeCompare(b.title))
    } else if (sortBy === 'avaliacao') {
      result.sort((a, b) => b.rating - a.rating)
    }

    setFilteredBooks(result)
    setCurrentPage(1) // Resetar para primeira página quando filtros mudarem
  }, [searchTerm, selectedCategory, sortBy, allBooks])

  // Calcular livros da página atual
  const indexOfLastBook = currentPage * booksPerPage
  const indexOfFirstBook = indexOfLastBook - booksPerPage
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook)
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage)

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
      // Scroll suave para o topo do catálogo
      document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
      // Scroll suave para o topo do catálogo
      document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const renderStars = (rating) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<i key={i} className="fa-solid fa-star"></i>)
      } else {
        stars.push(<i key={i} className="fa-regular fa-star"></i>)
      }
    }
    return stars
  }

  return (
    <section className="catalogo" id="catalogo">
      <h1>Nosso Catálogo</h1>
      <p>Explore nossa coleção diversificada de livros, desde clássicos da literatura até <br />as mais recentes obras de ficção e não ficção.</p>
      
      {searchTerm && !loading && (
        <p style={{ marginTop: '15px', color: '#63442f', fontWeight: 500 }}>
          Resultados da pesquisa por: "<strong>{searchTerm}</strong>" - {filteredBooks.length} livro(s) encontrado(s)
        </p>
      )}

      <aside className="filtro">
        <form className="filtro-livro">
          <label htmlFor="categoria-filtro">
            <span className="material-symbols-outlined">filter_alt</span>Filtros:
          </label>
          <select 
            id="categoria-filtro" 
            name="categoria"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            disabled={loading}
          >
            <option value="">Todas as categorias</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <select 
            id="ordenar-por" 
            name="ordenar"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            disabled={loading}
          >
            <option value="titulo">Título (A–Z)</option>
            <option value="avaliacao">Maior avaliação</option>
          </select>
        </form>
      </aside>

      <section className="book-container">
        {loading ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '40px', 
            width: '100%',
            color: '#63442f' 
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: '64px', opacity: 0.5, animation: 'spin 2s linear infinite' }}>
              progress_activity
            </span>
            <h3>Carregando livros...</h3>
            <p>Aguarde enquanto buscamos os melhores títulos para você</p>
          </div>
        ) : error ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '40px', 
            width: '100%',
            color: '#63442f' 
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: '64px', opacity: 0.5 }}>
              error
            </span>
            <h3>Erro ao carregar livros</h3>
            <p>{error}</p>
          </div>
        ) : currentBooks.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '40px', 
            width: '100%',
            color: '#63442f' 
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: '64px', opacity: 0.5 }}>
              search_off
            </span>
            <h3>Nenhum livro encontrado</h3>
            <p>Tente ajustar os filtros ou termos de pesquisa</p>
          </div>
        ) : (
          currentBooks.map(book => (
            <article 
              className="book-card" 
              key={book.id}
              onClick={() => openBookDetails(book)}
              style={{ cursor: 'pointer' }}
            >
              <header className="book-card-top">
                <p className="book-category">
                  <span className="material-symbols-outlined">sell</span>{book.category}
                </p>
                <p className={`book-status ${book.status}`}>
                  {book.status === 'available' ? 'Disponível' : 'Emprestado'}
                </p>
              </header>
              <figure className="book-card-image">
                {book.thumbnail ? (
                  <img src={book.thumbnail} alt={book.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <span className="material-symbols-outlined">book</span>
                )}
              </figure>
              <footer className="book-card-down">
                <section className="book-card-text">
                  <p className="book-title">{book.title}</p>
                  <p className="book-author">
                    <span className="material-symbols-outlined">person</span>{book.author}
                  </p>
                  <p className="book-date">
                    <span className="material-symbols-outlined">calendar_today</span>{book.year}
                  </p>
                  <p className="book-description">{book.description}</p>
                </section>
                <p className="book-rating">
                  {renderStars(Math.round(book.rating))}
                  ({book.rating.toFixed(1)}/5)
                </p>
              </footer>
            </article>
          ))
        )}
      </section>

      {/* Paginação */}
      {!loading && !error && filteredBooks.length > 0 && (
        <div className="pagination">
          <div className="pagination-buttons">
            <button 
              className="pagination-btn" 
              onClick={prevPage} 
              disabled={currentPage === 1}
            >
              <span className="material-symbols-outlined">chevron_left</span>
              Anterior
            </button>
            <div className="page-number active">
              Página {currentPage} de {totalPages}
            </div>
            <button 
              className="pagination-btn" 
              onClick={nextPage} 
              disabled={currentPage === totalPages}
            >
              Próxima
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
          <div className="pagination-info">
            Mostrando {indexOfFirstBook + 1} - {Math.min(indexOfLastBook, filteredBooks.length)} de {filteredBooks.length} livros
          </div>
        </div>
      )}

      <BookDetailsModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        book={selectedBook}
      />
    </section>
  )
}