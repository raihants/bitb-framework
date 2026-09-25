"use client";

import React, { useState } from 'react';

export default function SignInCard() {
  const [email, setEmail] = useState('');

  return (
    <div className="w-full max-w-[460px] bg-white sm:border sm:border-[#eaeced] sm:rounded-xl p-0 sm:px-12 sm:pt-9 sm:pb-14 flex flex-col items-center">
      <form className="w-full flex flex-col" onSubmit={(e) => e.preventDefault()}>
        <div className="w-full mb-[18px]">
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-[56px] px-3 border border-[#9da3a6] rounded-[4px] focus:outline-none focus:border-[#0070ba] focus:ring-[1px] focus:ring-[#0070ba] transition-colors text-[16px] text-[#2c2e2f] placeholder-[#6c7378]"
            placeholder="Email or mobile number"
            required
          />
        </div>

        <div className="mb-[28px] w-full text-left">
          <a href="#" className="text-[#0070ba] text-[15px] font-bold hover:underline">
            Forgot email?
          </a>
        </div>

        <button
          type="submit"
          className="w-full h-[48px] bg-[#005ea6] hover:bg-[#003087] text-white font-bold rounded-full text-[16px] transition-colors"
        >
          Next
        </button>
      </form>

      <div className="w-full flex items-center my-[24px]">
        <div className="flex-1 h-px bg-[#cbd2d6]"></div>
        <span className="px-4 text-[#6c7378] text-[15px]">or</span>
        <div className="flex-1 h-px bg-[#cbd2d6]"></div>
      </div>

      <button
        type="button"
        className="w-full h-[48px] bg-white hover:bg-[#f5f7fa] text-black font-bold rounded-full border-2 border-black text-[16px] transition-colors"
      >
        Sign Up
      </button>

      {/* Locale Selector */}
      <div className="intentFooter mt-[88px] w-full flex justify-center">
        <div className="localeSelector flex items-center gap-2 text-[14px] leading-none">
          <span className="picker country-selector flex items-center">
            <span className="hidden" id="countryPickerLink">Indonesia</span>
            <button
              type="button"
              aria-label="countryPickerLink"
              className="country ID w-[21px] h-[14px] border border-[#d4d4d4] flex flex-col"
              pa-marked="1"
            >
              <span className="block w-full h-1/2 bg-[#e43d4a]"></span>
              <span className="block w-full h-1/2 bg-white"></span>
            </button>
            <svg className="w-4 h-4 ml-1 text-[#6c7378]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7"></path>
            </svg>
          </span>
          <ul className="localeLink flex items-center m-0 p-0 list-none">
            <li>
              <a className="scTrack:unifiedlogin-footer-language_id_ID text-[#6c7378] hover:underline" href="/signin?country.x=ID&amp;locale.x=id_ID&amp;langTgl=id" lang="id" data-locale="id_ID" pa-marked="1">Indonesia</a>
            </li>
            <li aria-hidden="true" className="text-[#cbd2d6] mx-1">|</li>
            <li>
              <a className="selected scTrack:unifiedlogin-footer-language_en_US font-bold text-[#2c2e2f] hover:underline" href="/signin?country.x=ID&amp;locale.x=en_US&amp;langTgl=en" lang="en" data-locale="en_US" aria-current="true" pa-marked="1">English</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
