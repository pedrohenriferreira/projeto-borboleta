import Header from './components/Header'
import HeroSection from './components/HeroSection'
import Catalogo from './components/Catalogo'
import Recomendacoes from './components/Recomendacoes'

export default function Home() {
  return (
    <main>
      <Header />
      <HeroSection />
      <Catalogo />
      <Recomendacoes />
    </main>
  )
}