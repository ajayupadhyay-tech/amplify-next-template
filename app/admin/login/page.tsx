'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Compass, ShieldAlert, ShieldCheck, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function AdminLoginPage() {
  const router = useRouter();
  
  // Modes: 'signin' | 'signup' | 'forgot'
  const [mode, setMode] = useState<'signin' | 'signup' | 'forgot'>('signin');
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError(res.error);
      } else {
        router.push('/admin');
        router.refresh();
      }
    } catch (err) {
      setError('Something went wrong. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Registration failed.');
      } else {
        setSuccess('Account created successfully! You can now Sign In below.');
        setMode('signin');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Simulate sending reset password code
      setTimeout(() => {
        setSuccess(`Verification code sent to ${email}! Enter it to complete reset.`);
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-navy flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(251,146,60,0.1),transparent)] z-0 pointer-events-none" />

      <div className="relative z-10 w-full max-w-md bg-navy-light/60 backdrop-blur-xl border border-white/10 p-8 sm:p-10 rounded-3xl shadow-xl flex flex-col gap-6 text-left">
        
        {/* Brand logo */}
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="bg-primary/10 border border-primary/20 p-3.5 rounded-2xl w-max">
            <Compass className="h-7 w-7 text-primary animate-spin-slow" />
          </div>
          <h1 className="text-xl font-extrabold tracking-wider bg-gradient-to-r from-white via-orange-300 to-primary bg-clip-text text-transparent">
            INCREDIBLE INDIA
          </h1>
          <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">
            {mode === 'signin' && 'Management Console Login'}
            {mode === 'signup' && 'Create Console Account'}
            {mode === 'forgot' && 'Reset Account Password'}
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-xs font-bold flex items-center gap-2">
            <ShieldAlert className="h-4.5 w-4.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-xl text-xs font-bold flex items-center gap-2">
            <ShieldCheck className="h-4.5 w-4.5 shrink-0" />
            <span>{success}</span>
          </div>
        )}

        {/* 1. SIGN IN MODE */}
        {mode === 'signin' && (
          <form onSubmit={handleSignIn} className="flex flex-col gap-4 text-xs font-bold text-gray-300">
            <div className="flex flex-col gap-1.5">
              <label className="uppercase tracking-wider">Email Address</label>
              <input 
                type="email" 
                required
                placeholder="admin@incredibleindia.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-navy border border-white/10 px-4 py-3 rounded-xl outline-none text-white focus:border-primary transition-all font-medium text-sm"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="uppercase tracking-wider">Password</label>
              <input 
                type="password" 
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-navy border border-white/10 px-4 py-3 rounded-xl outline-none text-white focus:border-primary transition-all font-medium text-sm"
              />
            </div>

            <div className="flex justify-end -mt-2">
              <button 
                type="button" 
                onClick={() => { setMode('forgot'); setError(''); setSuccess(''); }} 
                className="text-primary hover:underline text-[10px]"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl text-xs transition-all tracking-wider uppercase mt-4 flex items-center justify-center gap-1 shadow-md cursor-pointer"
            >
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>

            <div className="text-center text-[10px] text-gray-400 mt-2">
              New to the panel?{' '}
              <button 
                type="button" 
                onClick={() => { setMode('signup'); setError(''); setSuccess(''); }} 
                className="text-primary font-bold hover:underline"
              >
                Create Account / Sign Up
              </button>
            </div>
          </form>
        )}

        {/* 2. SIGN UP MODE */}
        {mode === 'signup' && (
          <form onSubmit={handleSignUp} className="flex flex-col gap-4 text-xs font-bold text-gray-300">
            <div className="flex flex-col gap-1.5">
              <label className="uppercase tracking-wider">Full Name</label>
              <input 
                type="text" 
                required
                placeholder="Alex Carter"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-navy border border-white/10 px-4 py-3 rounded-xl outline-none text-white focus:border-primary transition-all font-medium text-sm"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="uppercase tracking-wider">Email Address</label>
              <input 
                type="email" 
                required
                placeholder="alexccldev@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-navy border border-white/10 px-4 py-3 rounded-xl outline-none text-white focus:border-primary transition-all font-medium text-sm"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="uppercase tracking-wider">Password</label>
              <input 
                type="password" 
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-navy border border-white/10 px-4 py-3 rounded-xl outline-none text-white focus:border-primary transition-all font-medium text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl text-xs transition-all tracking-wider uppercase mt-4 flex items-center justify-center gap-1 shadow-md cursor-pointer"
            >
              {loading ? 'Creating Account...' : 'Register & Create Account'}
            </button>

            <div className="text-center text-[10px] text-gray-400 mt-2">
              Already have an account?{' '}
              <button 
                type="button" 
                onClick={() => { setMode('signin'); setError(''); setSuccess(''); }} 
                className="text-primary font-bold hover:underline"
              >
                Sign In
              </button>
            </div>
          </form>
        )}

        {/* 3. FORGOT PASSWORD MODE */}
        {mode === 'forgot' && (
          <form onSubmit={handleForgot} className="flex flex-col gap-4 text-xs font-bold text-gray-300">
            <div className="flex flex-col gap-1.5">
              <label className="uppercase tracking-wider">Email Address</label>
              <input 
                type="email" 
                required
                placeholder="alexccldev@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-navy border border-white/10 px-4 py-3 rounded-xl outline-none text-white focus:border-primary transition-all font-medium text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl text-xs transition-all tracking-wider uppercase mt-4 flex items-center justify-center gap-1 shadow-md cursor-pointer"
            >
              {loading ? 'Sending Code...' : 'Send Reset Code'}
            </button>

            <div className="text-center text-[10px] text-gray-400 mt-2">
              Back to{' '}
              <button 
                type="button" 
                onClick={() => { setMode('signin'); setError(''); setSuccess(''); }} 
                className="text-primary font-bold hover:underline"
              >
                Sign In
              </button>
            </div>
          </form>
        )}

        <div className="border-t border-white/5 pt-4 text-center">
          <Link href="/" className="text-primary hover:underline text-[10px]">
            ← Return to Homepage
          </Link>
        </div>
      </div>
    </main>
  );
}
