'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getBookDetails } from '../services/googleBooksAPI'
import './page.css'

export default function BookDetailsPage() {
  const router = useRouter()
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const bookId = localStorage.getItem('selectedBookId')
    
    if (!bookId) {
      router.push('/')
      return
    }

    const fetchBookDetails = async () => {
      try {
        setLoading(true)
        setError(null)
        const bookData = await getBookDetails(bookId)
        setBook(bookData)
      } catch (err) {
        setError('Não foi possível carregar os detalhes do livro.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchBookDetails()
  }, [router])

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`full-${i}`} className="fa-solid fa-star"></i>)
    }
    if (hasHalfStar) {
      stars.push(<i key="half" className="fa-solid fa-star-half-stroke"></i>)
    }
    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="fa-regular fa-star"></i>)
    }
    return stars
  }

  if (loading) {
    return (
      <div className="book-details-page loading">
        <div className="loading-container">
          <span className="material-symbols-outlined rotating">progress_activity</span>
          <h2>Carregando detalhes do livro...</h2>
          <p>Aguarde um momento</p>
        </div>
      </div>
    )
  }

  if (error || !book) {
    return (
      <div className="book-details-page error">
        <div className="error-container">
          <span className="material-symbols-outlined">error</span>
          <h2>Erro ao carregar livro</h2>
          <p>{error || 'Livro não encontrado'}</p>
          <button className="btn-back" onClick={() => router.push('/')}>
            <span className="material-symbols-outlined">arrow_back</span>
            Voltar ao Catálogo
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="book-details-page">
      <button className="btn-back-top" onClick={() => router.back()}>
        <span className="material-symbols-outlined">arrow_back</span>
        Voltar
      </button>

      <div className="book-details-container">
        <div className="book-details-header">
          <div className="book-cover">
            {book.thumbnail ? (
              <img src={book.thumbnail} alt={book.title} />
            ) : (
              <div className="no-cover">
                <span className="material-symbols-outlined">book</span>
              </div>
            )}
          </div>
          
          <div className="book-header-info">
            <h1>{book.title}</h1>
            <p className="book-author">
              <span className="material-symbols-outlined">person</span>
              {book.author}
            </p>
            
            <div className="book-rating">
              <div className="stars">{renderStars(book.rating)}</div>
              <span className="rating-number">{book.rating.toFixed(1)}</span>
              {book.ratingsCount && (
                <span className="rating-count">({book.ratingsCount} avaliações)</span>
              )}
            </div>

            <div className="book-meta">
              <span className={`status-badge ${book.status === 'available' ? 'disponivel' : 'indisponivel'}`}>
                <span className="material-symbols-outlined">
                  {book.status === 'available' ? 'check_circle' : 'cancel'}
                </span>
                {book.status === 'available' ? 'Disponível' : 'Emprestado'}
              </span>
              <span className="category-badge">
                <span className="material-symbols-outlined">sell</span>
                {book.category}
              </span>
            </div>

            <div className="action-buttons">
              <button className="btn-favorite">
                <span className="material-symbols-outlined">favorite_border</span>
                Adicionar aos Favoritos
              </button>
              <button 
                className="btn-primary" 
                disabled={book.status !== 'available'}
              >
                <span className="material-symbols-outlined">
                  {book.status === 'available' ? 'book' : 'schedule'}
                </span>
                {book.status === 'available' ? 'Emprestar Livro' : 'Indisponível'}
              </button>
            </div>
          </div>
        </div>

        <div className="book-details-body">
          <div className="detail-section">
            <h3>
              <span className="material-symbols-outlined">info</span>
              Informações do Livro
            </h3>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Categoria:</span>
                <span className="info-value">{book.category}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Ano de Publicação:</span>
                <span className="info-value">{book.year || 'N/A'}</span>
              </div>
              <div className="info-item">
                <span className="info-label">ISBN:</span>
                <span className="info-value">{book.isbn || 'N/A'}</span>
              </div>
              {book.pageCount && book.pageCount !== 'N/A' && (
                <div className="info-item">
                  <span className="info-label">Número de Páginas:</span>
                  <span className="info-value">{book.pageCount}</span>
                </div>
              )}
              {book.publisher && (
                <div className="info-item">
                  <span className="info-label">Editora:</span>
                  <span className="info-value">{book.publisher}</span>
                </div>
              )}
              <div className="info-item">
                <span className="info-label">Idioma:</span>
                <span className="info-value">{book.language === 'pt' ? 'Português' : book.language}</span>
              </div>
            </div>
          </div>

          <div className="detail-section">
            <h3>
              <span className="material-symbols-outlined">description</span>
              Sinopse
            </h3>
            <div className="book-description-box">
              <p className="book-description">
                {book.description || 'Descrição não disponível para este livro.'}
              </p>
            </div>
          </div>

          <div className="detail-section">
            <h3>
              <span className="material-symbols-outlined">reviews</span>
              Avaliações da Comunidade
            </h3>
            <div className="reviews-container">
              <div className="review-card">
                <div className="review-header">
                  <div className="reviewer-info">
                    <span className="material-symbols-outlined reviewer-icon">account_circle</span>
                    <div>
                      <p className="reviewer-name">Maria Silva</p>
                      <div className="review-stars">
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                      </div>
                    </div>
                  </div>
                  <span className="review-date">Há 2 dias</span>
                </div>
                <p className="review-text">"Leitura incrível! Recomendo muito para quem gosta de histórias envolventes."</p>
              </div>
              <div className="review-card">
                <div className="review-header">
                  <div className="reviewer-info">
                    <span className="material-symbols-outlined reviewer-icon">account_circle</span>
                    <div>
                      <p className="reviewer-name">João Santos</p>
                      <div className="review-stars">
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-regular fa-star"></i>
                      </div>
                    </div>
                  </div>
                  <span className="review-date">Há 1 semana</span>
                </div>
                <p className="review-text">"Muito bom! A narrativa prende do início ao fim."</p>
              </div>
            </div>
          </div>

          <div className="detail-section">
            <h3>
              <span className="material-symbols-outlined">trending_up</span>
              Estatísticas
            </h3>
            <div className="stats-grid">
              <div className="stat-card">
                <span className="material-symbols-outlined">visibility</span>
                <div className="stat-info">
                  <p className="stat-value">{Math.floor(Math.random() * 200) + 50}</p>
                  <p className="stat-label">Visualizações</p>
                </div>
              </div>
              <div className="stat-card">
                <span className="material-symbols-outlined">bookmark</span>
                <div className="stat-info">
                  <p className="stat-value">{Math.floor(Math.random() * 80) + 20}</p>
                  <p className="stat-label">Favoritos</p>
                </div>
              </div>
              <div className="stat-card">
                <span className="material-symbols-outlined">swap_horiz</span>
                <div className="stat-info">
                  <p className="stat-value">{Math.floor(Math.random() * 50) + 10}</p>
                  <p className="stat-label">Empréstimos</p>
                </div>
              </div>
            </div>
          </div>

          {book.previewLink && (
            <div className="detail-section">
              <h3>
                <span className="material-symbols-outlined">preview</span>
                Prévia do Livro
              </h3>
              <a 
                href={book.previewLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-preview"
              >
                <span className="material-symbols-outlined">open_in_new</span>
                Visualizar Prévia no Google Books
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
