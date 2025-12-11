import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuthStore();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to login. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden bg-gradient-primary">
      {/* Floating glass orbs (decoration) */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/15 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="max-w-md w-full animate-fade-in">
        <div 
          className="glass-morphic rounded-3xl p-10"
          style={{ boxShadow: 'var(--shadow-2)' }}
        >
          {/* Logo and Title */}
          <div className="text-center mb-10">
            <div className="flex justify-center mb-6">
              <img src="https://d.imgvision.net/jimmeey/Logo.png" alt="Physique 57" className="h-20 w-20 rounded-2xl object-contain transform hover:scale-105 transition-transform duration-300" style={{ boxShadow: 'var(--shadow-3)' }} />
            </div>
            <h2 className="lux-heading-xl mb-3">
              Physique 57 India
            </h2>
            <p className="lux-body text-[#616161]">
              Ticket Management System
            </p>
          </div>
          
          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@physique57.com"
              required
              autoComplete="email"
              autoFocus
            />
            
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              autoComplete="current-password"
            />
            
            {error && (
              <div 
                className="bg-red-50/90 border border-red-200/50 text-red-700 px-4 py-3 rounded-xl text-sm animate-slide-down"
                style={{ backdropFilter: 'blur(12px)', boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.07)' }}
              >
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                  </svg>
                  {error}
                </div>
              </div>
            )}
            
            <Button
              variant="primary"
              size="lg"
              isLoading={isLoading}
              className="w-full"
            >
              Login
            </Button>
          </form>
          
          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm text-dark-600">
              Forgot your password?{' '}
              <button 
                type="button"
                onClick={() => alert('Password reset feature coming soon!')}
                className="text-dark-800 hover:text-dark-900 font-medium transition-colors underline cursor-pointer bg-transparent border-none p-0"
              >
                Reset it here
              </button>
            </p>
          </div>
        </div>
        
        {/* Demo Credentials */}
        <div className="mt-6 glass-morphic rounded-2xl p-5 text-sm animate-slide-up">
          <p className="font-semibold text-dark-900 mb-2">Demo Credentials:</p>
          <p className="text-dark-700">Email: demo@physique57.com</p>
          <p className="text-dark-700">Password: demo123</p>
          <p className="text-dark-600 text-xs mt-2">
            Note: Set up your Supabase database first
          </p>
        </div>
      </div>
    </div>
  );
};
