'use client'

import { useState } from 'react'
import './AddBookModal.css'

export default function AddBookModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    titulo: '',
    autor: '',
    categoria: '',
    ano: '',
    isbn: '',
    descricao: ''
  })

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Livro adicionado:', formData)
    // Aqui você pode adicionar a lógica para salvar o livro
    alert('Livro adicionado com sucesso!')
    setFormData({
      titulo: '',
      autor: '',
      categoria: '',
      ano: '',
      isbn: '',
      descricao: ''
    })
    onClose()
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2><span className="material-symbols-outlined">add</span>Adicionar Novo Livro</h2>
          <button className="close-button" onClick={onClose}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="add-book-form">
          <div className="form-group">
            <label htmlFor="titulo">Título *</label>
            <input
              type="text"
              id="titulo"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              required
              placeholder="Digite o título do livro"
            />
          </div>

          <div className="form-group">
            <label htmlFor="autor">Autor *</label>
            <input
              type="text"
              id="autor"
              name="autor"
              value={formData.autor}
              onChange={handleChange}
              required
              placeholder="Digite o nome do autor"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="categoria">Categoria *</label>
              <select
                id="categoria"
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
                required
              >
                <option value="">Selecione uma categoria</option>
                <option value="Romance">Romance</option>
                <option value="Ficção Científica">Ficção Científica</option>
                <option value="Literatura Brasileira">Literatura Brasileira</option>
                <option value="Fantasia">Fantasia</option>
                <option value="História">História</option>
                <option value="Autoajuda">Autoajuda</option>
                <option value="Biografia">Biografia</option>
                <option value="Poesia">Poesia</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="ano">Ano de Publicação</label>
              <input
                type="number"
                id="ano"
                name="ano"
                value={formData.ano}
                onChange={handleChange}
                placeholder="2024"
                min="1000"
                max="2024"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="isbn">ISBN</label>
            <input
              type="text"
              id="isbn"
              name="isbn"
              value={formData.isbn}
              onChange={handleChange}
              placeholder="Digite o ISBN do livro"
            />
          </div>

          <div className="form-group">
            <label htmlFor="descricao">Descrição</label>
            <textarea
              id="descricao"
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              placeholder="Escreva uma breve descrição sobre o livro"
              rows="4"
            />
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="submit-button">
              <span className="material-symbols-outlined">add</span>
              Adicionar Livro
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
