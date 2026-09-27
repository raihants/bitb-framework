"use client";
import React from 'react';

type Props = { onGoogleClick: () => void };

export default function LoginDialog({ onGoogleClick }: Props) {
  return (
    <div className="w-full h-full min-[960px]:h-auto min-[960px]:w-auto flex flex-col min-[960px]:flex-row min-[960px]:bg-white min-[960px]:rounded-[32px] min-[960px]:shadow-xl relative overflow-x-hidden">

      {/* Mobile top bar */}
      <div className="flex min-[960px]:hidden justify-between items-center px-4 py-4 w-full bg-white fixed top-0 left-0 z-50">
        <div className="flex items-center text-[#e60023] font-bold text-xl gap-1 tracking-tight">
          <svg height="24" width="24" viewBox="0 0 24 24" className="fill-current">
            <path d="M12 0a12 12 0 0 0-4.37 23.17c-.07-.63-.13-1.6.03-2.29l1.49-6.33s-.38-.76-.38-1.88c0-1.76 1.02-3.08 2.3-3.08 1.09 0 1.62.82 1.62 1.8 0 1.1-.7 2.74-1.07 4.26-.31 1.28.64 2.32 1.9 2.32 2.27 0 4.02-2.4 4.02-5.85 0-3.07-2.21-5.2-5.35-5.2-3.64 0-5.78 2.73-5.78 5.56 0 1.1.42 2.28.95 2.92.1.13.12.24.09.38l-.3 1.25c-.05.18-.16.22-.35.13-1.3-.61-2.12-2.52-2.12-4.06 0-3.3 2.4-6.33 6.92-6.33 3.63 0 6.46 2.59 6.46 6.05 0 3.6-2.27 6.51-5.43 6.51-1.06 0-2.06-.55-2.4-1.2l-.66 2.52c-.24.9-.88 2.03-1.31 2.72A12 12 0 1 0 12 0z"/>
          </svg>
          Pinterest
        </div>
        <button className="bg-[#e60023] text-white font-bold py-2 px-4 rounded-full text-[15px]">Daftar</button>
      </div>

      {/* Form column */}
      <div className="flex-1 w-full max-w-[484px] mx-auto min-[960px]:w-[484px] px-4 py-6 min-[960px]:px-[60px] min-[960px]:py-[40px] flex flex-col justify-center mt-16 min-[960px]:mt-0">

        <div className="hidden min-[960px]:flex items-center justify-center mb-5 text-[#e60023]">
          <svg height="45" width="45" viewBox="0 0 24 24" className="fill-current"><path d="M12 0a12 12 0 0 0-4.37 23.17c-.07-.63-.13-1.6.03-2.29l1.49-6.33s-.38-.76-.38-1.88c0-1.76 1.02-3.08 2.3-3.08 1.09 0 1.62.82 1.62 1.8 0 1.1-.7 2.74-1.07 4.26-.31 1.28.64 2.32 1.9 2.32 2.27 0 4.02-2.4 4.02-5.85 0-3.07-2.21-5.2-5.35-5.2-3.64 0-5.78 2.73-5.78 5.56 0 1.1.42 2.28.95 2.92.1.13.12.24.09.38l-.3 1.25c-.05.18-.16.22-.35.13-1.3-.61-2.12-2.52-2.12-4.06 0-3.3 2.4-6.33 6.92-6.33 3.63 0 6.46 2.59 6.46 6.05 0 3.6-2.27 6.51-5.43 6.51-1.06 0-2.06-.55-2.4-1.2l-.66 2.52c-.24.9-.88 2.03-1.31 2.72A12 12 0 1 0 12 0z"/></svg>
        </div>

        <h2 className="hidden min-[960px]:block text-[32px] font-semibold mb-1 text-center tracking-tight text-black">
          Welcome to Pinterest
        </h2>
        <h2 className="min-[960px]:hidden text-[28px] font-semibold mb-6 text-center tracking-tight text-black">
          Log in to Pinterest
        </h2>

        <p className="hidden min-[960px]:block text-[16px] text-[#111111] text-center mb-8">
          Log in to discover more ideas just for you
        </p>

        {/* Google button (mobile) */}
        <div className="min-[960px]:hidden w-full mb-4">
          <button onClick={onGoogleClick} className="w-full flex items-center justify-center border border-gray-300 bg-white text-gray-700 font-semibold py-3 rounded-full text-[15px] hover:bg-gray-50 transition">
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5 mr-3" />
            Continue with Google
          </button>
        </div>
        <div className="min-[960px]:hidden text-center text-[13px] font-bold text-black mb-4">OR</div>

        {/* Input fields */}
        <div className="space-y-2 mb-3 min-[960px]:mb-3">
          <input type="email" placeholder="Email" className="w-full border-2 border-[#cdcdcd] hover:border-[#a5a5a5] rounded-2xl p-3.5 text-[16px] focus:outline-none focus:border-[#0084ff] placeholder:text-[#767676] text-black" />
          <div className="relative">
            <input type="password" placeholder="Password" className="w-full border-2 border-[#cdcdcd] hover:border-[#a5a5a5] rounded-2xl p-3.5 text-[16px] focus:outline-none focus:border-[#0084ff] placeholder:text-[#767676] text-black" />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 rounded-full transition-colors">
              <svg height="20" width="20" viewBox="0 0 24 24" className="fill-black"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
            </button>
          </div>
        </div>

        {/* Forgot password */}
        <div className="text-left mb-6 min-[960px]:mb-4 ml-2">
          <a href="#" className="text-[14px] font-semibold text-[#0000ee] min-[960px]:text-[#0000ee] hover:underline">
            Forgot password?
          </a>
        </div>

        {/* Log in button */}
        <div className="w-full mb-6 min-[960px]:mb-4">
          <button className="w-full bg-[#e60023] text-white font-bold py-3.5 rounded-full text-[15px] hover:bg-[#ad081b] transition">
            Log in
          </button>
        </div>

        {/* Desktop OR + Google + QR */}
        <div className="hidden min-[960px]:block text-center text-[12px] font-normal text-black mb-4">
          OR
        </div>

        <div className="hidden min-[960px]:block w-full mb-3">
          <button onClick={onGoogleClick} className="w-full flex items-center justify-center border-2 border-gray-200 bg-white text-black font-semibold py-3 rounded-full text-[15px] hover:bg-gray-50 transition">
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5 mr-3" />
            Continue with Google
          </button>
        </div>
        <div className="hidden min-[960px]:block w-full mb-6">
          <button className="w-full flex items-center justify-center border-2 border-gray-200 bg-white text-black font-semibold py-3 rounded-full text-[15px] hover:bg-gray-50 transition">
            <svg height="20" width="20" viewBox="0 0 24 24" className="mr-3 fill-black"><path d="M5 5h4v4H5V5zm1.5 1.5v1h1v-1h-1zm-3-3h7v7H3.5V3.5zm11.5 1.5h4v4h-4V5zm1.5 1.5v1h1v-1h-1zm-3-3h7v7H12V3.5zM5 15h4v4H5v-4zm1.5 1.5v1h1v-1h-1zm-3-3h7v7H3.5V13.5zm11.5 1.5h1v1h-1v-1zm2.5 0h1.5v1H17.5v-1zm-2.5 2.5h1.5v1h-1.5v-1zm2.5 0h1v1.5h-1V17.5z"/></svg>
            Continue with QR code
          </button>
        </div>

        {/* Footer */}
        <div className="text-center text-[14px] text-black font-normal space-y-4 px-4">

          <div className="min-[960px]:hidden mb-4">
            Facebook login is no longer available <br/><a href="#" className="font-bold underline text-black">Update login method</a>
          </div>

          <div className="hidden min-[960px]:block text-[14px] mb-8">
            New to Pinterest? <a href="#" className="font-bold hover:underline text-black">Join for free</a>
          </div>
          <div className="min-[960px]:hidden">
            No Account? <a href="#" className="font-semibold underline text-[#0000ee]">Daftar</a>
          </div>

          <div className="min-[960px]:hidden">
            Are you a business? <a href="#" className="font-semibold underline text-black">Get started here!</a>
          </div>

          <div className="text-[11px] text-[#767676] font-normal leading-relaxed pt-2">
            <span className="hidden min-[960px]:inline">
              <a href="#" className="hover:underline">Terms of Service</a> &middot; <a href="#" className="hover:underline">Privacy Policy</a> &middot; <a href="#" className="hover:underline">Notice at Collection</a>
            </span>
            <span className="min-[960px]:hidden">
              By continuing, you agree to Pinterest's <a href="#" className="underline font-bold text-black">Terms of Service</a> and acknowledge you've read our <a href="#" className="underline font-bold text-black">Privacy Policy</a>. <a href="#" className="underline font-bold text-black">Notice at collection</a>.
            </span>
          </div>
        </div>
      </div>

      {/* Right Column: QR Code (Desktop only) */}
      <div className="hidden min-[960px]:flex w-[320px] bg-[#f5f5f5] flex-col items-center justify-center p-8 m-4 rounded-[32px] relative overflow-hidden">
        <h3 className="text-[20px] font-bold text-black mb-2 text-center absolute top-12">Log in instantly</h3>
        <p className="text-[16px] text-[#111111] text-center font-normal px-2 absolute top-[85px]">
          Scan this QR code with your<br/>phone to log in on the app
        </p>

        {/* QR Code graphic (simplified recreation) */}
        <div className="bg-white p-4 rounded-3xl shadow-sm flex items-center justify-center w-[160px] h-[160px] relative mt-16">
          <div className="w-full h-full border-[14px] border-black border-dashed rounded-lg opacity-80" style={{ borderStyle: 'dotted' }}></div>
          <div className="absolute bg-white p-1 rounded-full">
            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
              <svg height="16" width="16" viewBox="0 0 24 24" className="fill-white"><path d="M12 0a12 12 0 0 0-4.37 23.17c-.07-.63-.13-1.6.03-2.29l1.49-6.33s-.38-.76-.38-1.88c0-1.76 1.02-3.08 2.3-3.08 1.09 0 1.62.82 1.62 1.8 0 1.1-.7 2.74-1.07 4.26-.31 1.28.64 2.32 1.9 2.32 2.27 0 4.02-2.4 4.02-5.85 0-3.07-2.21-5.2-5.35-5.2-3.64 0-5.78 2.73-5.78 5.56 0 1.1.42 2.28.95 2.92.1.13.12.24.09.38l-.3 1.25c-.05.18-.16.22-.35.13-1.3-.61-2.12-2.52-2.12-4.06 0-3.3 2.4-6.33 6.92-6.33 3.63 0 6.46 2.59 6.46 6.05 0 3.6-2.27 6.51-5.43 6.51-1.06 0-2.06-.55-2.4-1.2l-.66 2.52c-.24.9-.88 2.03-1.31 2.72A12 12 0 1 0 12 0z"/></svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
