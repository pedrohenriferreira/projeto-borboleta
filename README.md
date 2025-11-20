# 📚 Projeto Borboleta - Biblioteca Comunitária

<div align="center">
  <p>Uma aplicação web moderna e intuitiva para gerenciamento de biblioteca comunitária, desenvolvida com Next.js e React.</p>
  <p>Explore, descubra e gerencie uma vasta coleção de livros com integração à API do Google Books.</p>
</div>

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias Utilizadas](#️-tecnologias-utilizadas)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Uso](#-uso)
- [Estrutura do Projeto](#️-estrutura-do-projeto)
- [Componentes Principais](#-componentes-principais)
- [API e Serviços](#-api-e-serviços)
- [Design e Estilização](#-design-e-estilização)
- [Scripts Disponíveis](#-scripts-disponíveis)
- [Funcionalidades Futuras](#-funcionalidades-futuras)
- [Contribuição](#-contribuição)
- [Licença](#-licença)

---

## 🎯 Sobre o Projeto

O **Projeto Borboleta** é uma plataforma web desenvolvida para facilitar o acesso e gerenciamento de bibliotecas comunitárias. Com uma interface moderna e responsiva, o projeto oferece uma experiência completa de navegação por catálogos de livros, busca avançada, recomendações personalizadas e sistema de autenticação.

### Destaques

- ✨ Interface limpa e moderna
- 🔍 Busca inteligente integrada com Google Books API
- 📖 Catálogo dinâmico com filtros por categoria
- 🎨 Design responsivo para todos os dispositivos
- 🔐 Sistema de autenticação com login
- 📊 Recomendações de livros populares e bem avaliados
- 🌐 Suporte para livros em português

---

## 🚀 Funcionalidades

### Catálogo de Livros
- Visualização de livros em cards informativos
- Filtro por categoria em tempo real
- Indicador de disponibilidade (disponível/indisponível)
- Avaliações e número de leitores
- Visualização de detalhes completos do livro

### Sistema de Busca
- Busca por título, autor ou categoria
- Integração com Google Books API
- Resultados filtrados para conteúdo em português
- Busca responsiva no cabeçalho

### Recomendações Inteligentes
- Seção de livros populares (bestsellers)
- Livros clássicos bem avaliados
- Atualização dinâmica de recomendações

### Autenticação
- Sistema de login com validação de email
- Gerenciamento de sessão com Context API
- Persistência de login com localStorage
- Avatar personalizado com iniciais do usuário

### Modais Interativos
- Modal de detalhes do livro com informações completas
- Modal para adicionar novos livros ao catálogo
- Interface intuitiva e acessível

### Design Responsivo
- Layout adaptável para desktop, tablet e mobile
- Menu mobile otimizado
- Cards responsivos com grid dinâmico

---

## 🛠️ Tecnologias Utilizadas

### Core
- **[Next.js 14](https://nextjs.org/)** - Framework React com renderização híbrida e otimizações automáticas
- **[React 18](https://react.dev/)** - Biblioteca JavaScript para construção de interfaces
- **JavaScript (ES6+)** - Linguagem de programação principal

### Estilização
- **CSS3** - Estilização customizada com variáveis CSS
- **CSS Modules** - Escopo local de estilos para componentes
- **Flexbox & Grid** - Layouts responsivos e modernos
- **Media Queries** - Responsividade para diferentes dispositivos

### APIs e Integrações
- **[Google Books API](https://developers.google.com/books)** - Integração para catálogo de livros
- **Context API** - Gerenciamento de estado global (autenticação e busca)

### Ferramentas de Desenvolvimento
- **ESLint** - Linting e padronização de código
- **Git** - Controle de versão

### Ícones e Fontes
- **[Material Symbols](https://fonts.google.com/icons)** - Ícones do Google
- **[Font Awesome](https://fontawesome.com/)** - Biblioteca de ícones adicional
- **Google Fonts** - Tipografia (Roboto, Epunda Slab)

---

## ✅ Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas:

- **Node.js** (versão 16.x ou superior)
- **npm** (versão 7.x ou superior) ou **yarn**
- **Git** (para clonar o repositório)

---

## 📦 Instalação

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd Projeto-Borboleta-main
```

### 2. Instale as dependências

Usando npm:
```bash
npm install
```

Ou usando yarn:
```bash
yarn install
```

### 3. Execute o projeto

Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

O aplicativo estará disponível em [http://localhost:3000](http://localhost:3000)

### 4. Build para produção (opcional)

Para criar uma versão otimizada para produção:
```bash
npm run build
npm run start
```

---

## 💻 Uso

### Navegação Básica

1. **Página Inicial**: Acesse a home com hero section, catálogo e recomendações
2. **Buscar Livros**: Use a barra de busca no cabeçalho para encontrar livros específicos
3. **Filtrar Catálogo**: Selecione categorias no menu dropdown do catálogo
4. **Ver Detalhes**: Clique em um livro para visualizar informações completas
5. **Fazer Login**: Acesse a página de login para autenticar-se no sistema
6. **Adicionar Livro**: Use o botão "+" no cabeçalho (quando logado) para adicionar novos livros

### Sistema de Autenticação

Para fazer login:
1. Clique em "Entrar" no cabeçalho
2. Digite um email válido
3. A sessão será mantida mesmo após fechar o navegador
4. Use o avatar no canto superior direito para fazer logout

---

## 🏗️ Estrutura do Projeto

```
Projeto-Borboleta-main/
│
├── app/
│   ├── components/              # Componentes React reutilizáveis
│   │   ├── AddBookModal.js     # Modal para adicionar livros
│   │   ├── AddBookModal.css    # Estilos do modal de adicionar
│   │   ├── BookDetailsModal.js # Modal com detalhes do livro
│   │   ├── BookDetailsModal.css# Estilos do modal de detalhes
│   │   ├── Catalogo.js         # Componente do catálogo de livros
│   │   ├── Catalogo.css        # Estilos do catálogo
│   │   ├── Header.js           # Cabeçalho com navegação e busca
│   │   ├── Header.css          # Estilos do cabeçalho
│   │   ├── HeroSection.js      # Seção hero da página inicial
│   │   ├── HeroSection.css     # Estilos da hero section
│   │   ├── LoginForm.js        # Formulário de login
│   │   ├── LoginForm.css       # Estilos do formulário
│   │   ├── Recomendacoes.js    # Seção de recomendações
│   │   └── Recomendacoes.css   # Estilos das recomendações
│   │
│   ├── context/                 # Context API para estado global
│   │   ├── AuthContext.js      # Contexto de autenticação
│   │   └── SearchContext.js    # Contexto de busca
│   │
│   ├── services/                # Serviços e integrações externas
│   │   └── googleBooksAPI.js   # Integração com Google Books API
│   │
│   ├── login/                   # Página de login
│   │   └── page.js             # Rota /login
│   │
│   ├── layout.js               # Layout principal (root layout)
│   ├── page.js                 # Página inicial (home)
│   └── globals.css             # Estilos globais da aplicação
│
├── public/                      # Arquivos estáticos
│
├── next.config.js              # Configuração do Next.js
├── package.json                # Dependências e scripts
├── .eslintrc.json              # Configuração do ESLint
└── README.md                   # Este arquivo
```

---

## 🧩 Componentes Principais

### Header
- Navegação principal
- Logo e links de navegação
- Barra de busca integrada
- Sistema de autenticação (avatar/login)
- Botão para adicionar livros
- Menu mobile responsivo

### HeroSection
- Seção de destaque da página inicial
- Call-to-action principal
- Design visualmente atraente
- Mensagem de boas-vindas

### Catalogo
- Exibição de livros em grid responsivo
- Filtro por categoria (dropdown)
- Cards de livros com informações essenciais
- Indicador de disponibilidade
- Avaliações e rating visual
- Click para detalhes completos

### Recomendacoes
- Duas seções: Populares e Bem Avaliados
- Carrossel horizontal de livros
- Atualização dinâmica via API
- Cards compactos e informativos

### BookDetailsModal
- Modal com informações completas do livro
- Título, autor, editora, ano
- Descrição detalhada
- ISBN, páginas, idioma
- Rating e avaliações
- Link para preview (quando disponível)

### AddBookModal
- Formulário para adicionar livros
- Campos: título, autor, ano, categoria, descrição
- Validação de dados
- Integração com estado da aplicação

### LoginForm
- Formulário de autenticação
- Validação de email
- Feedback visual de erros
- Redirecionamento após login

---

## 🔌 API e Serviços

### Google Books API

O projeto utiliza a Google Books API para obter informações sobre livros. As principais funções incluem:

#### `searchBooks(query, maxResults)`
Busca livros por termo de pesquisa
- **Parâmetros**: query (string), maxResults (number)
- **Retorna**: Array de livros formatados
- **Filtro**: Resultados em português

#### `searchBooksByCategory(category, maxResults)`
Busca livros por categoria específica
- **Parâmetros**: category (string), maxResults (number)
- **Retorna**: Array de livros da categoria

#### `getPopularBooks(maxResults)`
Retorna livros populares e bestsellers
- **Parâmetros**: maxResults (number, padrão: 12)
- **Retorna**: Array de livros populares

#### `getHighRatedBooks(maxResults)`
Retorna livros clássicos bem avaliados
- **Parâmetros**: maxResults (number, padrão: 12)
- **Retorna**: Array de livros bem avaliados

#### `getBookDetails(bookId)`
Busca detalhes completos de um livro específico
- **Parâmetros**: bookId (string)
- **Retorna**: Objeto com detalhes do livro

#### `getUniqueCategories(books)`
Extrai categorias únicas de uma lista de livros
- **Parâmetros**: books (array)
- **Retorna**: Array de categorias únicas ordenadas

### Formatação de Dados

- **Tradução automática**: Categorias traduzidas de inglês para português
- **Limpeza de descrições**: Remoção de tags HTML e truncamento
- **Imagens otimizadas**: URLs atualizadas para HTTPS
- **Ratings simulados**: Geração de ratings quando não disponíveis
- **Status de disponibilidade**: Simulação aleatória (disponível/indisponível)

---

## 🎨 Design e Estilização

### Paleta de Cores

```css
--primary-brown: #8B4513;      /* Marrom principal */
--secondary-brown: #A0522D;    /* Marrom secundário */
--light-beige: #F5E6D3;        /* Bege claro */
--dark-brown: #5C3317;         /* Marrom escuro */
--sage-green: #87916D;         /* Verde sábio */
--golden: #D4AF37;             /* Dourado */
--cream: #FFF8DC;              /* Creme */
```

### Tipografia

- **Títulos**: Epunda Slab (serif, elegante)
- **Corpo**: Roboto (sans-serif, legível)
- **Pesos**: 300, 400, 500, 700

### Breakpoints Responsivos

```css
/* Mobile */
@media (max-width: 768px)

/* Tablet */
@media (min-width: 769px) and (max-width: 1024px)

/* Desktop */
@media (min-width: 1025px)
```

### Efeitos Visuais

- Transições suaves (0.3s ease)
- Hover states em botões e cards
- Box shadows para profundidade
- Border radius para suavidade
- Gradientes sutis

### Layout e Grid

- **CSS Grid**: Catálogo de livros responsivo (auto-fit, minmax)
- **Flexbox**: Navegação, cards e alinhamentos
- **Container**: Max-width de 1200px para conteúdo principal

---

## 📱 Responsividade

A aplicação é totalmente responsiva e otimizada para:

### 💻 Desktop (> 1024px)
- Layout em múltiplas colunas
- Grid de livros com 4 colunas
- Menu de navegação completo
- Barra de busca sempre visível
- Hover effects em cards

### 📱 Tablet (769px - 1024px)
- Grid de livros com 2-3 colunas
- Menu adaptado
- Espaçamentos ajustados
- Cards otimizados

### 📱 Mobile (< 768px)
- Layout em coluna única
- Menu hamburguer
- Grid de livros em 1-2 colunas
- Busca responsiva
- Cards compactos
- Navegação touch-friendly

---

## 🔧 Scripts Disponíveis

### Desenvolvimento
```bash
npm run dev
```
Inicia o servidor de desenvolvimento em modo hot-reload na porta 3000.

### Build
```bash
npm run build
```
Cria uma versão otimizada para produção com:
- Minificação de código
- Otimização de imagens
- Code splitting automático
- Geração de static pages

### Produção
```bash
npm run start
```
Inicia o servidor de produção após o build.

### Linting
```bash
npm run lint
```
Executa o ESLint para verificar a qualidade do código e padronização.

---

## 🚀 Funcionalidades Futuras

### Em Desenvolvimento
- [ ] Sistema de reserva de livros
- [ ] Histórico de empréstimos
- [ ] Perfil de usuário completo
- [ ] Sistema de favoritos
- [ ] Comentários e reviews de usuários
- [ ] Avaliações personalizadas

### Planejadas
- [ ] Sistema de notificações
- [ ] Integração com mais APIs de livros
- [ ] Chat entre usuários
- [ ] Sistema de recomendações por IA
- [ ] Modo escuro (dark mode)
- [ ] Suporte multilíngue (i18n)
- [ ] Progressive Web App (PWA)
- [ ] Sistema de gamificação
- [ ] QR Code para livros físicos
- [ ] Integração com bibliotecas físicas
- [ ] Dashboard administrativo
- [ ] Relatórios e estatísticas
- [ ] API pública
- [ ] Aplicativo mobile (React Native)

---

## 🤝 Contribuição

Contribuições são muito bem-vindas! Para contribuir:

### Como Contribuir

1. **Fork o projeto**
   ```bash
   git clone https://github.com/seu-usuario/projeto-borboleta.git
   ```

2. **Crie uma branch para sua feature**
   ```bash
   git checkout -b feature/MinhaNovaFeature
   ```

3. **Commit suas mudanças**
   ```bash
   git commit -m 'Adiciona MinhaNovaFeature'
   ```

4. **Push para a branch**
   ```bash
   git push origin feature/MinhaNovaFeature
   ```

5. **Abra um Pull Request**

### Diretrizes

- Siga as convenções de código do ESLint
- Escreva commits descritivos
- Documente novas funcionalidades
- Teste suas alterações antes de submeter
- Mantenha o código limpo e organizado
- Respeite a estrutura do projeto

### Reportar Bugs

Para reportar bugs, abra uma issue com:
- Descrição clara do problema
- Passos para reproduzir
- Comportamento esperado vs. atual
- Screenshots (se aplicável)
- Informações do ambiente (browser, OS, etc.)

### Sugerir Melhorias

Para sugerir melhorias:
- Descreva a funcionalidade desejada
- Explique o caso de uso
- Proponha uma solução (opcional)

---

## 📝 Boas Práticas Implementadas

- ✅ **Componentes modulares**: Reutilização e manutenibilidade
- ✅ **Context API**: Gerenciamento de estado eficiente
- ✅ **CSS Modules**: Escopo local de estilos
- ✅ **Async/Await**: Tratamento moderno de promises
- ✅ **Error Handling**: Tratamento de erros em chamadas API
- ✅ **Responsive Design**: Mobile-first approach
- ✅ **Semantic HTML**: Acessibilidade e SEO
- ✅ **Clean Code**: Código legível e bem documentado
- ✅ **Performance**: Otimização de imagens e lazy loading
- ✅ **Git Workflow**: Commits organizados e descritivos

---

## 📚 Recursos Adicionais

### Documentação Relacionada

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [Google Books API](https://developers.google.com/books/docs/v1/using)
- [MDN Web Docs - CSS](https://developer.mozilla.org/pt-BR/docs/Web/CSS)

### Tutoriais e Guias

- [Next.js App Router](https://nextjs.org/docs/app)
- [React Context API](https://react.dev/reference/react/useContext)
- [CSS Grid Layout](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [Responsive Web Design](https://web.dev/responsive-web-design-basics/)

---

## 📄 Licença

Este projeto é desenvolvido para fins **educacionais e comunitários**.

Sinta-se livre para usar, modificar e distribuir este código para aprendizado e projetos não comerciais.

---

## 👤 Autor

Desenvolvido com ❤️ para facilitar o acesso à leitura e cultura.

---

## 📞 Suporte e Contato

- **Issues**: Para bugs e sugestões, use as [GitHub Issues](https://github.com/seu-usuario/projeto-borboleta/issues)
- **Discussões**: Para perguntas gerais, use as [GitHub Discussions](https://github.com/seu-usuario/projeto-borboleta/discussions)

---

<div align="center">
  <p>⭐ Se este projeto foi útil para você, considere dar uma estrela!</p>
  <p>🐛 Encontrou um bug? Abra uma issue!</p>
  <p>💡 Tem uma ideia? Compartilhe conosco!</p>
</div>

---

**Projeto Borboleta** © 2025 - Transformando comunidades através da leitura 📚✨
