import React from 'react';
import Link from 'next/link';

export function LoginForm() {
  return (
    <div className="w-full max-w-[488px] bg-[rgba(0,0,0,0.9)] p-[40px] flex flex-col font-[sst,helvetica,arial,sans-serif]">
      <h1 className="text-white text-[26px] font-light mb-[24px] leading-[32.5px]">
        Sign in to PlayStation
      </h1>

      <form className="flex flex-col flex-1" onSubmit={(e) => e.preventDefault()}>
        <label className="text-white text-[16px] font-normal pb-[4px] h-[24px] leading-[20px] block">
          Sign-In ID (Email Address)
        </label>

        <div className="border border-[rgb(178,178,178)] rounded-[6px] h-[50px] bg-transparent focus-within:border-[#249cff] focus-within:border-[2px] transition-colors flex items-center">
          <input
            type="email"
            className="text-white bg-transparent text-[16px] pt-[12px] pr-[8px] pb-[12px] pl-[16px] h-[48px] w-full outline-none"
          />
        </div>

        <button
          type="submit"
          className="text-black bg-[rgb(117,117,117)] text-[16px] font-bold border-0 rounded-full px-[12px] mt-[16px] h-[40px] leading-[20px] w-full hover:bg-[rgb(137,137,137)] transition-colors"
        >
          Next
        </button>

        <div className="mt-[24px] mb-[32px] flex flex-col gap-[16px]">
          <Link href="#" className="text-[rgb(36,156,255)] text-[16px] no-underline hover:underline">
            Trouble Signing In?
          </Link>
          <Link href="#" className="text-[rgb(36,156,255)] text-[16px] no-underline hover:underline">
            About Sony Account
          </Link>
        </div>

        <button
          type="button"
          className="text-white bg-[rgba(255,255,255,0.14)] text-[16px] font-bold border border-[rgba(255,255,255,0.8)] rounded-full px-[12px] h-[40px] w-full hover:bg-[rgba(255,255,255,0.2)] transition-colors"
        >
          Create an Account
        </button>
      </form>
    </div>
  );
}
