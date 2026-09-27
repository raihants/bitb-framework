"use client"

import React from "react"
import { OriginLogo } from "@/components/sites/originenergy-com-au-8f4b2a1/shared/icons"
import { LoginForm } from "@/components/sites/originenergy-com-au-8f4b2a1/auth-callback-1c3d5e7/LoginForm"
import { PromoBox } from "@/components/sites/originenergy-com-au-8f4b2a1/auth-callback-1c3d5e7/PromoBox"
import Link from "next/link"

export default function AuthCallbackPage() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-[#f4f4f5] pt-0">
      {/* Global Header just for the logo as in the origin site (often top-left) */}
      <div className="w-full bg-white md:bg-transparent px-4 py-4 md:px-12 md:py-8 flex justify-start items-center shadow-sm md:shadow-none mb-8 md:mb-10">
        <OriginLogo className="h-[60px] md:h-[72px]" />
      </div>

      <div className="w-full px-4 flex flex-col items-center">
        <div className="w-full max-w-[480px] bg-white md:rounded-2xl md:shadow-[0_2px_15px_-3px_rgba(0,0,0,0.1),0_10px_20px_-2px_rgba(0,0,0,0.04)] px-6 py-8 md:px-12 md:py-10">
          <LoginForm />
          <PromoBox />
        </div>

        <div className="mt-8 text-center text-[#4a4a4a] text-[15px]">
          Never used My Account?{" "}
          <Link href="#" className="text-[#333333] underline decoration-[#333333] hover:text-[#111111]">
            Register now
          </Link>
        </div>
      </div>
    </div>
  )
}
