import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {  resendOtpApi } from '../../services/auth.service';
import { useAuth } from '../../context/AuthContext';

export const OtpVerificationPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { verifyOtp } = useAuth() as any; // Hook to set authenticated user in state

  const tempToken = location.state?.tempToken;
  const email = location.state?.email || 'your email';

  // Guard: if accessed directly without login credentials
//   useEffect(() => {
//     if (!tempToken) {
//       navigate('/login', { replace: true });
//     }
//   }, [tempToken, navigate]);

  const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Resend countdown timer
  useEffect(() => {
    if (resendTimer <= 0) return;
    const interval = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleChange = (element: HTMLInputElement, index: number) => {
    const val = element.value.replace(/\D/g, '');
    
    if (!val) return;
    const newOtp = [...otp];
    
    newOtp[index] = val.substring(val.length - 1);

    setOtp(newOtp);

    // console.log( 'input', inputRefs.current );
    // Auto-focus next input
    if (index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    // console.log('Key pressed:', e);
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim().slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const digits = pastedData.split('');
    const newOtp = [...otp];
    digits.forEach((digit, index) => {
      newOtp[index] = digit;
      if (inputRefs.current[index]) {
        inputRefs.current[index]!.value = digit;
      }
    });
    setOtp(newOtp);

    const nextIndex = Math.min(digits.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalOtp = otp.join('');
    if (finalOtp.length !== 6) {
      setError('Please enter all 6 digits.');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      await verifyOtp({ tempToken, otp: finalOtp });
      navigate('/', { replace: true });
    } catch (err: any) {
      setError(err.message || 'OTP verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendTimer > 0) return;
    try {
      await resendOtpApi(tempToken);
      setResendTimer(60);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to resend OTP');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center">
        <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl">
          🔒
        </div>

        <h1 className="text-xl font-bold text-slate-900">Enter Verification Code</h1>
        <p className="text-xs text-slate-500 mt-1">
          We sent a 6-digit verification code to <br />
          <span className="font-semibold text-slate-700">{email}</span>
        </p>

        {error && (
          <div className="mt-4 p-2.5 bg-red-50 border border-red-200 text-red-600 rounded-lg text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleVerify} className="mt-6">
          <div className="flex justify-center gap-2 mb-6" onPaste={handlePaste}>
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                inputMode="numeric"
                maxLength={1}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-11 h-12 text-center text-lg font-bold border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-800"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={loading || otp.join('').length !== 6}
            className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-medium rounded-lg text-sm transition"
          >
            {loading ? 'Verifying...' : 'Verify & Continue'}
          </button>
        </form>

        <div className="mt-6 text-xs text-slate-500">
          Didn't receive code?{' '}
          {resendTimer > 0 ? (
            <span className="text-slate-400">Resend in {resendTimer}s</span>
          ) : (
            <button
              onClick={handleResend}
              className="text-emerald-600 font-semibold hover:underline"
            >
              Resend Code
            </button>
          )}
        </div>
      </div>
    </div>
  );
};