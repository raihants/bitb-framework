"use client";

import Link from "next/link";
import { CheckIcon, GoogleIcon } from "@/components/sites/login.yahoo.com/shared/icons";

export function LoginCard() {
  return (
    <div className="w-full md:w-[360px] md:bg-white md:rounded-[16px] md:shadow-[0_2px_4px_0_rgba(0,0,0,0.08),0_4px_12px_0_rgba(0,0,0,0.08)] md:p-8 pt-4">
      <h1 className="text-[#26282a] text-xl font-bold mb-6 text-left">
        Sign in to Yahoo
      </h1>

      <form className="flex flex-col gap-y-6" onSubmit={(e) => e.preventDefault()}>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="username" className="text-[#26282a] text-sm font-semibold">
            Username, email or phone number
          </label>
          <div className="border border-[#e0e4e9] rounded px-4 py-3 focus-within:border-[#0f69ff] focus-within:ring-1 focus-within:ring-[#0f69ff] transition-colors">
            <input
              id="username"
              name="username"
              type="text"
              className="w-full outline-none text-[#26282a] text-base bg-transparent"
              aria-required="true"
            />
          </div>
        </div>

        <div className="flex items-center justify-start md:justify-between pb-2">
          <label className="hidden md:flex items-center gap-x-2 cursor-pointer group">
            <div className="relative flex items-center justify-center w-4 h-4 border border-[#7e1fff] bg-[#7e1fff] rounded-[4px] text-white">
              <input
                type="checkbox"
                defaultChecked
                className="absolute opacity-0 w-full h-full cursor-pointer"
              />
              <CheckIcon className="w-3 h-3" />
            </div>
            <span className="text-[#26282a] text-sm group-hover:text-[#0f69ff] transition-colors">
              Stay signed in
            </span>
          </label>
          <Link href="#" className="text-[#7e1fff] text-sm font-semibold hover:underline">
            Forgot username
          </Link>
        </div>

        <button
          type="submit"
          className="w-full bg-[#7e1fff] hover:bg-[#6001d2] text-white font-semibold py-3.5 rounded-[20px] transition-colors duration-200"
        >
          Next
        </button>
      </form>

      <div className="flex items-center gap-x-4 my-6">
        <hr className="flex-1 border-[#e0e4e9]" />
        <span className="text-[#5b636a] text-sm">or</span>
        <hr className="flex-1 border-[#e0e4e9]" />
      </div>

      <div className="flex flex-col gap-y-6">
        <button
          type="button"
          className="w-full flex items-center justify-center gap-x-2 bg-white border border-[#e0e4e9] hover:bg-[#f0f3f5] text-[#26282a] font-semibold py-3.5 rounded-[20px] transition-colors duration-200 shadow-sm"
        >
          <GoogleIcon className="w-6 h-6" />
          <span>Sign in with Google</span>
        </button>

        <Link
          href="#"
          className="w-full flex items-center justify-center text-[#7e1fff] font-semibold transition-colors duration-200 hover:underline"
        >
          Create account
        </Link>
      </div>
    </div>
  );
}
