'use client'

import './BookDetailsModal.css'

export default function BookDetailsModal({ isOpen, onClose, book }) {
  if (!isOpen || !book) return null

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

  return (
    <div className="book-details-overlay" onClick={onClose}>
      <div className="book-details-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          <span className="material-symbols-outlined">close</span>
        </button>

        <div className="book-details-header">
          <div className="book-cover">
            {book.thumbnail ? (
              <img src={book.thumbnail} alt={book.titulo} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
            ) : (
              <span className="material-symbols-outlined">book</span>
            )}
          </div>
          <div className="book-header-info">
            <h2>{book.titulo}</h2>
            <p className="book-author">{book.autor}</p>
            <div className="book-rating">
              <div className="stars">{renderStars(book.rating)}</div>
              <span className="rating-number">{book.rating.toFixed(1)}</span>
              {book.ratingsCount && (
                <span className="rating-count">({book.ratingsCount} avaliações)</span>
              )}
            </div>
          </div>
        </div>

        <div className="book-details-body">
          <div className="detail-section">
            <h3><span className="material-symbols-outlined">category</span>Informações</h3>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Categoria:</span>
                <span className="info-value">{book.categoria}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Ano:</span>
                <span className="info-value">{book.ano || 'N/A'}</span>
              </div>
              <div className="info-item">
                <span className="info-label">ISBN:</span>
                <span className="info-value">{book.isbn || 'N/A'}</span>
              </div>
              {book.paginas && book.paginas !== 'N/A' && (
                <div className="info-item">
                  <span className="info-label">Páginas:</span>
                  <span className="info-value">{book.paginas}</span>
                </div>
              )}
              {book.editora && (
                <div className="info-item">
                  <span className="info-label">Editora:</span>
                  <span className="info-value">{book.editora}</span>
                </div>
              )}
              <div className="info-item">
                <span className="info-label">Status:</span>
                <span className={`status-badge ${book.disponivel ? 'disponivel' : 'indisponivel'}`}>
                  {book.disponivel ? 'Disponível' : 'Emprestado'}
                </span>
              </div>
            </div>
          </div>

          <div className="detail-section">
            <h3><span className="material-symbols-outlined">description</span>Sinopse</h3>
            <div className="book-description-box">
              <p className="book-description">
                {book.descricao || 'Descrição não disponível para este livro.'}
              </p>
            </div>
          </div>

          <div className="detail-section">
            <h3><span className="material-symbols-outlined">reviews</span>Avaliações da Comunidade</h3>
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
            <h3><span className="material-symbols-outlined">trending_up</span>Estatísticas</h3>
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
        </div>

        <div className="book-details-footer">
          <button className="btn-favorite">
            <span className="material-symbols-outlined">favorite</span>
            Adicionar aos Favoritos
          </button>
          <div className="footer-actions">
            <button className="btn-secondary" onClick={onClose}>
              Fechar
            </button>
            <button className="btn-primary" disabled={!book.disponivel}>
              <span className="material-symbols-outlined">
                {book.disponivel ? 'book' : 'schedule'}
              </span>
              {book.disponivel ? 'Emprestar Livro' : 'Indisponível'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
