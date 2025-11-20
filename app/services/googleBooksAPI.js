// Serviço para integração com a API do Google Books
const GOOGLE_BOOKS_API = 'https://www.googleapis.com/books/v1/volumes'

/**
 * Busca livros na API do Google Books
 * @param {string} query - Termo de busca
 * @param {number} maxResults - Número máximo de resultados (padrão: 40)
 * @returns {Promise<Array>} - Array de livros formatados
 */
export async function searchBooks(query = 'literatura', maxResults = 40) {
  try {
    const response = await fetch(
      `${GOOGLE_BOOKS_API}?q=${encodeURIComponent(query)}&maxResults=${maxResults}&langRestrict=pt`
    )
    
    if (!response.ok) {
      throw new Error('Erro ao buscar livros')
    }
    
    const data = await response.json()
    return formatBooks(data.items || [])
  } catch (error) {
    console.error('Erro ao buscar livros:', error)
    throw error
  }
}

/**
 * Busca livros por categoria específica
 * @param {string} category - Categoria dos livros
 * @param {number} maxResults - Número máximo de resultados
 * @returns {Promise<Array>} - Array de livros formatados
 */
export async function searchBooksByCategory(category, maxResults = 40) {
  try {
    const response = await fetch(
      `${GOOGLE_BOOKS_API}?q=subject:${encodeURIComponent(category)}&maxResults=${maxResults}&langRestrict=pt`
    )
    
    if (!response.ok) {
      throw new Error('Erro ao buscar livros por categoria')
    }
    
    const data = await response.json()
    return formatBooks(data.items || [])
  } catch (error) {
    console.error('Erro ao buscar livros por categoria:', error)
    throw error
  }
}

/**
 * Busca livros mais populares (bestsellers)
 * @param {number} maxResults - Número máximo de resultados
 * @returns {Promise<Array>} - Array de livros formatados
 */
export async function getPopularBooks(maxResults = 12) {
  try {
    const queries = [
      'bestseller+fiction',
      'bestseller+literature',
      'popular+books'
    ]
    
    const randomQuery = queries[Math.floor(Math.random() * queries.length)]
    
    const response = await fetch(
      `${GOOGLE_BOOKS_API}?q=${randomQuery}&maxResults=${maxResults}&orderBy=relevance&langRestrict=pt`
    )
    
    if (!response.ok) {
      throw new Error('Erro ao buscar livros populares')
    }
    
    const data = await response.json()
    return formatBooks(data.items || [])
  } catch (error) {
    console.error('Erro ao buscar livros populares:', error)
    throw error
  }
}

/**
 * Busca livros clássicos bem avaliados
 * @param {number} maxResults - Número máximo de resultados
 * @returns {Promise<Array>} - Array de livros formatados
 */
export async function getHighRatedBooks(maxResults = 12) {
  try {
    const response = await fetch(
      `${GOOGLE_BOOKS_API}?q=classics&maxResults=${maxResults}&orderBy=relevance&langRestrict=pt`
    )
    
    if (!response.ok) {
      throw new Error('Erro ao buscar livros bem avaliados')
    }
    
    const data = await response.json()
    return formatBooks(data.items || [])
  } catch (error) {
    console.error('Erro ao buscar livros bem avaliados:', error)
    throw error
  }
}

/**
 * Busca detalhes de um livro específico
 * @param {string} bookId - ID do livro no Google Books
 * @returns {Promise<Object>} - Objeto com detalhes do livro
 */
export async function getBookDetails(bookId) {
  try {
    const response = await fetch(`${GOOGLE_BOOKS_API}/${bookId}`)
    
    if (!response.ok) {
      throw new Error('Erro ao buscar detalhes do livro')
    }
    
    const data = await response.json()
    return formatBook(data)
  } catch (error) {
    console.error('Erro ao buscar detalhes do livro:', error)
    throw error
  }
}

/**
 * Traduz categorias do inglês para português
 */
const translateCategory = (category) => {
  const translations = {
    'Fiction': 'Ficção',
    'Science Fiction': 'Ficção Científica',
    'Fantasy': 'Fantasia',
    'Mystery': 'Mistério',
    'Thriller': 'Suspense',
    'Romance': 'Romance',
    'Historical Fiction': 'Ficção Histórica',
    'Brazilian fiction': 'Ficção Brasileira',
    'Brazilian Fiction': 'Ficção Brasileira',
    'Brazilian literature': 'Literatura Brasileira',
    'Brazilian Literature': 'Literatura Brasileira',
    'Biography': 'Biografia',
    'History': 'História',
    'Science': 'Ciência',
    'Philosophy': 'Filosofia',
    'Psychology': 'Psicologia',
    'Self-Help': 'Autoajuda',
    'Business': 'Negócios',
    'Economics': 'Economia',
    'Politics': 'Política',
    'Religion': 'Religião',
    'Art': 'Arte',
    'Music': 'Música',
    'Poetry': 'Poesia',
    'Drama': 'Drama',
    'Comedy': 'Comédia',
    'Adventure': 'Aventura',
    'Horror': 'Terror',
    'Young Adult': 'Jovem Adulto',
    'Children': 'Infantil',
    'Education': 'Educação',
    'Technology': 'Tecnologia',
    'Cooking': 'Culinária',
    'Travel': 'Viagem',
    'Sports': 'Esportes',
    'Health': 'Saúde',
    'Nature': 'Natureza',
    'Comics': 'Quadrinhos',
    'Manga': 'Mangá',
    'Literary Collections': 'Coletâneas Literárias',
    'Literary Criticism': 'Crítica Literária',
    'Social Science': 'Ciências Sociais',
    'True Crime': 'Crime Real',
    'Humor': 'Humor',
    'Essays': 'Ensaios',
    'Memoir': 'Memórias',
    'Anthology': 'Antologia'
  }
  
  return translations[category] || category
}

/**
 * Trunca descrição longa e remove tags HTML
 */
const cleanDescription = (description) => {
  if (!description) return 'Descrição não disponível'
  
  // Remove tags HTML
  let clean = description.replace(/<[^>]*>/g, '')
  
  // Remove caracteres especiais de HTML
  clean = clean.replace(/&nbsp;/g, ' ')
               .replace(/&quot;/g, '"')
               .replace(/&amp;/g, '&')
               .replace(/&lt;/g, '<')
               .replace(/&gt;/g, '>')
  
  // Trunca se muito longo
  if (clean.length > 500) {
    clean = clean.substring(0, 497) + '...'
  }
  
  return clean
}

/**
 * Formata array de livros da API para o formato usado no app
 * @param {Array} items - Array de livros da API
 * @returns {Array} - Array de livros formatados
 */
function formatBooks(items) {
  return items.map(item => formatBook(item))
}

/**
 * Formata um livro da API para o formato usado no app
 * @param {Object} item - Livro da API
 * @returns {Object} - Livro formatado
 */
function formatBook(item) {
  const volumeInfo = item.volumeInfo || {}
  
  return {
    id: item.id,
    title: volumeInfo.title || 'Título não disponível',
    author: volumeInfo.authors ? volumeInfo.authors.join(', ') : 'Autor desconhecido',
    year: volumeInfo.publishedDate ? volumeInfo.publishedDate.substring(0, 4) : 'N/A',
    category: volumeInfo.categories ? translateCategory(volumeInfo.categories[0]) : 'Sem categoria',
    description: cleanDescription(volumeInfo.description),
    thumbnail: volumeInfo.imageLinks?.thumbnail?.replace('http:', 'https:') || volumeInfo.imageLinks?.smallThumbnail?.replace('http:', 'https:') || null,
    rating: volumeInfo.averageRating || (Math.floor(Math.random() * 15) + 35) / 10, // 3.5-4.9 se não houver rating
    ratingsCount: volumeInfo.ratingsCount || Math.floor(Math.random() * 150) + 10,
    isbn: getISBN(volumeInfo.industryIdentifiers),
    pageCount: volumeInfo.pageCount || 'N/A',
    language: volumeInfo.language || 'pt',
    publisher: volumeInfo.publisher || 'Editora não informada',
    // Status de disponibilidade (simulado aleatoriamente)
    status: Math.random() > 0.3 ? 'available' : 'unavailable',
    previewLink: volumeInfo.previewLink || null,
    infoLink: volumeInfo.infoLink || null
  }
}

/**
 * Extrai o ISBN do livro
 * @param {Array} identifiers - Array de identificadores do livro
 * @returns {string} - ISBN do livro
 */
function getISBN(identifiers) {
  if (!identifiers || identifiers.length === 0) return 'N/A'
  
  const isbn13 = identifiers.find(id => id.type === 'ISBN_13')
  const isbn10 = identifiers.find(id => id.type === 'ISBN_10')
  
  return isbn13?.identifier || isbn10?.identifier || 'N/A'
}

/**
 * Obtém categorias únicas de uma lista de livros
 * @param {Array} books - Array de livros
 * @returns {Array} - Array de categorias únicas
 */
export function getUniqueCategories(books) {
  const categories = books.map(book => book.category)
  return [...new Set(categories)].filter(cat => cat && cat !== 'Sem categoria').sort()
}
