'use client'

import './LoginForm.css'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../context/AuthContext'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)
  const router = useRouter()
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErro('')
    setCarregando(true)

    // Validação básica
    if (!email || !senha) {
      setErro('Por favor, preencha todos os campos.')
      setCarregando(false)
      return
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setErro('Por favor, insira um email válido.')
      setCarregando(false)
      return
    }

    // Validação de senha (mínimo 6 caracteres)
    if (senha.length < 6) {
      setErro('A senha deve ter no mínimo 6 caracteres.')
      setCarregando(false)
      return
    }

    // Simulação de login (aqui você pode integrar com sua API)
    try {
      // Simular delay de requisição
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Por enquanto, vamos aceitar qualquer login válido
      // Em produção, você faria uma chamada à API aqui
      console.log('Login realizado:', { email, senha: '***' })

      // Salvar usuário no contexto
      login(email)

      // Redirecionar para a página principal
      router.push('/')
    } catch (error) {
      setErro('Erro ao fazer login. Tente novamente.')
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <i className="fas fa-book"></i>
          <h1>Biblioteca Comunitária</h1>
          <p>Faça login para continuar</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {erro && (
            <div className="erro-mensagem">
              <i className="fas fa-exclamation-circle"></i>
              {erro}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">
              <i className="fas fa-envelope"></i>
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              disabled={carregando}
            />
          </div>

          <div className="form-group">
            <label htmlFor="senha">
              <i className="fas fa-lock"></i>
              Senha
            </label>
            <input
              type="password"
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="••••••••"
              disabled={carregando}
            />
          </div>

          <div className="form-options">
            <label className="checkbox-label">
              <input type="checkbox" />
              <span>Lembrar-me</span>
            </label>
            <a href="#" className="esqueceu-senha">Esqueceu a senha?</a>
          </div>

          <button 
            type="submit" 
            className="btn-entrar"
            disabled={carregando}
          >
            {carregando ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                Entrando...
              </>
            ) : (
              <>
                <i className="fas fa-sign-in-alt"></i>
                Entrar
              </>
            )}
          </button>

          <div className="cadastro-link">
            <p>Não tem uma conta? <a href="#">Cadastre-se</a></p>
          </div>
        </form>

        <div className="login-footer">
          <p>Ou entre com</p>
          <div className="social-login">
            <button className="social-btn google">
              <i className="fab fa-google"></i>
              Google
            </button>
            <button className="social-btn facebook">
              <i className="fab fa-facebook-f"></i>
              Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
