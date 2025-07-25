/**
 * Authentication page
 * Provides sign in and sign up forms for users
 */
import { AuthForm } from '@/components/auth/auth-form'

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your account or create a new one</p>
        </div>
        <AuthForm />
      </div>
    </div>
  )
}