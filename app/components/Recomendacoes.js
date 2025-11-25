'use client'

import './Recomendacoes.css'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getPopularBooks, getHighRatedBooks } from '../services/googleBooksAPI'

export default function Recomendacoes() {
  const router = useRouter()
  const [popularBooks, setPopularBooks] = useState([])
  const [favoriteBooks, setFavoriteBooks] = useState([])
  const [highRatedBooks, setHighRatedBooks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true)
        
        // Buscar livros populares
        const popular = await getPopularBooks(3)
        setPopularBooks(popular)
        
        // Buscar favoritos da comunidade (usando busca diferente)
        const favorites = await getPopularBooks(3)
        setFavoriteBooks(favorites)
        
        // Buscar melhores avaliados
        const highRated = await getHighRatedBooks(3)
        setHighRatedBooks(highRated)
        
      } catch (error) {
        console.error('Erro ao carregar recomendações:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRecommendations()
  }, [])

  const handleBookClick = (bookId) => {
    localStorage.setItem('selectedBookId', bookId)
    router.push('/detalhes')
  }

  const renderRecommendationCard = (book, index) => (
    <article 
      className="recommendation-card" 
      key={book.id}
      onClick={() => handleBookClick(book.id)}
      style={{ cursor: 'pointer' }}
    >
      <section className="recommendation-card-content">
        <header className="recommendation-card-header">
          <p className="rec-card-number">{index + 1}</p>
          <p className="rec-card-title">{book.title}</p>
        </header>
        <p className="rec-card-author">{book.author}</p>
      </section>
      <footer className="recommendation-card-footer">
        <p className="rec-card-rating">
          <i className="fa-solid fa-star"></i>{book.rating.toFixed(1)}
        </p>
        <p className="rec-card-reads">{book.ratingsCount} avaliações</p>
      </footer>
    </article>
  )

  if (loading) {
    return (
      <section className="recomendacoes" id="recomendacoes">
        <h1>Recomendações</h1>
        <p>Descubra seus próximos livros favoritos com base nas preferências da nossa <br />comunidade.</p>
        <div style={{ 
          textAlign: 'center', 
          padding: '60px 20px',
          color: '#63442f' 
        }}>
          <span className="material-symbols-outlined" style={{ fontSize: '48px', opacity: 0.5, animation: 'spin 2s linear infinite' }}>
            progress_activity
          </span>
          <p style={{ marginTop: '20px' }}>Carregando recomendações...</p>
        </div>
      </section>
    )
  }

  return (
    <section className="recomendacoes" id="recomendacoes">
      <h1>Recomendações</h1>
      <p>Descubra seus próximos livros favoritos com base nas preferências da nossa <br />comunidade.</p>
      
      <section className="recomendacoes-content">
        <section className="recommendation-group">
          <h2>
            <span className="material-symbols-outlined">trending_up</span>Mais Populares
          </h2>
          {popularBooks.map((book, index) => renderRecommendationCard(book, index))}
        </section>

        <section className="recommendation-group">
          <h2>
            <span className="material-symbols-outlined">favorite</span>Favoritos da Comunidade
          </h2>
          {favoriteBooks.map((book, index) => renderRecommendationCard(book, index))}
        </section>

        <section className="recommendation-group">
          <h2>
            <span className="material-symbols-outlined">workspace_premium</span>Melhores Avaliados
          </h2>
          {highRatedBooks.map((book, index) => renderRecommendationCard(book, index))}
        </section>
      </section>
    </section>
  )
}