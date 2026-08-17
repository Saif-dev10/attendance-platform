'use client';

import { useState } from 'react';
import {
  PiGraduationCapFill,
  PiIdentificationCard,
  PiLock,
  PiEye,
  PiEyeSlash,
  PiArrowRight,
} from 'react-icons/pi';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row items-center justify-center lg:items-stretch lg:justify-start bg-slate-50 lg:bg-white lg:h-screen lg:overflow-hidden">

      {/* Left Side: Login Form */}
      <div className="w-full max-w-md lg:max-w-none lg:w-[480px] lg:h-full flex flex-col p-8 lg:p-16 shrink-0 relative z-10 bg-white shadow-xl lg:shadow-2xl rounded-2xl lg:rounded-none m-4 lg:m-0">

        <div className="mb-auto">

          {/* Logo */}
          <div className="flex items-center gap-2.5 mb-12">
            <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-white shadow-lg shadow-slate-900/20">
              <PiGraduationCapFill className="text-xl" />
            </div>

            <span className="font-bold text-2xl tracking-tight text-slate-900">
              UniFlow
            </span>
          </div>

          {/* Heading */}
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Welcome back
            </h1>

            <p className="text-slate-500">
              Please enter your institutional credentials to access your workspace.
            </p>
          </div>

          {/* Form */}
          <form
            className="space-y-5"
            onSubmit={(e) => e.preventDefault()}
          >

            {/* Institutional ID */}
            <div>
              <label
                htmlFor="id"
                className="block text-[13px] font-bold text-slate-900 uppercase tracking-wider mb-2"
              >
                Institutional ID
              </label>

              <div className="relative">
                <PiIdentificationCard className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />

                <input
                  type="text"
                  id="id"
                  placeholder="e.g. STU/2023/001 or STAFF/992"
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-400 transition-all placeholder:text-slate-400 font-medium"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">

                <label
                  htmlFor="password"
                  className="block text-[13px] font-bold text-slate-900 uppercase tracking-wider"
                >
                  Password
                </label>

                <a
                  href="#"
                  className="text-[13px] font-bold text-blue-600 hover:text-blue-700"
                >
                  Forgot?
                </a>

              </div>

              <div className="relative">

                <PiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />

                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  placeholder="••••••••••••"
                  className="w-full pl-12 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-400 transition-all placeholder:text-slate-400 font-medium"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label={
                    showPassword ? 'Hide password' : 'Show password'
                  }
                >
                  {showPassword ? (
                    <PiEyeSlash className="text-lg" />
                  ) : (
                    <PiEye className="text-lg" />
                  )}
                </button>

              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-3 pt-2">

              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500/20"
              />

              <label
                htmlFor="remember"
                className="text-sm font-medium text-slate-500 cursor-pointer"
              >
                Remember this device for 30 days
              </label>

            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-slate-800 text-white font-bold text-sm hover:bg-slate-900 transition-all shadow-xl shadow-slate-900/20 mt-4 flex items-center justify-center gap-2"
            >
              <span>Sign In to Workspace</span>
              <PiArrowRight className="font-bold" />
            </button>

          </form>

          {/* Account Activation */}
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

        {/* Footer */}
        <div className="mt-8 lg:mt-auto flex items-center justify-between text-[11px] font-medium text-slate-400 uppercase tracking-[0.1em]">

          <span>
            &copy; 2024 UniFlow Platform
          </span>

          <div className="flex gap-4">
            <a href="#" className="hover:text-slate-600">
              Privacy
            </a>

            <a href="#" className="hover:text-slate-600">
              Support
            </a>
          </div>

        </div>

      </div>

      {/* Right Side: Brand Imagery */}
      <div className="hidden lg:block flex-1 relative bg-slate-900 overflow-hidden">

        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_e42b8ed18d_3606c98ef15b48ce.png"
            alt="Modern university campus architecture with glass buildings and library"
            className="w-full h-full object-cover opacity-40 mix-blend-luminosity"
          />
        </div>

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 via-slate-900/60 to-blue-900/40 z-10" />

        {/* Grid */}
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

        {/* Right Side Content */}
        <div className="absolute inset-0 z-20 flex flex-col justify-end p-20 text-white">

          <div className="max-w-xl">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-widest mb-6">

              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />

              Campus Mobility & Management

            </div>

            {/* Heading */}
            <h2 className="text-5xl font-bold leading-tight mb-6">
              The complete engine for the modern university.
            </h2>

            {/* Description */}
            <p className="text-xl text-white/70 leading-relaxed">
              Experience a unified platform for academic excellence,
              administration, and campus mobility.
            </p>

            {/* Stats */}
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