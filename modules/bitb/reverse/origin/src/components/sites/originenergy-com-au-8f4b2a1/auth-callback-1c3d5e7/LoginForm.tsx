"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { EyeOffIcon, CheckIcon } from "@/components/sites/originenergy-com-au-8f4b2a1/shared/icons"

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)

  const togglePassword = () => setShowPassword((prev) => !prev)

  return (
    <div className="w-full">
      <h1 className="text-xl md:text-2xl font-semibold text-[#333333] mb-6">Log in to My Account</h1>

      <form className="flex flex-col gap-4">
        {/* Email Field */}
        <div className="flex flex-col">
          <div className="relative">
            <input
              type="email"
              id="email"
              placeholder="Email address"
              required
              className="peer w-full rounded-md border border-[#c4c4c4] bg-white px-4 py-3 text-[16px] text-[#333333] placeholder-transparent focus:border-[#333333] focus:outline-none focus:ring-1 focus:ring-[#333333]"
            />
            <label
              htmlFor="email"
              className="absolute left-4 top-3 text-[16px] text-[#666666] transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-[16px] peer-focus:-top-2.5 peer-focus:left-3 peer-focus:bg-white peer-focus:px-1 peer-focus:text-xs peer-focus:text-[#666666] peer-valid:-top-2.5 peer-valid:left-3 peer-valid:bg-white peer-valid:px-1 peer-valid:text-xs"
            >
              Email address
            </label>
          </div>
          <div className="flex justify-end mt-1">
            <a href="#" className="text-sm text-[#666666] underline decoration-[#666666] hover:text-[#333333]">
              Forgot email?
            </a>
          </div>
        </div>

        {/* Password Field */}
        <div className="flex flex-col">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Password"
              required
              className="peer w-full rounded-md border border-[#c4c4c4] bg-white px-4 py-3 pr-12 text-[16px] text-[#333333] placeholder-transparent focus:border-[#333333] focus:outline-none focus:ring-1 focus:ring-[#333333]"
            />
            <label
              htmlFor="password"
              className="absolute left-4 top-3 text-[16px] text-[#666666] transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-[16px] peer-focus:-top-2.5 peer-focus:left-3 peer-focus:bg-white peer-focus:px-1 peer-focus:text-xs peer-focus:text-[#666666] peer-valid:-top-2.5 peer-valid:left-3 peer-valid:bg-white peer-valid:px-1 peer-valid:text-xs"
            >
              Password
            </label>
            <button
              type="button"
              onClick={togglePassword}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#666666] hover:text-[#333333] focus:outline-none"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <EyeOffIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="flex justify-end mt-1">
            <a href="#" className="text-sm text-[#666666] underline decoration-[#666666] hover:text-[#333333]">
              Forgot password?
            </a>
          </div>
        </div>

        {/* Remember me */}
        <div className="flex items-center space-x-3 mt-1">
          <button
            type="button"
            role="checkbox"
            aria-checked={rememberMe}
            onClick={() => setRememberMe(!rememberMe)}
            className={cn(
              "flex h-6 w-6 shrink-0 items-center justify-center rounded-sm border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F36F21]",
              rememberMe ? "bg-[#F36F21] border-[#F36F21]" : "border-[#c4c4c4] bg-white"
            )}
          >
            {rememberMe && <CheckIcon className="h-4 w-4 text-white" />}
          </button>
          <label
            htmlFor="remember"
            className="text-[16px] text-[#4a4a4a] cursor-pointer"
            onClick={() => setRememberMe(!rememberMe)}
          >
            Remember me
          </label>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full h-12 mt-4 rounded-full bg-[#f8a849] hover:bg-[#F36F21] text-[#333333] font-semibold text-lg transition-colors border-none"
        >
          Log in
        </Button>
      </form>
    </div>
  )
}
