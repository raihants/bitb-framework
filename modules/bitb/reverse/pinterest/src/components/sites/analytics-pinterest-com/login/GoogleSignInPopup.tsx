"use client";
import React from 'react';

type Props = { onClose: () => void };

export default function GoogleSignInPopup({ onClose }: Props) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 p-4">
      {/* Chrome window frame mockup */}
      <div className="bg-[#202124] rounded-lg shadow-2xl w-full max-w-[450px] border border-gray-700 overflow-hidden font-sans">
        {/* Chrome Header */}
        <div className="bg-[#202124] flex items-center justify-between px-4 py-2 border-b border-gray-800 text-xs">
          <div className="flex items-center space-x-2 truncate">
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            <span className="text-gray-300 truncate">Sign in - Google Accounts - Google Chrome</span>
          </div>
          <div className="flex space-x-4 ml-2">
            <span className="w-3 h-3 hover:bg-gray-700 flex items-center justify-center rounded cursor-pointer text-gray-400 font-bold">_</span>
            <span className="w-3 h-3 hover:bg-gray-700 flex items-center justify-center rounded cursor-pointer text-gray-400 font-bold">□</span>
            <span className="w-3 h-3 hover:bg-red-500 flex items-center justify-center rounded cursor-pointer text-gray-400 hover:text-white" onClick={onClose}>✕</span>
          </div>
        </div>
        {/* Popup Content */}
        <div className="p-8 sm:px-10">
          <div className="mb-8">
            <svg className="w-10 h-10 mb-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            <h1 className="text-[32px] text-white font-normal mb-3 tracking-wide">Sign in</h1>
            <p className="text-[16px] text-gray-300 leading-snug">
              with your Google Account. This account will be available to other Google apps in the browser.
            </p>
          </div>
          <div className="relative mb-2">
            <input type="text" className="w-full bg-transparent border border-gray-500 rounded px-4 py-[14px] text-white text-[16px] focus:outline-none focus:border-[#8ab4f8] focus:border-2 peer" placeholder=" " />
            <label className="absolute left-3 -top-2.5 bg-[#202124] px-1 text-sm text-[#8ab4f8] peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-[#8ab4f8] transition-all duration-200 pointer-events-none">
              Email or phone
            </label>
          </div>
          <div className="mb-10">
            <button className="text-[#8ab4f8] font-medium text-[14px] hover:underline">Forgot email?</button>
          </div>
          <div className="mb-14 text-[14px] text-[#9aa0a6] leading-relaxed">
            Not your computer? Use Guest mode to sign in privately. <button className="text-[#8ab4f8] hover:underline font-medium">Learn more about using Guest mode</button>
          </div>
          <div className="flex items-center justify-between mb-16">
            <button className="text-[#8ab4f8] font-medium text-[14px] hover:bg-[#8ab4f8]/10 px-3 py-2 rounded -ml-3 transition">Create account</button>
            <button className="bg-[#8ab4f8] text-[#202124] font-medium text-[14px] px-6 py-2 rounded-full hover:bg-blue-300 transition">Next</button>
          </div>
        </div>
        {/* Footer */}
        <div className="flex items-center justify-between text-[12px] text-[#9aa0a6] px-8 sm:px-10 pb-6">
          <select className="bg-transparent text-[#9aa0a6] border-none outline-none cursor-pointer hover:bg-gray-800 p-1 rounded -ml-1">
            <option>English (United States)</option>
          </select>
          <div className="flex space-x-6">
            <button className="hover:bg-gray-800 px-2 py-1 rounded transition">Help</button>
            <button className="hover:bg-gray-800 px-2 py-1 rounded transition">Privacy</button>
            <button className="hover:bg-gray-800 px-2 py-1 rounded transition">Terms</button>
          </div>
        </div>
      </div>
    </div>
  );
}
