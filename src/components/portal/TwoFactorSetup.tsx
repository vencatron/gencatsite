import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { apiService } from '@/services/api';

interface TwoFactorSetupProps {
  onComplete: () => void;
  onCancel: () => void;
}

const TwoFactorSetup = ({ onComplete, onCancel }: TwoFactorSetupProps) => {
  const [step, setStep] = useState<'intro' | 'qr' | 'verify' | 'backup'>('intro');
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [secret, setSecret] = useState<string>('');
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [backupCodesSaved, setBackupCodesSaved] = useState(false);

  const handleStart = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiService.setup2FA();
      setQrCodeUrl(response.qrCodeUrl);
      setSecret(response.secret);
      setBackupCodes(response.backupCodes);
      setStep('qr');
    } catch (err: any) {
      setError(err.message || 'Failed to initialize 2FA setup');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async () => {
    if (verificationCode.length !== 6) {
      setError('Please enter a 6-digit code');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await apiService.verify2FASetup(verificationCode, backupCodes);
      setStep('backup');
    } catch (err: any) {
      setError(err.message || 'Verification failed. Please try again.');
      setVerificationCode('');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadBackupCodes = () => {
    const blob = new Blob(
      [
        'Generation Catalyst - 2FA Backup Codes\n',
        'Generated: ' + new Date().toLocaleString() + '\n\n',
        'IMPORTANT: Store these codes securely!\n',
        'Each code can only be used once.\n\n',
        ...backupCodes.map((code, i) => `${i + 1}. ${code}\n`),
      ],
      { type: 'text/plain' }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `2fa-backup-codes-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    setBackupCodesSaved(true);
  };

  const handleCopyBackupCodes = () => {
    const text = backupCodes.join('\n');
    navigator.clipboard.writeText(text);
    setBackupCodesSaved(true);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        {step === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center">
              <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-10 h-10 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">
                Enable Two-Factor Authentication
              </h2>
              <p className="text-neutral-600 text-lg mb-8">
                Add an extra layer of security to your account
              </p>
            </div>

            <div className="bg-primary-50 border border-primary-200 rounded-lg p-6 space-y-4">
              <h3 className="font-semibold text-neutral-900">What you'll need:</h3>
              <ul className="space-y-3 text-neutral-700">
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-primary-600 mt-0.5 mr-3 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>
                    An authenticator app (Google Authenticator, Authy, or similar)
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-primary-600 mt-0.5 mr-3 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>A few minutes to complete the setup</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-primary-600 mt-0.5 mr-3 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>A safe place to store your backup codes</span>
                </li>
              </ul>
            </div>

            {error && (
              <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}

            <div className="flex gap-4">
              <button
                onClick={handleStart}
                disabled={isLoading}
                className="flex-1 btn-primary"
              >
                {isLoading ? 'Initializing...' : 'Get Started'}
              </button>
              <button onClick={onCancel} className="flex-1 btn-ghost">
                Cancel
              </button>
            </div>
          </motion.div>
        )}

        {step === 'qr' && (
          <motion.div
            key="qr"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                Scan QR Code
              </h2>
              <p className="text-neutral-600">
                Use your authenticator app to scan this QR code
              </p>
            </div>

            <div className="bg-white border-2 border-neutral-200 rounded-xl p-8 text-center">
              {qrCodeUrl && (
                <img
                  src={qrCodeUrl}
                  alt="2FA QR Code"
                  className="mx-auto w-64 h-64"
                />
              )}
            </div>

            <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4">
              <p className="text-sm font-semibold text-neutral-700 mb-2">
                Can't scan the code?
              </p>
              <p className="text-sm text-neutral-600 mb-2">
                Manually enter this code in your authenticator app:
              </p>
              <div className="bg-white border border-neutral-300 rounded px-3 py-2 font-mono text-sm break-all">
                {secret}
              </div>
            </div>

            <button
              onClick={() => setStep('verify')}
              className="w-full btn-primary"
            >
              Continue to Verification
            </button>
          </motion.div>
        )}

        {step === 'verify' && (
          <motion.div
            key="verify"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                Verify Setup
              </h2>
              <p className="text-neutral-600">
                Enter the 6-digit code from your authenticator app
              </p>
            </div>

            {error && (
              <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="verify-code" className="label-field">
                Verification Code
              </label>
              <input
                type="text"
                id="verify-code"
                value={verificationCode}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  if (value.length <= 6) {
                    setVerificationCode(value);
                    setError(null);
                  }
                }}
                className="input-field text-center text-2xl tracking-widest font-mono"
                placeholder="000000"
                maxLength={6}
                autoComplete="off"
                autoFocus
                disabled={isLoading}
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleVerify}
                disabled={isLoading || verificationCode.length !== 6}
                className="flex-1 btn-primary"
              >
                {isLoading ? 'Verifying...' : 'Verify & Enable'}
              </button>
              <button
                onClick={() => setStep('qr')}
                disabled={isLoading}
                className="btn-ghost"
              >
                Back
              </button>
            </div>
          </motion.div>
        )}

        {step === 'backup' && (
          <motion.div
            key="backup"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                2FA Enabled Successfully!
              </h2>
              <p className="text-neutral-600">
                Save your backup codes before finishing
              </p>
            </div>

            <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-6">
              <div className="flex items-start mb-4">
                <svg
                  className="w-6 h-6 text-yellow-600 mr-3 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <h3 className="font-semibold text-yellow-900 mb-2">
                    Important: Save Your Backup Codes
                  </h3>
                  <p className="text-yellow-800 text-sm">
                    If you lose access to your authenticator app, these codes are the
                    only way to access your account. Each code can only be used once.
                  </p>
                </div>
              </div>

              <div className="bg-white border border-yellow-300 rounded-lg p-4 font-mono text-sm">
                <div className="grid grid-cols-2 gap-3">
                  {backupCodes.map((code, index) => (
                    <div key={index} className="text-center py-2">
                      {code}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={handleDownloadBackupCodes}
                  className="flex-1 btn-outline text-sm"
                >
                  📥 Download Codes
                </button>
                <button
                  onClick={handleCopyBackupCodes}
                  className="flex-1 btn-outline text-sm"
                >
                  📋 Copy to Clipboard
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-4 bg-neutral-50 rounded-lg">
              <input
                type="checkbox"
                id="backup-saved"
                checked={backupCodesSaved}
                onChange={(e) => setBackupCodesSaved(e.target.checked)}
                className="w-5 h-5 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
              />
              <label
                htmlFor="backup-saved"
                className="text-sm text-neutral-700 cursor-pointer"
              >
                I have saved my backup codes in a secure location
              </label>
            </div>

            <button
              onClick={onComplete}
              disabled={!backupCodesSaved}
              className="w-full btn-primary"
            >
              Finish Setup
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TwoFactorSetup;
