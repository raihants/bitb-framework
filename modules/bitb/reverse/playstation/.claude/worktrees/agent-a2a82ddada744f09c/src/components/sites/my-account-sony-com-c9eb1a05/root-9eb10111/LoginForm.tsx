import React, { useState } from 'react';
import { cn } from '@/lib/utils'; // shadcn cn utility

interface LoginFormProps {}

const LoginForm: React.FC<LoginFormProps> = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }
    setError('');
    // TODO: integrate actual sign‑in flow
    console.log('Submit', { email, password });
  };

  return (
    <form
      id="signin-entrance-form-signinId"
      className={cn('flex flex-col gap-3 max-w-[400px] mx-auto')}
      noValidate
      onSubmit={handleSubmit}
    >
      <label
        htmlFor="email"
        className={cn('psw-t-title-s psw-m-x-4@below-laptop psw-m-x-5 psw-p-b-2 psw-l-stack dsb-text-input-label--GwR6p')}
        aria-hidden="true"
      >
        <span className="text--W0nBc">
          <span dir="ltr" data-qa="#label">
            Sign‑In ID
          </span>
        </span>
      </label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder=""
        className={cn('w-full p-2 border border-gray-300 rounded focus:border-[#0066ff] focus:ring-2 focus:ring-[#0066ff]/20')}
      />
      <input
        type="password"
        id="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder=""
        className={cn('w-full p-2 border border-gray-300 rounded focus:border-[#0066ff] focus:ring-2 focus:ring-[#0066ff]/20')}
      />
      {error && (
        <p className={cn('text-sm text-red-600')}>{error}</p>
      )}
      <button
        type="submit"
        className={cn('bg-[#0066ff] text-white py-2 px-4 rounded transition-colors hover:bg-[#0055dd]')}
      >
        Sign In
      </button>
    </form>
  );
};

export default LoginForm;
