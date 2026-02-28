import { useState } from 'react';
import { motion } from 'framer-motion';

interface TwoFactorVerificationProps {
  userId: number;
  onVerify: (token: string, isBackupCode: boolean) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

const TwoFactorVerification = ({
  onVerify,
  onCancel,
  isLoading = false,
}: TwoFactorVerificationProps) => {
  const [token, setToken] = useState('');
  const [useBackupCode, setUseBackupCode] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!token.trim()) {
      setError('Please enter your verification code');
      return;
    }

    try {
      await onVerify(token.trim(), useBackupCode);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Verification failed. Please try again.');
    }
  };

  const handleTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // Only allow digits
    if (!useBackupCode && value.length <= 6) {
      setToken(value);
    } else if (useBackupCode) {
      setToken(e.target.value.toUpperCase());
    }
    setError(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="space-y-6"
    >
      <div className="text-center">
        <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
          <svg
            className="w-8 h-8 text-primary-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-neutral-900 mb-2">
          Two-Factor Authentication
        </h3>
        <p className="text-neutral-600">
          {useBackupCode
            ? 'Enter one of your backup codes'
            : 'Enter the 6-digit code from your authenticator app'}
        </p>
      </div>

      {error && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="2fa-token" className="label-field">
            {useBackupCode ? 'Backup Code' : 'Verification Code'}
          </label>
          <input
            type="text"
            id="2fa-token"
            value={token}
            onChange={handleTokenChange}
            className="input-field text-center text-2xl tracking-widest font-mono"
            placeholder={useBackupCode ? 'XXXXXXXX' : '000000'}
            maxLength={useBackupCode ? 8 : 6}
            autoComplete="off"
            autoFocus
            disabled={isLoading}
          />
          <p className="mt-2 text-sm text-neutral-500">
            {useBackupCode
              ? 'Each backup code can only be used once'
              : 'The code refreshes every 30 seconds'}
          </p>
        </div>

        <button
          type="submit"
          disabled={isLoading || !token.trim()}
          className="w-full btn-primary"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Verifying...
            </div>
          ) : (
            'Verify & Continue'
          )}
        </button>

        <div className="text-center space-y-3">
          <button
            type="button"
            onClick={() => {
              setUseBackupCode(!useBackupCode);
              setToken('');
              setError(null);
            }}
            className="text-sm text-primary-600 hover:text-primary-500 font-medium"
            disabled={isLoading}
          >
            {useBackupCode
              ? '← Use authenticator app instead'
              : 'Use backup code instead →'}
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="block w-full btn-ghost"
            disabled={isLoading}
          >
            Cancel & Return to Login
          </button>
        </div>
      </form>

      <div className="mt-6 p-4 bg-neutral-50 rounded-lg border border-neutral-200">
        <h4 className="font-semibold text-neutral-900 text-sm mb-2">
          Can't access your codes?
        </h4>
        <p className="text-neutral-600 text-sm">
          Contact support at{' '}
          <a href="tel:(555)123-4567" className="text-primary-600 hover:underline">
            (555) 123-4567
          </a>{' '}
          for assistance.
        </p>
      </div>
    </motion.div>
  );
};

export default TwoFactorVerification;
