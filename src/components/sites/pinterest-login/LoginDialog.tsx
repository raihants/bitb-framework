"use client";

import React from 'react';

type Props = {
  onGoogleClick: () => void;
};

export default function LoginDialog({ onGoogleClick }: Props) {
  return (
    <div className="bg-white rounded-[32px] shadow-xl max-w-[800px] w-full z-30 relative overflow-hidden flex flex-col md:flex-row">
      <div className="flex-1 p-10 flex flex-col justify-center">
        <h2 className="text-[32px] font-bold mb-6 text-center tracking-tight text-gray-900">Sign in to Pinterest</h2>
        <div className="space-y-3 mb-6">
          <input
            type="email"
            placeholder="Email"
            className="w-full border-2 border-gray-200 rounded-2xl p-3 text-lg focus:outline-none focus:border-gray-400"
          />
          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              className="w-full border-2 border-gray-200 rounded-2xl p-3 text-lg focus:outline-none focus:border-gray-400"
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2">
              <svg height="24" width="24" viewBox="0 0 24 24" className="fill-gray-600">
                <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
              </svg>
            </button>
          </div>
          <div className="text-left mt-2">
            <a href="#" className="text-sm font-semibold text-gray-800 hover:underline">Forgot your password?</a>
          </div>
        </div>

        <button className="w-full bg-gray-200 text-gray-500 font-bold py-3 rounded-full text-base mb-4 cursor-not-allowed">
          Log in
        </button>

        <div className="text-center text-sm font-bold text-gray-800 mb-4">Or</div>

        <button
          onClick={onGoogleClick}
          className="w-full flex items-center justify-center border-2 border-gray-200 bg-white text-gray-800 font-bold py-3 rounded-full text-base hover:bg-gray-50 transition"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-6 h-6 mr-3" />
          Continue with Google
        </button>

        <div className="mt-8 text-center text-[13px] text-gray-800 font-semibold space-y-4">
          <div>Facebook login is no longer available. <a href="#" className="underline">Update login method</a></div>
          <div>New to Pinterest? <a href="#" className="underline">Sign up</a></div>
          <div>Are you a business? <a href="#" className="underline">Get started here</a></div>
          <div className="text-[11px] text-gray-500 font-normal mt-6 leading-tight">
            By continuing, you agree to Pinterest's <a href="#" className="underline">Terms of Service</a> and acknowledge you've read our <a href="#" className="underline">Privacy Policy</a>. <a href="#" className="underline">Notice at collection</a>.
          </div>
        </div>
      </div>

      {/* Right Column: QR Code */}
      <div className="hidden md:flex w-64 bg-[#f5f5f5] flex-col items-center justify-center p-8 m-4 rounded-3xl">
        <div className="bg-white p-4 rounded-3xl shadow-sm mb-6 flex items-center justify-center aspect-square w-32 relative">
          {/* Mock QR Code Pattern */}
          <div className="w-full h-full border-[12px] border-black border-dashed rounded-lg opacity-80" style={{ borderStyle: 'dotted' }}></div>
          {/* Center Pinterest Logo in QR */}
          <div className="absolute bg-white p-1 rounded-full">
            <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
              <svg height="16" width="16" viewBox="0 0 24 24" className="fill-white">
                <path d="M12 0a12 12 0 0 0-4.37 23.17c-.07-.63-.13-1.6.03-2.29l1.49-6.33s-.38-.76-.38-1.88c0-1.76 1.02-3.08 2.3-3.08 1.09 0 1.62.82 1.62 1.8 0 1.1-.7 2.74-1.07 4.26-.31 1.28.64 2.32 1.9 2.32 2.27 0 4.02-2.4 4.02-5.85 0-3.07-2.21-5.2-5.35-5.2-3.64 0-5.78 2.73-5.78 5.56 0 1.1.42 2.28.95 2.92.1.13.12.24.09.38l-.3 1.25c-.05.18-.16.22-.35.13-1.3-.61-2.12-2.52-2.12-4.06 0-3.3 2.4-6.33 6.92-6.33 3.63 0 6.46 2.59 6.46 6.05 0 3.6-2.27 6.51-5.43 6.51-1.06 0-2.06-.55-2.4-1.2l-.66 2.52c-.24.9-.88 2.03-1.31 2.72A12 12 0 1 0 12 0z" />
              </svg>
            </div>
          </div>
        </div>
        <h3 className="text-[20px] font-bold text-black mb-2 text-center">Log in instantly</h3>
        <p className="text-[13px] text-gray-800 text-center font-semibold px-2">
          Scan QR code with your phone and confirm login in the Pinterest app
        </p>
      </div>
    </div>
  );
}
