import { useEffect, useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { apiService } from '@/services/api';

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'expired' | 'redirecting'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get('token');

      if (!token) {
        setStatus('error');
        setMessage('No verification token provided');
        return;
      }

      try {
        const response = await fetch(`/api/auth/verify-email?token=${token}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (response.ok) {
          // Check if auto-login is enabled
          if (data.autoLogin && data.accessToken) {
            setStatus('redirecting');
            setMessage('Email verified! Redirecting to your dashboard...');

            // Store the access token
            apiService.setAccessToken(data.accessToken);

            // Short delay to show the success message
            setTimeout(() => {
              navigate('/client-portal/dashboard');
              // Force a reload to update the auth context
              window.location.reload();
            }, 1500);
          } else {
            setStatus('success');
            setMessage(data.message || 'Your email has been verified successfully!');
          }
        } else {
          if (data.error?.includes('expired')) {
            setStatus('expired');
            setMessage(data.error);
          } else {
            setStatus('error');
            setMessage(data.error || 'Failed to verify email');
          }
        }
      } catch (error) {
        console.error('Verification error:', error);
        setStatus('error');
        setMessage('An error occurred while verifying your email');
      }
    };

    verifyEmail();
  }, [searchParams]);

  const handleResendVerification = async () => {
    const email = prompt('Please enter your email address:');
    if (!email) return;

    try {
      const response = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('A new verification email has been sent. Please check your inbox.');
        setStatus('success');
      } else {
        alert(data.error || 'Failed to resend verification email');
      }
    } catch (error) {
      console.error('Resend error:', error);
      alert('An error occurred while resending verification email');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full"
      >
        <div className="text-center">
          {status === 'loading' && (
            <>
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto"></div>
              <h2 className="text-2xl font-serif text-neutral-800 mt-4">
                Verifying your email...
              </h2>
              <p className="text-neutral-600 mt-2">Please wait while we confirm your email address.</p>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-serif text-neutral-800 mt-4">
                Email Verified!
              </h2>
              <p className="text-neutral-600 mt-2">{message}</p>
              <Link
                to="/client-portal"
                className="inline-block mt-6 px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
              >
                Go to Client Portal
              </Link>
            </>
          )}

          {status === 'redirecting' && (
            <>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-serif text-neutral-800 mt-4">
                Email Verified!
              </h2>
              <p className="text-neutral-600 mt-2">{message}</p>
              <div className="mt-6">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
              </div>
            </>
          )}

          {status === 'expired' && (
            <>
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h2 className="text-2xl font-serif text-neutral-800 mt-4">
                Token Expired
              </h2>
              <p className="text-neutral-600 mt-2">{message}</p>
              <button
                onClick={handleResendVerification}
                className="inline-block mt-6 px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
              >
                Resend Verification Email
              </button>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h2 className="text-2xl font-serif text-neutral-800 mt-4">
                Verification Failed
              </h2>
              <p className="text-neutral-600 mt-2">{message}</p>
              <div className="mt-6 space-y-3">
                <button
                  onClick={handleResendVerification}
                  className="block w-full px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Resend Verification Email
                </button>
                <Link
                  to="/client-portal"
                  className="block w-full px-6 py-3 bg-secondary-100 text-neutral-700 font-medium rounded-lg hover:bg-secondary-200 transition-colors"
                >
                  Back to Login
                </Link>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}