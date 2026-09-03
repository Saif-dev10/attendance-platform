'use client';

import Image from 'next/image';
import Button from '@/components/ui/Button';
import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

import {
  PiGraduationCapFill,
  PiIdentificationCard,
  PiLock,
  PiEye,
  PiEyeSlash,
  PiArrowRight,
} from 'react-icons/pi';

import {
  validateRegistrationNumber,
  validatePasswordStrength,
} from '@/lib/validation';

export default function LoginPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [regNumber, setRegNumber] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegNumberChange = useCallback((e) => {
    setRegNumber(e.target.value);

    setErrors((prev) => {
      if (!prev.regNumber) return prev;

      const updated = { ...prev };
      delete updated.regNumber;

      return updated;
    });

    setFormError('');
  }, []);

  const handlePasswordChange = useCallback((e) => {
    const value = e.target.value;

    setPassword(value);

    setErrors((prev) => {
      if (!prev.password) return prev;

      const updated = { ...prev };
      delete updated.password;

      return updated;
    });

    setFormError('');
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    if (isSubmitting) return;

    // Validate both fields before starting the simulated sign-in request.
    setErrors({});
    setFormError('');

    const regResult = validateRegistrationNumber(
      regNumber,
      'BUK_STUDENT'
    );

    const passwordResult = validatePasswordStrength(password);

    const nextErrors = {};

    if (!regResult.valid) {
      nextErrors.regNumber = regResult.error;
    }

    if (!passwordResult.valid) {
      nextErrors.password = passwordResult.unmet;
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    router.push('/dashboard');

    setIsSubmitting(true);

    try {

      console.log('Validated login:', {
        registrationNumber: regResult.value,
        password,
        remember,
      });

      await new Promise((resolve) =>
        setTimeout(resolve, 700)
      );

    } catch (error) {
      console.error('Login error:', error);

      setFormError(
        'Something went wrong. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }

    
  }

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-slate-50 lg:bg-white">

      {/* The form stays compact on large screens while the campus panel carries the visual weight. */}
      <div className="w-full max-w-md lg:max-w-none lg:w-[480px] min-h-screen flex flex-col p-8 lg:p-16 shrink-0 relative z-10 bg-white shadow-xl lg:shadow-2xl rounded-2xl lg:rounded-none m-4 lg:m-0">

        <div className="mb-auto">

          <div className="flex items-center gap-2.5 mb-12">

            <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-white shadow-lg shadow-slate-900/20">
              <PiGraduationCapFill className="text-xl" />
            </div>

            <span className="font-bold text-2xl tracking-tight text-slate-900">
              UniFlow
            </span>

          </div>

          <div className="mb-10">

            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Welcome back
            </h1>

            <p className="text-slate-500">
              Please enter your institutional credentials to
              access your workspace.
            </p>

          </div>

          {/* Sign-in form: institutional ID, password, device memory, and submission. */}
          <form
            className="space-y-5"
            onSubmit={handleSubmit}
            noValidate
          >

            {formError && (
              <div
                role="alert"
                className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm font-medium text-red-600"
              >
                {formError}
              </div>
            )}

            {/* Institutional ID field and inline validation message. */}
            <div>

              <label
                htmlFor="regNumber"
                className="block text-[13px] font-bold text-slate-900 uppercase tracking-wider mb-2"
              >
                Institutional ID
              </label>

              <div className="relative">

                <PiIdentificationCard
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg"
                />

                <input
                  type="text"
                  id="regNumber"
                  name="regNumber"
                  autoComplete="username"
                  placeholder="e.g. CST/23/IFT/00001"
                  value={regNumber}
                  onChange={handleRegNumberChange}
                  aria-invalid={!!errors.regNumber}
                  aria-describedby={
                    errors.regNumber
                      ? 'regNumber-error'
                      : undefined
                  }
                  className={`w-full pl-12 pr-4 py-3.5 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:ring-4 transition-all placeholder:text-slate-400 font-medium ${
                    errors.regNumber
                      ? 'border-red-400 focus:ring-red-500/10 focus:border-red-400'
                      : 'border-slate-200 focus:ring-blue-500/10 focus:border-blue-400'
                  }`}
                />

              </div>

              {errors.regNumber && (
                <p
                  id="regNumber-error"
                  role="alert"
                  className="mt-1.5 text-xs font-medium text-red-500"
                >
                  {errors.regNumber}
                </p>
              )}

            </div>

            {/* Password field, visibility toggle, and strength requirements. */}
            <div>

              <div className="flex items-center justify-between mb-2">

                <label
                  htmlFor="password"
                  className="block text-[13px] font-bold text-slate-900 uppercase tracking-wider"
                >
                  Password
                </label>

                <a
                  href="/forgetPassword"
                  className="text-[13px] font-bold text-blue-600 hover:text-blue-700"
                >
                  Forgot?
                </a>

              </div>

              <div className="relative">

                <PiLock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg"
                />

                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  autoComplete="current-password"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={handlePasswordChange}
                  aria-invalid={!!errors.password}
                  aria-describedby={
                    errors.password
                      ? 'password-error'
                      : undefined
                  }
                  className={`w-full pl-12 pr-12 py-3.5 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:ring-4 transition-all placeholder:text-slate-400 font-medium ${
                    errors.password
                      ? 'border-red-400 focus:ring-red-500/10 focus:border-red-400'
                      : 'border-slate-200 focus:ring-blue-500/10 focus:border-blue-400'
                  }`}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => !prev)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  aria-label={
                    showPassword
                      ? 'Hide password'
                      : 'Show password'
                  }
                >
                  {showPassword ? (
                    <PiEyeSlash className="text-lg cursor-pointer" />
                  ) : (
                    <PiEye className="text-lg cursor-pointer" />
                  )}
                </button>

              </div>

              {errors.password && (
                <div
                  id="password-error"
                  role="alert"
                  className="mt-2 space-y-1"
                >

                  {errors.password.map((error) => (
                    <p
                      key={error}
                      className="text-xs font-medium text-red-500"
                    >
                      • {error}
                    </p>
                  ))}

                </div>
              )}

            </div>

            {/* Keep the device signed in for the next visit. */}
            <div className="flex items-center gap-3 pt-2">

              <input
                type="checkbox"
                id="remember"
                name="remember"
                checked={remember}
                onChange={(e) =>
                  setRemember(e.target.checked)
                }
                className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500/20"
              />

              <label
                htmlFor="remember"
                className="text-sm font-medium text-slate-500 cursor-pointer"
              >
                Remember this device for 30 days
              </label>

            </div>

            {/* Submit action reflects the simulated request state. */}
            <Button
              type="submit"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
              className={`w-full py-4 rounded-xl text-white font-bold text-sm transition-all shadow-xl shadow-slate-900/20 mt-4 flex items-center justify-center gap-2 ${
                isSubmitting
                  ? 'bg-slate-500 cursor-not-allowed'
                  : 'bg-slate-800 hover:bg-slate-900 cursor-pointer'
              }`}
            >

              <span>
                {isSubmitting
                  ? 'Signing In…'
                  : 'Sign In to Workspace'}
              </span>

              {!isSubmitting && (
                <PiArrowRight className="font-bold" />
              )}

              

            </Button>

          </form>

          <div className="mt-10 pt-8 border-t border-slate-100">

            <p className="text-[13px] text-slate-500 text-center">

              New student or staff?{' '}

              <a
                href="#"
                className="font-bold text-blue-600 hover:text-blue-700"
              >
                Activate your account
              </a>

            </p>

          </div>

        </div>

        <div className="mt-8 lg:mt-auto flex items-center justify-between text-[11px] font-medium text-slate-400 uppercase tracking-[0.1em]">

          <span>
            &copy; 2024 UniFlow Platform
          </span>

          <div className="flex gap-4">

            <a
              href="#"
              className="hover:text-slate-600 transition-colors"
            >
              Privacy
            </a>

            <a
              href="#"
              className="hover:text-slate-600 transition-colors"
            >
              Support
            </a>

          </div>

        </div>

      </div>

      <div className="hidden lg:block flex-1 min-h-screen sticky top-0 relative bg-slate-900 overflow-hidden">

        <div className="absolute inset-0 z-0">

          <Image
            src="https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_e42b8ed18d_3606c98ef15b48ce.png"
            alt="Modern university campus architecture with glass buildings and library"
            fill
            priority
            sizes="(max-width: 1024px) 0vw, 100vw"
            className="object-cover opacity-40 mix-blend-luminosity"
          />

        </div>

        <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 via-slate-900/60 to-blue-900/40 z-10" />

        <svg
          className="absolute inset-0 w-full h-full opacity-[0.15] z-[15]"
          xmlns="http://www.w3.org/2000/svg"
        >

          <defs>

            <pattern
              id="grid-login"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >

              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="#fff"
                strokeWidth="0.5"
              />

            </pattern>

          </defs>

          <rect
            width="100%"
            height="100%"
            fill="url(#grid-login)"
          />

        </svg>

        <div className="absolute inset-0 z-20 flex flex-col justify-center p-20 text-white">

          <div className="max-w-xl">

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-widest mb-6">

              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />

              Campus Mobility & Management

            </div>

            <h2 className="text-5xl font-bold leading-tight mb-6">
              The complete engine for the modern university.
            </h2>

            <p className="text-xl text-white/70 leading-relaxed">
              Experience a unified platform for academic
              excellence, administration, and campus mobility.
            </p>

            <div className="grid grid-cols-2 gap-10 mt-16">

              <div>

                <p className="text-4xl font-bold mb-1">
                  15k+
                </p>

                <p className="text-sm font-medium text-white/50 uppercase tracking-wider">
                  Active Students
                </p>

              </div>

              <div>

                <p className="text-4xl font-bold mb-1">
                  98%
                </p>

                <p className="text-sm font-medium text-white/50 uppercase tracking-wider">
                  Campus Efficiency
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}