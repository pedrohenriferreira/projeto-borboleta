import LoginForm from '../components/LoginForm'

export const metadata = {
  title: 'Login - Biblioteca Comunitária',
  description: 'Faça login para acessar a Biblioteca Comunitária',
}

export default function LoginPage() {
  return (
    <main className="login-page">
      <LoginForm />
    </main>
  )
}
