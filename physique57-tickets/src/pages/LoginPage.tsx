import React from 'react';
import { LoginForm } from '../components/auth/LoginForm';

export const LoginPage: React.FC = () => {
  return (
    <div className="bg-[#F8F9FA] min-h-screen flex items-center justify-center">
      <LoginForm />
    </div>
  );
};
